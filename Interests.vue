<template lang='pug'>
    div.container
      span(v-for='page in pages' style='padding-left: 50px')
        a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
          b.submenu {{page}}
      p &nbsp;
      h3 Specify Interests
      div(v-show="show==='Sport'")
        RecursiveList(:list='sport' :onSelect='skillModal' :options='options')
      div(v-show="show==='Cultural'")      
        RecursiveList(:list='cultural' :onSelect='skillModal' :options='options')
      div(v-show="show==='Social'")
        RecursiveList(:list='social' :onSelect='skillModal' :options='options')
</template>

<script>
import Modal from './../Standard/Modal'
import RecursiveList from './../Standard/RecursiveList.vue'

export default {
  components: {
    Modal,
    RecursiveList
  },
  data () {
    return {
      pages: ['Social', 'Sport', 'Cultural'],
      show: 'Social',
      options: {
        selectable: true,
        showSelect: this.definedSkill,
        selectText: '- [experience level]'
      },
      split_list: {},
      sections: [],
      aliases: {}
    }
  },
  props: {
    list: { type: Array }
  },
  created: function () {
    var inList = {}
    for (var i = 0; i < this.list.length; i++) {
      var interest = this.list[i]
      var id = interest.id
      var parent = interest.parent_id
      var name = interest.name

      if (interest.skill_level) {
        interest.alias = interest.name + ' [' + interest.skill_level + ']'
      } else {
        interest.alias = interest.name
      }
      var section = inList[parent] || name
      inList[id] = section

      if (parent && inList[parent]) {
        this.split_list[section].push(interest)
        console.log('add ' + interest.name + ' to ' + section)
      } else {
        this.split_list[section] = [interest]
        this.sections.push(name)
        console.log(section + ' section added for ' + name)
      }
    }
    console.log('generated sections: ' + this.sections.join(', '))
    console.log('generated split_list: ' + JSON.stringify(this.split_list))
  },
  computed: {
    sport: function () {
      console.log('retrieved sport list: ')
      var list = this.split_list['sport']
      console.log(JSON.stringify(list))
      return list
    },
    cultural: function () {
      console.log('retrieved cultural list: ')
      var list = this.split_list['cultural']
      console.log(JSON.stringify(list))
      return list
    },
    social: function () {
      console.log('retrieved social list: ')
      var list = this.split_list['social']
      console.log(JSON.stringify(list))
      return list
    }
    // aliases: function () {
    //   var aliases = []
    //   for (var i = 0; i < this.list.length; i++) {
    //     var interest = JSON.parse(JSON.stringify(this.list[i]))

    //     if (interest.skill_level) {
    //       interest.alias = interest.name + ' [' + interest.skill_level + ']'
    //     } else {
    //       interest.alias = interest.name
    //     }
    //     aliases.push(interest)
    //   }
    //   return aliases
    // }
  },
  methods: {
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
