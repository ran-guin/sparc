<template lang='pug'>
    div.about
      div.container
        span(v-for='page in pages' style='padding-left: 50px')
          a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
            b.submenu {{page}}
        p &nbsp;
        div(v-show="show === 'What is it?'")
          h3 SPARC is a platform that makes it easy to:
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
        div(v-show="show === 'Differences'")
          h3 How is it different from Meetup ?
          p A number of differences set SPARC apart from other slightly similar platforms such as Meetup, Facebook events, Airbnb experience, Group Mailing lists, or Online Dating.
          p We focus on providing much greater control to users & hosts resulting in a smaller but richer number of interactions. &nbsp; &nbsp;
          h4 (Quality over Quantity)
          ul
            li(v-for='diffs, type in differences')
              b {{type}}
              ul
                li(v-for='item in diffs')
                  i {{item}}
              br &nbsp;

        div(v-show="show === 'Ideas'")
          h3 What sort of things would I find?
          p There are a broad range of ideas for how both participants & hosts can use SPARC:
          ul
            li(v-for='idea in ideas')
              b {{idea.name}}
              p
                i {{idea.description}}
</template>

<script>
import config from './config.js'

export default {
  components: {
  },
  data () {
    return {
      show: 'What is it?',
      pages: ['What is it?', 'Getting Started', 'Hosting', 'Differences', 'Ideas'],
      overview: config.overview,
      setup: config.setup,
      hosting: config.hosting,
      differences: config.demo_differences,
      ideas: config.featured_ideas
      // incentives: config.demo_differences
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
