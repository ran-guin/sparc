<template lang='pug'>
  div
    PrivateHeader.header
    div.body
      div.container
        h4 Social Platform Affecting Real Connections
      hr
      div.container
        span(v-for='page in pages')
          button.btn.btn-lg.button-primary(@click.prevent="showPage(page)" v-bind:class="[{onPage: show==page}, {offPage: show!=page}]")
            b {{page}}
          span &nbsp; &nbsp;
        <!-- button.btn.btn-lg.button-primary(@click.prevent="showPage('interests')") -->
          <!-- b Interests -->
        span &nbsp; &nbsp;
        p &nbsp;

      div
        p &nbsp;
        Interests(v-if="show==='Interests'" :list='interests')
        Events(v-if="show==='Events'" :list='events')
        Host(v-if="show==='Host'" :list='interests')

        About(v-if="show=='About'")
        Ideas(v-if="show==='Ideas'")
        p &nbsp;

    PublicFooter.footer
</template>

<script>
import Interests from './Interests'
import Events from './Events'
import Ideas from './Ideas'
import About from './About'
import Host from './Host'

import Modal from './../Standard/Modal'

import PrivateHeader from './PrivateHeader.vue'
import PublicFooter from './PublicFooter.vue'

import axios from 'axios'
import config from './config.js'

import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/question-circle'

export default {
  name: 'ovid',
  components: {
    Interests,
    Events,
    Ideas,
    About,
    Host,
    PrivateHeader,
    PublicFooter,
    Modal
  },
  data () {
    return {
      pages: ['Interests', 'Events', 'Host', 'About', 'Ideas'],
      show: 'Events',
      onPage: 'Events',
      skillURL: config.skillMirrorUrl,
      interestURL: config.interestMirrorUrl,
      interests: config.demo_interests,
      skills: config.demo_skills,
      events: config.demo_events,
      openInterests: {'idnull': true, 'id0': true, 'id1': true},
      bc: 'green'
    }
  },
  props: {
  },
  events: {
  },
  created: function () {
    console.log('retrieve interests...')
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
  },
  computed: {
    storedInterests: function () {
      var C = this.$store.getters.getHash('interests') || []
      console.log('load Interests: ' + JSON.stringify(C))
      return C
    }
  },
  methods: {
    showPage (page) {
      console.log('show ' + page)
      this.show = page
      console.log('now ' + this.show)
    }
  }
}
</script>

<style>

.onPage {
  color: black;
  background-color: grey !important;
}
.onPage:hover {
  color: black;
  background-color: grey !important;
}
.offPage {
  background-color: grey !important;
  color: white;
}
.offPage:hover {
  background-color: darkgrey !important;
  color: black;
}
</style>
