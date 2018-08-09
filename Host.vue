<template lang='pug'>
    div.container
      // b F: {{JSON.stringify(forms)}}"
      div.col-md-4
        h3(v-if='forms.host && forms.host.Title') {{forms.host.Title}}
        h3(v-else) Create Event
        DBForm(:options='hostFields' title: 'Host Event' :onSave='saveEvent')
      div.col-md-4
        h3 Primary Activity
        RecursiveList(:list='aliases' :options='primaryOptions' :onPick='pickMe' :secondaryPick='skillPick' :onSave='savePrimary')
        hr
        h3 Secondary Interest(s)
        RecursiveList(:list='aliases' :options='secondaryOptions' :secondaryPick='skillPick' :onSave="saveSecondary")
      div.col-md-4
        h3 Advanced Options
        DBForm(:options='hostFilter')
      // button.btn.btn-primary.form-control(v-on:click='saveEvent()') Save Event
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
      primaryOptions: { selectOne: true, clear: true, modalID: 'eventModal' },
      secondaryOptions: { selectable: true, clear: true, modalID: 'eventModal' },
      hostFields: {
        access: 'append',
        fields: config.forms.event
      },
      hostFilter: {
        access: 'append',
        fields: config.forms.event_filters
      },
      test: config.forms.event_filters,
      status: 'setup',
      skillPick: {
        show: this.definedSkill,
        selectText: '[skill]',
        onPick: this.eventModal
      },
      forms: {}
    }
  },
  created () {
    this.status = 'loading...'
  },
  mounted () {
    this.status = 'mounted...'
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
      this.$store.dispatch('toggleModal', 'eventModal')
    },
    pickMe: function (record) {
      console.log('pick ' + JSON.stringify(record))
    },
    saveEvent: function (form) {
      console.log('copy form ' + JSON.stringify(form))
      this.$set(this.forms, 'host', form)
    },
    savePrimary: function (form) {
      console.log('copy primary form ' + JSON.stringify(form))
      this.$set(this.forms, 'primary', form)
    },
    saveSecondary: function (form) {
      console.log(' copy secondary form ' + JSON.stringify(form))
      this.$set(this.forms, 'secondary', form)
    },

    definedSkill: function (record) {
      if (record.skill_level) {
        return true
      } else {
        return false
      }
    },
    eventModal: function (record) {
      console.log('update skill info for ' + JSON.stringify(record))
      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'eventModal')
    }
  }
}
</script>
