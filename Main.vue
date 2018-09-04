<template lang='pug'>
  div
    PrivateHeader.header.header1(v-if='bigHeader' :payload='payload')
    MiniHeader.header.header2(v-else :payload='payload')
    div.subheader(v-bind:class="[{subheader1: bigHeader}, {subheader2: !bigHeader}]")
      span(v-for='page in pages' style='padding-left: 50px')
        a(href='#' @click.prevent="showPage(page)" v-bind:class="[{onPage: show==page}, {offPage: show!=page}]")
          b.menuItem {{page}}
    div.myBody(v-bind:class="[{body1: bigHeader}, {body2: !bigHeader}]")
      div.myBodyContents
        <!-- b Status: {{status}} -->
        p &nbsp;
        About(v-if="show=='About'")
        Interests(v-else-if="show==='Interests'" :list='interests' :interest_ids='interest_ids' :payload='payload')
        Events(v-else-if="show==='Events'" :list='events' :invites='invites' :payload='payload')
        Host(v-else-if="show==='Host'" :list='interests' :payload='payload')
        Ideas(v-else-if="show==='Ideas'")
        Welcome(v-else)
    PublicFooter.footer(v-bind:class=" [{footer1: show==''}, {footer2: show!==''}]" :payload='payload')
</template>

<script>
import Welcome from './Welcome'
import Interests from './Interests'
import Events from './Events'
import Ideas from './Ideas'
import About from './About'
import Host from './Host'

import Modal from './../Standard/Modal'

import PrivateHeader from './PrivateHeader.vue'
import MiniHeader from './MiniHeader.vue'
import PublicFooter from './PublicFooter.vue'

import axios from 'axios'
import lodash from 'lodash'
import config from './config.js'

import 'vue-awesome/icons/exclamation-triangle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/question-circle'

