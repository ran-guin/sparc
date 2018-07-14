<template lang='pug'>
  div.publicFooter
    div.container
      div.navbar-left(v-html="left")
      a(href='/')
        span.acronym
          b &nbsp; C
          span ommunity 
          b &nbsp; O
          span riented
          b &nbsp; S
          span oftware
          b &nbsp; I
          span nnovation 
          b &nbsp; N
          span etwork
      span &nbsp; &nbsp;
      span &nbsp; &nbsp; 

      span.navbar-centre(v-html="centre")
      div.navbar-right(v-html="right")
</template>


<script>
export default {
  // template: require('./main.pug'),

  data () {
    return {
    }
  },
  props: {
    left: {
      type: String
    },
    right: {
      type: String,
      default: "<a href='mailto:subir_guin@hotmail.ca?Subject=T4U%20website%20Contact'>Contact Us</a>"
    },
    centre: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .publicFooter {
    color: grey ;
    background-color: white;
  }

  publicFooter span a {
    color: grey;
  }

  img.logo-s {
    max-height: 70px;
    margin-top: -15px;
    padding-right: 50px;
  }

  a {
    color: black;
  }
 /* publicFooter span a:hover {
    color: red;
  }*/
</style>
