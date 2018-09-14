<template lang='pug'>
  div.container
    span(v-for='page in pages' style='padding-left: 50px')
      a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
        b.submenu {{page}}

    div(v-for='page in pages')
      div(v-if="show === page")
        h3.heading {{page}} Filters:
        li(v-for='item in filters[page]')
          b {{item.name}}
          p
            i {{item.description}}

</template>

<script>
import Modal from './../Standard/Modal.vue'
import config from './config.js'

export default {
  components: {
    Modal
  },
  data () {
    return {
      pages: ['Event', 'Participant'],
      show: 'Event',
      options: {
        type: Object
      },
      filters: config.filters
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    exampleModal: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'info-modal')
    }
  }
}
</script>

<style>

.example {
  font-weight: bold;
}
.description {
  color: red;
}
</style>
