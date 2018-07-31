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
        <!-- button.btn.btn-lg.button-primary(@click.prevent="showPage('interests')")  -->
          <!-- b Interests -->
        span &nbsp; &nbsp;
        p &nbsp;

      div.onPage
        p &nbsp;
        <!-- Interests(v-if="show==='Interests'" :list='interests') -->
        <!-- Events(v-if="show==='Events'" :list='events') -->
        <!-- Host(v-if="show==='Host'" :list='interests') -->

        <!-- About(v-if="show=='About'") -->
        <!-- Ideas(v-if="show==='Ideas'") -->
        p &nbsp;

    PublicFooter.footer
</template>

<script>
// import Interests from './Interests'
// import Events from './Events'
// import Ideas from './Ideas'
// import About from './About'
// import Host from './Host'

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
    // Interests,
    // Events,
    // Ideas,
    // About,
    // Host,
    Modal,
    PrivateHeader,
    PublicFooter
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
  background-color: lightgreen !important;
}
.onPage:hover {
  color: black;
  background-color: lightgreen !important;
}
.offPage {
  background-color: #eee !important;
}
.offPage:hover {
  background-color: #aaa !important;
}

.page {
  /*margin-top: -20px;*/
  height: 100%;
  width: 100%;
}
.body {
  min-height: calc(100vh - 150px);
}
.header {
  height: 80px;
  background-color: #3a3;
}
.footer {
  height: 70px;
  /*padding: 10px;*/
  background-color: #ccc;
}

  .body {
    height: auto;
  }
  .pageWrapper {
    margin: 0px;
  }

  .flexWrapper {
    display: flex;
    flex-flow: row no-wrap;
  }

  .flexChild {
    flex: 1;
    justify-content: space-around;
  }

  .mainBlock {
    padding: 20px;
    align-content: top;
  }

  .user-section, .scheduled-section, .coverage-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }

  .block {
    padding: 0px;
    /*border: 1px solid black;*/
    min-height: 200px;
  }
  .block-header {
    padding: 10px;
    background-color: #ccc;
  }
  .block-subheader {
    padding: 10px;
    background-color: #ddd;
  }
  .block-body {
    padding: 20px;
    background-color: #eee;
  }
  .block-footer {
    padding: 20px;
    background-color: '#eee';
  }
  .coverageBlock {
    border: solid black 3px;
    padding: 20px;
    min-width: 200px;
    max-width: 400px;
  }
  .mainBlock {
    border-top: solid black 3px;
    border-right: solid black 3px;
    padding: 20px;
    transition: opacity 1s ease;
  }
  .mainSection {
    transition: visibility 0s linear 0s, opacity 1000ms;
  }

  .footer {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo-s {
    max-height: 70px;
    margin-top: -15px;
    padding-right: 50px;
  }
</style>
