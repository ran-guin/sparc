<template lang='pug'>
    div(width='100%')
      div.container
        h2 Connecting Communities One Event at a Time...
        hr
      div.col-md-4
        h3 Alone ?
        img.welcome-slides(src='/static/images/alone.jpg')
      div.col-md-4
        h3 Find / Host Events
        img.welcome-slides(src='/static/images/host.jpg' )
      div.col-md-4
        h3 Connect
        img.welcome-slides(src='/static/images/event.jpg')
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

.welcome-slides {
  width: 100%;
}
</style>