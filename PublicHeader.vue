<!--       button.btn.btn-default(v-if='login')
        router-link(:to="{name: 'Login'}") Log In 
 -->
<template lang='pug'>
  div
    HEAD
      meta(name='viewport' content='width=device-width, initial-scale=1.0')
      link(rel="shortcut icon" :href='ico')

    div.publicHeader
      span.navbar-left
      span.navbar-centre(v-if="centre" v-html="centre")
      span.navbar-right
        span(v-if='right' v-html="right")
        span &nbsp; &nbsp;
 </template>


<script>
export default {
  data () {
    return {
      ico: '/static/images/icons/cosine.ico'
    }
  },
  props: {
    left: {
      type: String
    },
    right: {
      type: String
    },
    centre: {
      type: String,
      default: ''
    },
    login: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
img.logo {
  max-height: 200px;
}*/
</style>
