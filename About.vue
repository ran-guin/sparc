<template lang='pug'>
    div.about
      div.container
        h3 How it Works:
        div.col-md-6
          u 
            h4 Participate
          ul
            li(v-for='step in setup')
              i {{step}}
        div.col-md-6
          u 
            h4 Host
          ul
            li(v-for='step in hosting')
              i {{step}}
        
</template>

<script>
import config from './config.js'

export default {
  components: {
  },
  data () {
    return {
      setup: config.setup,
      hosting: config.hosting
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