export default {
  name: 'ovid',
  components: {
    Welcome,
    Interests,
    Events,
    Ideas,
    About,
    Host,
    PrivateHeader,
    MiniHeader,
    PublicFooter,
    Modal
  },
  data () {
    return {
      memberPages: ['Interests', 'Events', 'Host'],
      hostPages: ['Interests', 'Events', 'Host'],
      publicPages: ['About', 'Interests', 'Events', 'Ideas'],
      show: '',
      onPage: 'Events',
      skillURL: config.skillMirrorUrl,
      interestURL: config.interestMirrorUrl,

      interests: config.demo_interests,
      skills: config.demo_skills,
      events: config.demo_events,
      invites: config.demo_invites,

      openInterests: {'idnull': true, 'id0': true, 'id1': true},
      bc: 'green',
      status: 'init',
      interest_ids: [],
      URL: config.apiURL,
      urlHeader: config.apiHeader

    }
  },
  props: {
  },
  events: {
  },
  created: function () {
    this.loadData()
  },
  computed: {
    userid: function () {
      if (this.payload && this.payload.userid) {
        return this.payload.userid
      } else {
        return null
      }
    },
    payload: function () {
      var payload = this.$store.getters.payload || null
      if (payload && payload.constructor === Object) {
        console.log('object payload: ' + JSON.stringify(payload))
        return payload
      } else if (payload && payload.constructor === String) {
        console.log('string payload: ' + payload)
        var data = JSON.parse(payload)
        return data
      } else {
        return { access: 'public' }
      }
    },
    pages: function () {
      if (this.payload && this.payload.userid) {
        return this.memberPages
      } else {
        return this.publicPages
      }
    },
    storedInterests: function () {
      console.log('get stored interests')
      var C = this.$store.getters.getHash('interests') || []
      console.log('load Interests: ' + JSON.stringify(C))
      return C
    },
    bigHeader: function () {
      if (this.show) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    userid: function (val) {
      console.log('WATCHED payload updated in Main: ' + JSON.stringify(val))
      this.userInterests()
      //   this.userSkills()
    }
  },
  methods: {
    showPage (page) {
      this.show = page
    },
    loadData: function () {
      if (this.userid) {
        console.log('retrieve user data...')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

        this.status = 'loading...'
        console.log('retrieve interests via axios from ' + this.URL)
        console.log('headers: ' + JSON.stringify(this.urlHeader))

        var _this = this
        axios(this.URL + '/interests', {method: 'GET', headers: this.urlHeader})
          .then(function (result, err) {
            if (err) {
              _this.status = 'nexterr'
              console.log('set axios error...')
              _this.$store.commit('setError', {context: 'Searching For ' + _this.scope, err: err})
              console.log('axios error: ' + err)
            } else {
              _this.status += 'loaded interests...'
              _this.interests = result.data

              console.log('axios returned interest value(s): ' + JSON.stringify(_this.interests))
              console.log('ids1: ' + JSON.stringify(_this.interest_ids))

              console.log('interest_ids: ' + _this.interest_ids.join(', '))
              _this.$store.commit('setHash', {key: 'interests', value: _this.interests})
            }
          })

        console.log('retrieve skills via axios from ' + this.URL)
        axios(this.URL + '/skills', {method: 'GET', headers: this.urlHeader})
          .then(function (result, err) {
            if (err) {
              console.log('set axios error...')
              _this.$store.commit('setError', {context: 'Searching For ' + _this.scope, err: err})
              console.log('axios error: ' + err)
            } else {
              _this.status += 'loaded skills...'
              _this.skills = result.data
              _this.$store.commit('setHash', {key: 'skills', value: result.data})
              console.log('axios returned skill value(s): ' + JSON.stringify(result.data))
            }
          })
      } else {
        console.log('no user ... defer loading of data...')
      }
    },
    userInterests: function () {
      var append = ''
      if (this.payload && this.payload.userid) {
        append = '?userid=' + this.payload.userid
      } else { console.log('no payload userid') }

      var _this = this
      axios(this.URL + '/interests' + append, {method: 'GET', headers: this.urlHeader})
        .then(function (result, err) {
          if (err) {
            console.log('axios error: ' + err)
          } else {
            _this.interest_ids = lodash.map(result.data, 'id')
            // console.log(JSON.stringify(lodash.map(result.data, 'id')))
            console.log('reset interest_ids: ' + JSON.stringify(_this.interest_ids))
          }
        })
    },
    userSkills: function () {
      console.log('update skills')
    }
  }
}
</script>

<style lang="sass?outputStyle=expanded">

/*** Customize Header / Footer Settings: ***/
$header-background-colour: white;
$default-padding: 40px 50px;
$header-colour: darkgrey;

$header-height: 200px;
$header-font-size: 40px;

$footer-height: 150px;
$footer-font-size: 30px;
$footer-colour: black;
$footer-background-colour: grey;

$subheader-height: 50px;
$subheader-background-colour: transparent;

$body-background-colour: #ddd;
$body-colour: black;

$min-height: 70rem;

// Secondary page type:

$header2-height: 150px;
$header2-font-size: 20px;

$footer2-height: 60px;
$footer2-font-size: 20px;

$subheader2-height: 50px;

.page {
  /*margin-top: -20px;*/
  height: 100%;
  width: 100%;
}

.header {
  color: $header-colour;
  background-color: $header-background-colour;
  padding: $default-padding;
}
.header1 {
  height: $header-height;
  font-size: $header-font-size;
}

.header2 {
  height: $header2-height;
  font-size: $header2-font-size;
}

.footer {
  background-color: $footer-background-colour;
  color: $footer-colour;
  padding: $default-padding;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.footer1 {
  height: $footer-height;
  font-size: $footer-font-size;
  padding-top: 50px;
}

.footer2 {
  height: $footer2-height;
  font-size: $footer2-font-size;
}

a {
  color: black;
  font-weight: normal;
}
a:hover {
  color: black;
  font-weight: bold;
}

.subheader {
  color: white;
  background-color: white;
  width: 100%;
  z-index: 10000;
}

.subheader1 {
  height: $subheader-height;
}

.subheader2 {
  height: $subheader2-height;
}

.myBody {
  background-color: $body-background-colour;
  color: $body-colour;
  font-size: 18px !important;
  z-index: 10000;
}
.html {
  min-height: $min-height;
}
.body1 {
  min-height: #{$min-height};
}
.body2 {
  min-height: #{$min-height};
}

@media screen and (min-height: calc(#{$min-height} + #{$header-height} + #{$subheader-height} + #{$footer-height})) {
  .body1 {
    min-height: calc(100vh - #{$header-height} - #{$subheader-height} - #{$footer-height});
  }
}
@media screen and (min-height: calc(#{$min-height} + #{$header2-height} + #{$subheader-height} + #{$footer2-height})) {
  .body2 {
    min-height: calc(100vh - #{$header2-height} - #{$subheader-height} - #{$footer2-height});
  }
}

img.bg {
  z-index: -1;
  /* Set rules to fill background */
  min-height: 100%;
  /*min-width: 1024px;*/
  /*background-image: url("/static/images/teapour.jpeg");*/
/* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /*background-color: rgba(255, 255, 0, 0.3);*/

  z-index: 0;
  opacity: 20%;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  top: calc(#{$header-height});
  left: 0;
}

@media screen and (max-width: 1024px) { /* Specific to this particular image */
  img.bg {
    left: 50%;
    /*margin-left: -512px;   /* 50% */
  }
}

.overlay {
  position: absolute;
}

.navbar-centre
{
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    margin:0 auto;
}

.onPage {
  color: black;
  font-weight: bold;
  // background-color: grey !important;
}
.onPage:hover {
  color: black;
  // background-color: grey !important;
}
.offPage {
  // background-color: grey !important;
  color: grey;
}
.offPage:hover {
  // background-color: darkgrey !important;
  color: black;
}

.menuItem {
  font-size: 20px;
}

.submenu {
  font-size: 30px;
}

</style>
