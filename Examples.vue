<template lang='pug'>
  div.container
    span(v-for='page in pages' style='padding-left: 50px')
      a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
        b.submenu {{page}}

    div(v-if="show === 'Hosting'")
      p &nbsp;
      ul
        li(v-for='example in hostList')
          u.example(v-if='example.name') {{example.name}}
          span(v-if='example.description')
            p
              b {{example.description}}
          span(v-if='example.example')
            p
              i eg: {{example.example}}
    div(v-if="show === 'Attending'")
      p &nbsp;
      ul
        li(v-for='example in list')
          u.example(v-if='example.name') {{example.name}}
          span(v-if='example.description')
            p
              b {{example.description}}
          span(v-if='example.example')
            p
              i eg: {{example.example}}

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
      pages: ['Hosting', 'Attending'],
      show: 'Attending',
      options: {
        type: Object
      },
      list: config.member_examples,
      hostList: config.host_examples
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
