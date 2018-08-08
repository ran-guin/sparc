<template lang='pug'>
  div.container
    div.col-md-4
      h3 What is new?
      ul
        li(v-for='diff in differences')
          i {{diff}}
    div.col-md-4
      h3 Ideas for Hosting
      ul
        li(v-for='idea in hostList')
          u.idea(v-if='idea.name') {{idea.name}}
          span(v-if='idea.description')
            p
              b {{idea.description}}
          span(v-if='idea.example')
            p
              i eg: {{idea.example}}
    div.col-md-4
      h3 Participate
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
      options: {
        type: Object
      },
      list: config.member_ideas,
      hostList: config.host_ideas,
      differences: config.demo_differences
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
