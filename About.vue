<template lang='pug'>
    div.about
      div.container
        span(v-for='page in pages' style='padding-left: 50px')
          a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
            b.submenu {{page}}
        p &nbsp;
        div(v-show="show === 'SPARC'")
          u
            h3 What is it ?
          ul
            li(v-for='step in overview')
              i {{step}}        
        div(v-show="show === 'Getting Started'")
          u
            h3 Participate
          ul
            li(v-for='step in setup')
              i {{step}}
        div(v-show="show === 'Hosting'")  
          u
            h3 Host
          ul
            li(v-for='step in hosting')
              i {{step}}
        div(v-show="show === 'Features'")
          h3 How is it different?
          ul
            li(v-for='diff in differences')
              i {{diff}}
</template>

<script>
import config from './config.js'

export default {
  components: {
  },
  data () {
    return {
      show: 'SPARC',
      pages: ['SPARC', 'Getting Started', 'Hosting', 'Features'],
      overview: config.overview,
      setup: config.setup,
      hosting: config.hosting,
      differences: config.demo_differences
    }
  },
  props: {
  },
  computed: {
    aliases: function () {
      var aliases = []
      for (var i = 0; i < this.list.length; i++) {
        var interest = JSON.parse(JSON.stringify(this.list[i]))

        if (interest.skill_level) {
          interest.alias = interest.name + ' [' + interest.skill_level + ']'
        } else {
          interest.alias = interest.name
        }
        aliases.push(interest)
      }
      return aliases
    }
  },
  methods: {
    interestModal: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'info-modal')
    },
    definedSkill: function (record) {
      if (record.skill_level) {
        return true
      } else {
        return false
      }
    },
    skillModal: function (record) {
      console.log('update skill info for ' + JSON.stringify(record))
      this.$store.dispatch('setModalData', record)
      this.$store.dispatch('toggleModal', 'info-modal')
    }
  }
}
</script>

<style>
</style>
