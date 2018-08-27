<template lang='pug'>
  div.container
    span(v-for='page in pages' style='padding-left: 50px')
      a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
        b.submenu {{page}}

    div(v-if="show === 'Hosting'")
      p &nbsp;
      ul
        li(v-for='idea in hostList')
          u.idea(v-if='idea.name') {{idea.name}}
          span(v-if='idea.description')
            p
              b {{idea.description}}
          span(v-if='idea.example')
            p
              i eg: {{idea.example}}
    div(v-if="show === 'Attending'")
      p &nbsp;
      ul
        li(v-for='idea in list')
          u.idea(v-if='idea.name') {{idea.name}}
          span(v-if='idea.description')
            p
              b {{idea.description}}
          span(v-if='idea.example')
            p
              i eg: {{idea.example}}

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
      list: config.member_ideas,
      hostList: config.host_ideas
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    ideaModal: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'info-modal')
    }
  }
}
</script>

<style>

.idea {
  font-weight: bold;
}
.description {
  color: red;
}
</style>
