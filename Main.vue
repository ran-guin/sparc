<template lang='pug'>
  div
    PrivateHeader.header
    div.body.container
      h4 Social Platform Affecting Real Connections
      div.col-md-6
        h5 Interests
        RecursiveList(:list='aliases' :onPick='interestModal' :options='options')
      div.col-md-6
        h5 Skills
        ul
          li(v-for='skill in skills')
            b {{skill}}
    PublicFooter.footer
</template>

<script>
import DataGrid from './../Standard/DataGrid.vue'

import Modal from './../Standard/Modal.vue'
import Messaging from './../Standard/Messaging.vue'
import RecursiveList from './../Standard/RecursiveList.vue'

import PrivateHeader from './PrivateHeader.vue'
import PublicFooter from './PublicFooter.vue'

import axios from 'axios'
import config from '@/config.js'

import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/warning'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/close'
import 'vue-awesome/icons/question-circle'

export default {
  name: 'ovid',
  components: {
    DataGrid,
    Messaging,
    Modal,
    RecursiveList,
    PrivateHeader,
    PublicFooter
  },
  data () {
    return {
      skillURL: config.skillMirrorUrl,
      interestURL: config.interestMirrorUrl,
      interests: [{id: 1, 'name': 'sport', 'parent_id': null, selected: true}, {id: 2, 'name': 'social', 'parent_id': null, selected: true}, {id: 3, 'name': 'cultural', 'parent_id': null, selected: true}, {id: 4, 'name': 'running', 'parent_id': 1, selected: true}, {id: 5, 'name': 'biking', 'parent_id': 1, selected: true}, {id: 6, 'name': 'climbing', 'parent_id': 1}, {id: 7, 'name': 'trail', 'parent_id': 4, selected: true}, {id: 8, 'name': '5k', 'parent_id': 4, selected: true, skill_level: '20 min'}, {id: 9, 'name': '10k', 'parent_id': 4}, {id: 10, 'name': 'marathon', 'parent_id': 4, selected: true}, {id: 11, 'name': 'touring', 'parent_id': 5, selected: true}, {id: 12, 'name': 'road', 'parent_id': 5, selected: true}, {id: 13, 'name': 'mountain', 'parent_id': 5, selected: true}, {id: 14, 'name': 'trad', 'parent_id': 6}, {id: 15, 'name': 'sport climbing', 'parent_id': 6}, {id: 16, 'name': 'gym climbing', 'parent_id': 6}, {id: 17, 'name': 'dinner parties', 'parent_id': 2, selected: true}, {id: 18, 'name': 'potlucks', 'parent_id': 17, selected: true}, {id: 19, 'name': 'hosted', 'parent_id': 17, selected: true}, {id: 20, 'name': 'board games', 'parent_id': 2, selected: false}, {id: 21, 'name': 'Settlers of Cataan', 'parent_id': 20, selected: false}, {id: 22, 'name': 'Scrabble', 'parent_id': 20, selected: false}, {id: 23, 'name': 'museum', 'parent_id': 3, selected: true}, {id: 24, 'name': 'art gallery', 'parent_id': 3, selected: true}, {id: 25, 'name': 'ballet', 'parent_id': 3, selected: true}, {id: 26, 'name': 'opera', 'parent_id': 3, selected: true}, {id: 27, 'name': 'dancing', 'parent_id': 2, selected: true}, {id: 28, 'name': 'swing', 'parent_id': 27, selected: true}, {id: 29, 'name': 'blues', 'parent_id': 27, selected: true}, {id: 30, 'name': 'club', 'parent_id': 27, selected: true}, {id: 31, 'name': 'sports (watching)', 'parent_id': 2, selected: true}, {id: 32, 'name': 'philosophy', 'parent_id': 3, selected: true}, {id: 33, 'name': 'politics', 'parent_id': 3, selected: true}, {id: 34, 'name': 'science', 'parent_id': 3, selected: true}, {id: 35, 'name': 'hockey', 'parent_id': 31, selected: true}, {id: 36, 'name': 'football (American)', 'part_id': 31, selected: true}, {id: 37, 'name': 'football (European)', 'parent_id': 31, selected: true}, {id: 38, 'name': 'basketball', 'parent_id': 31}],

      skills: [{'activity': 'running', 'skill': 'complete newbie', 'level': 1}, {'activity': 'running', 'skill': 'beginner', 'level': 2}, {'activity': 'running', 'skill': 'intermediate', 'level': 3}, {'activity': 'running', 'skill': 'advanced', 'level': 4}, {'activity': 'running', 'skill': 'elite', 'level': 5}, {'activity': 'sport climbing', 'skill': 'complete newbie', 'level': 1}, {'activity': 'sport climbing', 'skill': '< 5.9', 'level': 2}, {'activity': 'sport climbing', 'skill': '50', 'level': 3}, {'activity': 'sport climbing', 'skill': '5.11', 'level': 4}, {'activity': 'sport climbing', 'skill': '5.12', 'level': 5}, {'activity': 'sport climbing', 'skill': '5.13+', 'level': 6}, {'activity': 'sport climbing', 'skill': 'top-rope', 'level': 1}, {'activity': 'sport climbing', 'skill': 'lead', 'level': 2}],
      openInterests: {'idnull': true, 'id0': true, 'id1': true},
      options: { nameKey: 'alias' }
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
    aliases: function () {
      var aliases = []
      for (var i = 0; i < this.interests.length; i++) {
        var interest = JSON.parse(JSON.stringify(this.interests[i]))

        if (interest.skill_level) {
          interest.alias = interest.name + '[' + interest.skill_level + ']'
        } else {
          interest.alias = interest.name
        }
        aliases.push(interest)
      }
      return aliases
    },
    storedInterests: function () {
      var C = this.$store.getters.getHash('interests') || []
      console.log('load Interests: ' + JSON.stringify(C))
      return C
    }
  },
  methods: {
    interestModal: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.getters.toggleModal('info-modal')
    }
  }
}
</script>

<style>
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
