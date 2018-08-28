<template lang='pug'>
  div.container
    div(v-show="!payload || !payload.userid")
      p Members may receive invitations automatically based upon their specified interests.
      p Non-members may attend public events until they are invited by existing members.
      hr
    span(v-for='page in pages' style='padding-left: 50px')
      a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
        b.submenu {{page}}
    hr.eventHR
    div(v-if="show === 'Upcoming'")
      ul
        li(v-for='event in list')
          Event(:event='event' :modal='eventModal')
    div(v-else-if="show === 'Public Events'")
      ul
        li(v-for='event in list')
          Event(:event='event' :modal='eventModal')
    div(v-else-if="show === 'Invitations'")
      ul
        li(v-for='event in invites')
          Event(:event='event' :modal='eventModal')
    div(v-else)
      h3 ... Search
</template>

<script>
import Event from './Event.vue'
import Modal from './../Standard/Modal.vue'

export default {
  components: {
    Event,
    Modal
  },
  data () {
    return {
      show: 'Upcoming',
      options: {
        type: Object
      }
    }
  },
  props: {
    list: { type: Array },
    invites: { type: Array },
    payload: { type: Object }
  },
  computed: {
    pages: function () {
      if (this.payload && this.payload.userid) {
        return ['Upcoming', 'Invitations', 'Search']
      } else {
        return ['Public Events', 'Search']
      }
    }
  },
  methods: {
    eventModal: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'info-modal')
    }
  }
}
</script>

<style>

.eventHR {
  border-top: 1px solid;
}
.eventOption {
  font-size: 20px;
}
.interests {
  color: blue;
}
.skills {
  color: orange;
}
</style>
