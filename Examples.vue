<template lang='pug'>
  div.container
    span(v-for='type in example_types' style='padding-left: 50px')
      a(href='#' @click.prevent="show=type" v-bind:class="[{onPage: show===type}, {offPage: show!==type}]")
        b.submenu {{type}}
        span &nbsp; &nbsp;
    p &nbsp;
    span(v-for='type in example_types' style='padding-left: 50px')
      span(v-show='show === type')
        ul
          li(v-for='example in examples[type]')
            u.example(v-if='example.name') {{example.name}}
            span(v-if='example.description')
              p
                b {{example.description}}
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
      show: 'ideas',
      options: {
        type: Object
      },
      examples: config.examples
    }
  },
  props: {
  },
  computed: {
    example_types: function () {
      if (this.examples.constructor === Object) {
        return Object.keys(this.examples)
      } else {
        return []
      }
    }
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
