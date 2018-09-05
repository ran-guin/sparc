<template lang='pug'>
    div(width='100%')
      div.container
        h2 Connecting Communities One Event at a Time...
        hr
      div.col-title.col-md-4
        h3 Looking for your Tribe ?
        img.welcome-slides(src='/static/images/sparc/alone-sunset.jpg')
      div.col-md-4
        h3 Find / Host Events
        img.welcome-slides(src='/static/images/sparc/host-glasses.jpg' )
      div.col-md-4
        h3 Connect
        img.welcome-slides(src='/static/images/sparc/event-table.jpg')
</template>

<script>
import Modal from './../Standard/Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

.col-title {
  text-align: center;
  color: green;
}

.welcome-slides {
  width: 100%;
}
</style>
