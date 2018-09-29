<template lang='pug'>
  div.full-screen
    PrivateHeader.header.header1(v-if='bigHeader' :payload='payload')
    MiniHeader.header.header2(v-else :payload='payload')
    div.subheader(v-bind:class="[{subheader1: bigHeader}, {subheader2: !bigHeader}]")
      span(v-for='page in pages' style='padding-left: 50px')
        a(href='#' @click.prevent="showPage(page)" v-bind:class="[{onPage: show==page}, {offPage: show!=page}]")
          b.menuItem {{page}}
    div.myBody(v-bind:class="[{body1: bigHeader}, {body2: !bigHeader}]")
      img.bgimg(v-if="!show || show==='Home'")
      div.myBodyContent
        <!-- b Status: {{status}} : {{payload}} -->
        p &nbsp;
        About(v-show="show==='About'")
        Interests(v-show="show==='Interests'" :list='interests' :interest_ids='interest_ids' :payload='payload')
        Events(v-show="show==='Events'" :list='events' :invites='invites' :payload='payload')
        Host(v-show="show==='Host'" :list='interests' :payload='payload')
        Examples(v-show="show==='Examples'")
        Filters(v-show="show==='Filters'")
        Welcome(v-show="!show || show==='Home'" :interests='myInterests' :events='myEvents' :invites='myInvites' :payload='payload' :redirect='showPage')
        <!-- Home(v-show="show==='Home'" :redirect='showPage') -->
    PublicFooter.footer(v-bind:class=" [{footer1: showMe==='' || showMe==='Home'}, {footer2: showMe!=='' && showMe !== 'Home'}]" :payload='payload')
</template>

<script>
import Welcome from './Welcome'
import Interests from './Interests'
import Events from './Events'
import Examples from './Examples'
import Filters from './Filters'
import About from './About'
import Host from './Host'

import Modal from './../Standard/Modal'

import PrivateHeader from './PrivateHeader.vue'
import MiniHeader from './MiniHeader.vue'
import PublicFooter from './PublicFooter.vue'

import axios from 'axios'
import lodash from 'lodash'
import config from './config.js'
// import auth from '../../auth'

import 'vue-awesome/icons/exclamation-triangle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/question-circle'

