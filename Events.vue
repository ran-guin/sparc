<template lang='pug'>
  div.container
    h5 Events
    ul
      li(v-for='event in list')
        b {{event.name}} [{{event.location}}]
          i.interests(v-if='event.interests') &nbsp; &nbsp; [{{event.interests}}]
          span(v-if='event.skills')
            i.skills &nbsp; &nbsp; {{event.skills}}
</template>

<script>
import Modal from './../Standard/Modal.vue'

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
    list: { type: Array }
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
  color: red;
}
</style>