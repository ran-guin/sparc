<template lang='pug'>
  div
    PrivateHeader.header.header1(v-if='bigHeader')
    MiniHeader.header.header2(v-else)
    div.subheader(v-bind:class="[{subheader1: bigHeader}, {subheader2: !bigHeader}]")
      span(v-for='page in pages' style='padding-left: 50px')
        a(href='#' @click.prevent="showPage(page)" v-bind:class="[{onPage: show==page}, {offPage: show!=page}]")
          b {{page}}
    div.body(v-bind:class="[{body1: bigHeader}, {body2: !bigHeader}]")
      div
        b Status: {{status}}
        p &nbsp;
        About(v-if="show=='About'")
        Interests(v-else-if="show==='Interests'" :list='interests')
        Events(v-else-if="show==='Events'" :list='events' :invites='invites')
        Host(v-else-if="show==='Host'" :list='interests')
        Ideas(v-else-if="show==='Ideas'")
        Welcome(v-else)
    PublicFooter.footer(v-bind:class=" [{footer1: show==''}, {footer2: show!==''}]")
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
      pages: ['About', 'Interests', 'Events', 'Host', 'Ideas'],
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
      status: 'init'
    }
  },
  props: {
  },
  events: {
  },
  created: function () {
    console.log('retrieve interests...')
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    var URL = config.apiURL
    var urlHeader = config.apiHeader
    // axios(URL, { method: 'GET', headers: urlHeader })
    //   .then(function (result, err) {
    //     if (err) {
    //       console.log('test error...')
    //       console.log('axios error: ' + err)
    //       _this.status = 'test error'
    //     } else {
    //       _this.status = 'test passed'
    //       console.log('test returned value(s): ' + JSON.stringify(result.data))
    //     }
    //   })

    this.status = 'loading...'
    console.log('retrieve interests via axios from ' + URL)

    var _this = this
    axios(URL + '/interests', {method: 'GET', headers: urlHeader})
      .then(function (result, err) {
        if (err) {
          _this.status = 'nexterr'
          console.log('set axios error...')
          _this.$store.commit('setError', {context: 'Searching For ' + _this.scope, err: err})
          console.log('axios error: ' + err)
        } else {
          _this.status += 'loaded interests...'
          _this.interests = result.data

          console.log('axios returned value(s): ' + JSON.stringify(_this.interests))
          _this.$store.commit('setHash', {key: 'interests', value: _this.interests})
        }
      })

    console.log('retrieve skills via axios from ' + URL)
    axios(URL + '/skills', {method: 'GET', headers: urlHeader})
      .then(function (result, err) {
        if (err) {
          console.log('set axios error...')
          _this.$store.commit('setError', {context: 'Searching For ' + _this.scope, err: err})
          console.log('axios error: ' + err)
        } else {
          _this.status += 'loaded skills...'
          _this.skills = result.data
          _this.$store.commit('setHash', {key: 'skills', value: result.data})
          console.log('axios returned value(s): ' + JSON.stringify(result.data))
        }
      })
  },
  computed: {
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
  methods: {
    showPage (page) {
      console.log('show ' + page)
      this.show = page
      console.log('now ' + this.show)
    },
    loadData: function () {
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

      var _this = this
      axios.get(this.interestURL)
        .then(function (result, err) {
          if (err) {
            console.log('set error...')
            _this.$store.commit('setError', {context: 'Searching For ' + _this.scope, err: err})
            console.log('axios error: ' + err)
          } else {
            _this.interests = result.data

            console.log('axios returned value(s): ' + JSON.stringify(_this.interests))
            _this.$store.commit('setHash', {key: 'interests', value: _this.interests})
          }
        })

      console.log('retrieve skills...')
      axios.get(this.skillURL)
        .then(function (result, err) {
          if (err) {
            console.log('set error...')
            _this.$store.commit('setError', {context: 'Searching For ' + _this.scope, err: err})
            console.log('axios error: ' + err)
          } else {
            _this.skills = result.data
            _this.$store.commit('setHash', {key: 'skills', value: result.data})
            console.log('axios returned value(s): ' + JSON.stringify(result.data))
          }
        })
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

.body {
  background-color: $body-background-colour;
  color: $body-colour;
  z-index: 10000;
}
.body1 {
  // padding-top: 5px; // $subheader-height;
  min-height: calc(100vh - #{$header-height} - #{$subheader-height} - #{$footer-height});
}

.body2 {
  // padding-top: $subheader2-height;
  min-height: calc(100vh - #{$header2-height} - #{$subheader-height} - #{$footer2-height});
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
</style>