export default {
  name: 'sparc',
  components: {
    Welcome,
    Interests,
    Events,
    Examples,
    Filters,
    About,
    Host,
    PrivateHeader,
    MiniHeader,
    PublicFooter,
    Modal
  },
  data () {
    return {
      memberPages: ['Home', 'Interests', 'Events', 'Host', 'Filters', 'Examples'],
      hostPages: ['Home', 'Interests', 'Events', 'Host', 'Filters', 'Examples'],
      publicPages: ['About', 'Interests', 'Events', 'Filters', 'Examples'],
      showMe: '',
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
      urlHeader: {}, // config.apiHeader

      myInterests: [],
      myEvents: [],
      myInvites: []
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
    show: function () {
      if (this.showMe) {
        return this.showMe
      } else if (this.userid) {
        return 'Interests'
      } else {
        return ''
      }
    },
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
      if (this.show && this.show !== 'Home') {
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
      this.loadData()
      //   this.userSkills()
    },
    payload: function (val) {
      console.log('WATCHED payload ' + JSON.stringify(val))
    }
  },
  methods: {
    showPage (page) {
      this.showMe = page
    },
    loadData: function () {
      if (this.userid) {
        console.log('retrieve user data...')
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

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

              console.log('axios returned ' + _this.interests.length + ' interests')
              // console.log('interest_ids: ' + _this.interest_ids.join(', '))
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
              console.log('axios returned ' + _this.skills.length + ' skills')
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

      console.log('axios call: ' + this.URL + 'interests' + append)
      var _this = this
      axios(this.URL + '/interests' + append, {method: 'GET', headers: this.urlHeader})
        .then(function (result, err) {
          if (err) {
            console.log('axios error: ' + err)
          } else {
            _this.interest_ids = lodash.map(result.data, 'id')
            _this.myInterests = lodash.map(result.data, 'name')
            // console.log(JSON.stringify(lodash.map(result.data, 'id')))
            console.log('reset interest_ids to: ' + JSON.stringify(_this.interest_ids))
          }
        })
    },
    userEvents: function () {
      var append = ''
      if (this.payload && this.payload.userid) {
        append = '?userid=' + this.payload.userid
      } else { console.log('no payload userid') }

      console.log('axios call: ' + this.URL + 'events' + append)
      var _this = this
      axios(this.URL + '/events' + append, {method: 'GET', headers: this.urlHeader})
        .then(function (result, err) {
          if (err) {
            console.log('axios error: ' + err)
          } else {
            _this.myEvents = lodash.map(result.data, 'name')
          }
        })
    },
    userInvites: function () {
      var append = ''
      if (this.payload && this.payload.userid) {
        append = '?userid=' + this.payload.userid
      } else { console.log('no payload userid') }

      console.log('axios call: ' + this.URL + 'invites' + append)
      var _this = this
      axios(this.URL + '/invites' + append, {method: 'GET', headers: this.urlHeader})
        .then(function (result, err) {
          if (err) {
            console.log('axios error: ' + err)
          } else {
            _this.myInvites = lodash.map(result.data)
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

$header-height: 20rem;
$header-font-size: 4rem;

$footer-height: 15rem;
$footer-font-size: 3rem;
$footer-colour: black;
$footer-background-colour: transparent;

$subheader-height: 5rem;
$subheader-background-colour: transparent;

$body-background-colour: #ddd;
$body-colour: black;

$min-height: 100rem;
$min-height2: 40rem;

// Secondary page type:

$header2-height: 15rem;
$header2-font-size: 2rem;

$footer2-height: 6rem;
$footer2-font-size: 2rem;

$subheader2-height: 5rem;

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
  padding: $default-padding;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.footer1 {
  color: #ccc;
  height: $footer-height;
  font-size: $footer-font-size;
  padding-top: 50px;
  z-index: 5;
}

.footer2 {
  color: $footer-colour;
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
  background-color: transparent;
  width: 100%;
  // position: absolute;
  z-index: 1;
}

.subheader1 {
  height: $subheader-height;
}

.subheader2 {
  height: $subheader2-height;
}

.html {
  // background-color: $body-background-colour;
  // color: $body-colour;
  font-size: 18px !important;
  min-height: #{$min-height2}
}

.body1 {
  min-height: #{$min-height};
}
.body2 {
  min-height: calc(100vh - #{$header2-height} - #{$subheader-height} - #{$footer2-height});
  // min-height: #{$min-height2};
  background-color: lightblue; // $body-background-colour;
  color: $body-colour;
}

@media screen and (min-height: calc(#{$min-height} + #{$header-height} + #{$subheader-height} + #{$footer-height})) {
  .body1 {
    min-height: calc(100vh - #{$header-height} - #{$subheader-height} - #{$footer-height});
    // background-color: red;
  }
}
// 50 - 15 + 2 + 6
// @media screen and (min-height: calc(#{$min-height2} + #{$header2-height} + #{$subheader2-height} + #{$footer2-height})) {
@media screen and (min-height: calc(#{$min-height2} - #{$header2-height} + #{$subheader2-height} + #{$footer2-height})) {
  .body2 {
    min-height: calc(100vh - #{$header2-height} - #{$subheader-height} - #{$footer2-height});
    // background-color: lightblue;
  }
}

img.bgimg {
  z-index: -10;
  /* Set rules to fill background */
  min-height: 100rem;
  /*min-width: 1024px;*/
  /*background-image: url("/static/images/teapour.jpeg");*/
/* Center and scale the image nicely */

  background-image: url('/static/images/sparc/alone-sunset.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /*background-color: rgba(255, 255, 0, 0.3);*/

  opacity: 20%;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: absolute;
  // top: $header-height;
  top: calc(#{$header-height} + #{$subheader-height});
  left: 0;
}

// @media screen and (max-width: 1024px) { /* Specific to this particular image */
  // img.bg {
    // left: 50%;
    /*margin-left: -512px;   /* 50% */
  // }
// }

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

.body12 {
  position: relative;
  background-image: url('/static/images/sparc/alone-sunset.jpg');
  background-size: cover;
  min-height: 100rem;
  height: 100%;
  z-index: 5;
}

.submenu {
  font-size: 20px;
}

.heading {
  color: blue;
}

</style>
