<template lang='pug'>
  div.container
    u How is this different?
    ul
      li(v-for='diff in differences')
        i {{diff}}
    div.col-md-6
      h3 Ideas for Hosting
      ul
        li(v-for='idea in hostList')
          h4 {{idea.name}}
            i.idea(v-if='idea.interests') &nbsp; &nbsp; [{{idea.interests}}]
          span(v-if='idea.description')
            p
              i {{idea.description}}
    div.col-md-6
      h3 Participate
      ul
        li(v-for='idea in list')
          h4 {{idea.name}}
            i.idea(v-if='idea.interests') &nbsp; &nbsp; [{{idea.interests}}]
          span(v-if='idea.description')
            p
              i {{idea.description}}

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
      list: config.demo_ideas,
      hostList: config.demo_hostIdeas,
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
  background-color: blue;
}
.description {
  color: red;
}
</style>