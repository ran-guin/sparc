<template lang='pug'>
    div.container
      // b F: {{JSON.stringify(forms)}}"
      div(v-if="access !== 'host' && access !== 'admin'")
        p Anyone can act as a host but there are a few requirements.
        p All hosts must have:
        ul
          li Verified Identity
          li Verified Contact Information
          li Reference by existing member
          li Filled in a host application
        p Once you are an accepted host, then you will be on probation until members review your events
        p Hosts who fail to receive regular positive reviews for their events may be required to reapply for host status
        p These guidelines are in place to maximize the quality of active hosts
      div(v-else)
        span(v-for='page in pages' style='padding-left: 50px')
          a(href='#' @click.prevent="show=page" v-bind:class="[{onStep: show===page}, {offStep: show!==page}]")
            b.submenu {{page}} &nbsp;
            icon(name='question-circle' v-if='show===page' color='orange')
            icon(name='check-circle' v-else-if='completed[page]' color='green')
            icon(name='times' v-else-if='!completed[page]' color='red')
            span &nbsp;
        hr
        button.btn.btn-primary(v-on:click='checkInvites()') Check Invites Based on Current Settings
        span(v-if='invites')
          b &nbsp; -> {{invites.length}} Invites Applicable
          i &nbsp; &nbsp; [adjust user filters or activity lists to vary]

        // div.col-md-4
        div(v-show="show === 'Basics'")
          h3(v-if='forms.basics && forms.basics.Title') {{forms.basics.Title}}
          h3(v-else) Create Event
          DBForm(:options='basicFields' access='append' title: 'Host Event' :onSave='saveBasics' :record='forms.basic')
          // div(v-else)
          //   h3 {{forms.basics.Title}}
          //   table.table
          //     tr(v-for='field in basicFields.fields' v-show="field.name !== 'Title'")
          //       td {{field.name}}
          //       td {{forms.basics[field.name]}}
        // div.col-md-4
        div(v-show="show === 'Details'")
          p Fill in other details before finalizing your event
          DBForm(:options='detailsFields' access='append' title: 'Host Event' :onSave='saveDetails' :record='forms.details')

        div(v-show="show === 'Activity'")
          p Select the activities/interests that will be the focus of your event
          RecursiveList(title='Primary Activity' :list='aliases' :options='primaryOptions' :onPick='pickMe' :secondaryPick='skillPick' :onSave='savePrimary')
          // div(v-else)
          //   b {{JSON.stringify(this.forms.primary)}}

        div(v-show="show === 'Interests'")
          p Filter invitees on other interests they may have to target like-minded individuals (optional)
          RecursiveList(title='Secondary Interest(s)' :list='aliases' :options='secondaryOptions' :secondaryPick='skillPick' :onSave="saveSecondary")
          // div(v-else)
          //   b {{JSON.stringify(this.forms.secondary)}}
        // div.col-md-4
        div(v-show="show === 'Options'")
          p Additional options affecting the order of accepted participants
          h3 Advanced Options
          DBForm(:options='hostFilter' access='append' :record='forms.options' :onSave='saveOptions')
        div(v-show="show === 'Summary'")
          div.col-md-4
            DBForm(:options='basicFields' access='read' title: 'Host Event' :onSave='saveBasics' :record='forms.basics')
            hr
            DBForm(:options='detailsFields' access='read' title: 'Host Event' :onSave='saveDetails' :record='forms.details')
          div.col-md-4
            h4 Primary Activity
              b {{JSON.stringify(this.forms.primary_names)}}
            h4 Secondary Activity
              b {{JSON.stringify(this.forms.secondary_names)}}
          div.col-md-4
            h3 Advanced Options
            DBForm(:options='hostFilter' access='read' :record='forms.options')
          div.col-md-12
            hr
            span &nbsp;
            button.btn.btn-primary.form-control(v-on:click='saveEvent()') Save Event
        hr
        b {{JSON.stringify(forms)}}

</template>

