<template lang='pug'>
  div.container
    div.col-md-6
      h2 Upcoming
      ul
        li(v-for='event in list')
          b {{event.name}} [{{event.location}}]
            i.interests(v-if='event.interests') &nbsp; &nbsp; [{{event.interests}}]
            span(v-if='event.skills')
              a(href='#' data-toggle='tooltip' :title='event.skills')
                span &nbsp; &nbsp;
                icon(name='exclamation-triangle')
                <!-- i.skills &nbsp; &nbsp; {{event.skills}} -->
    div.col-md-6
      h2 Invitations
      ul
        li(v-for='event in invites')
          b {{event.name}} [{{event.location}}]
            i.interests(v-if='event.interests') &nbsp; &nbsp; [{{event.interests}}]
            span(v-if='event.skills')
              a(href='#' data-toggle='tooltip' :title='event.skills')
                span &nbsp; &nbsp;
                icon(name='exclamation-triangle' color='red')
</template>

<script>
import Modal from './../Standard/Modal.vue'
import 'vue-awesome/icons/exclamation-triangle'

export default {
  components: {
    Modal
  },
  data () {
    return {
      options: {
        type: Object
      }
    }
  },
  props: {
    list: { type: Array },
    invites: { type: Array }
  },
  computed: {
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

.interests {
  color: blue;
}
.skills {
  color: orange;
}
</style>
