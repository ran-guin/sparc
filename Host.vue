<template lang='pug'>
    div.container
      h5 Host Event
      div.col-md-4
        u Basics
        DBForm(:options='hostFields')
      div.col-md-4
        u Primary Activity
        RecursiveList(:list='aliases' :options='options' :onPick='pickMe')
        hr
        u Secondary Interest
        RecursiveList(:list='aliases' :options='options')        
      div.col-md-4
        u Advanced Options
        DBForm(:options='hostFilter')
</template>

<script>
import Modal from './../Standard/Modal'
import DBForm from './../Standard/DBForm'
import RecursiveList from './../Standard/RecursiveList.vue'
import config from './config.js'

export default {
  components: {
    Modal,
    DBForm,
    RecursiveList
  },
  data () {
    return {
      options: { selectOne: true, clear: true },
      hostFields: {
        access: 'append',
        fields: config.forms.event
      },
      hostFilter: {
        access: 'append',
        fields: config.forms.event_filters
      },
      test: config.forms.event_filters
    }
  },
  props: {
    list: { type: Array }
  },
  computed: {
    aliases: function () {
      var aliases = []
      for (var i = 0; i < this.list.length; i++) {
        var interest = JSON.parse(JSON.stringify(this.list[i]))

        if (interest.skill_level) {
          interest.alias = interest.name + ' [' + interest.skill_level + ']'
        } else {
          interest.alias = interest.name
        }
        aliases.push(interest)
      }
      return aliases
    }
  },
  methods: {
    interestModal: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'info-modal')
    },
    pickMe: function (record) {
      console.log('pick ' + JSON.stringify(record))
    }
  }
}
</script>