<script>
import Modal from './../Standard/Modal'
import DBForm from './../Standard/DBForm'
import RecursiveList from './../Standard/RecursiveList.vue'
import config from './config.js'
import axios from 'axios'

export default {
  components: {
    Modal,
    DBForm,
    RecursiveList
  },
  data () {
    return {
      pages: ['Basics', 'Activity', 'Interests', 'Details', 'Options', 'Summary'],
      show: 'Basics',
      primaryOptions: { selectable: true, clear: true, modalID: 'eventModal' },
      secondaryOptions: { selectable: true, clear: true, modalID: 'eventModal' },
      basicFields: {
        fields: config.forms.eventBasics
      },
      detailsFields: {
        fields: config.forms.eventDetails
      },
      hostFilter: {
        fields: config.forms.event_filters
      },
      test: config.forms.event_filters,
      status: 'setup',
      skillPick: {
        show: this.definedSkill,
        selectText: '[skill]',
        onPick: this.eventModal
      },
      forms: {},
      completed: {},
      invites: null
    }
  },
  created () {
    this.status = 'loading...'
  },
  mounted () {
    this.status = 'mounted...'
  },
  props: {
    list: { type: Array },
    payload: { type: Object }
  },
  computed: {
    access: function () {
      if (this.payload) {
        return this.payload.access
      } else {
        return null
      }
    },
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
    pageAfter: function (page) {
      if (page >= this.pages.length) {
        this.show = this.pages[this.pages.length]
      } else if (this.completed[this.pages[page + 1]]) {
        console.log('page after ' + page + 'already completed')
        this.pageAfter(page + 1)
      } else {
        this.show = this.pages[page + 1]
      }
    },
    saveBasics: function (form) {
      console.log('copy form ' + JSON.stringify(form))
      this.$set(this.forms, 'basics', form)
      this.pageAfter(0)
      this.completed[this.pages[0]] = true
    },
    savePrimary: function (ids, labels) {
      console.log('copy primary form ' + JSON.stringify(ids))
      this.$set(this.forms, 'primary', ids)
      this.$set(this.forms, 'primary_names', labels)
      this.pageAfter(1)
      this.completed[this.pages[1]] = true
    },
    saveSecondary: function (ids, labels) {
      console.log(' copy ids' + JSON.stringify(ids))
      console.log(' copy labels' + JSON.stringify(labels))
      this.$set(this.forms, 'secondary', ids)
      this.$set(this.forms, 'secondary_names', labels)
      this.pageAfter(2)
      this.completed[this.pages[2]] = true
    },
    saveDetails: function (form) {
      console.log('copy form ' + JSON.stringify(form))
      this.$set(this.forms, 'details', form)
      this.pageAfter(3)
      this.completed[this.pages[3]] = true
    },
    saveOptions: function (form) {
      this.$set(this.forms, 'options', form)
      this.pageAfter(4)
      this.completed[this.pages[4]] = true
    },
    saveEvent: function (form) {
      console.log('save Event')
      console.log(JSON.stringify(this.forms))
    },
    checkInvites: function (form) {
      console.log('Check invites using input:')
      console.log(JSON.stringify(this.forms))

      var url = 'http://localhost:3333/invites?interest_ids=6,7'
      // var data = { interest_ids: [1, 2, 3] }
      var _this = this
      axios.get(url)
      // axios.post(url, data)
        .then(function (result, err) {
          if (err) {
            console.log('set axios host error...')
          } else {
            console.log('R: ' + JSON.stringify(result.data))
            _this.invites = result.data
            // _this.invite_count = 333
          }
        })
      console.log('passed..')
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
<style>
.onStep {
  color: black;
  font-weight: bold;
  border-bottom: 5px solid green;
  // background-color: grey !important;
}
.onStep:hover {
  color: black;
  // background-color: grey !important;
}
.offStep {
  // background-color: grey !important;
  color: grey;
}
.offStep:hover {
  // background-color: darkgrey !important;
  color: black;
}
</style>
