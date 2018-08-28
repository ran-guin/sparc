<template lang='pug'>
    div.container
      div(v-show="!payload || !payload.userid")
        p Select from a broad list of specific activities & interests within a few fundamental categories.
        p Members can also propose new event/activity subtypes so this list can continue to expand to meet community needs
        hr
      span(v-for='page in pages' style='padding-left: 50px; border 1px solid black')
        a(href='#' @click.prevent="show=page" v-bind:class="[{onPage: show===page}, {offPage: show!==page}]")
          b.submenu {{page}}
      p &nbsp;
      <!-- h3 Specify Interests -->
      div(v-show="show==='Social'")
        u
          h4 Social Interests:
        RecursiveList(:list='social' :onSelect='skillModal' :selected='interest_ids' :options='listOptions')
      div(v-show="show==='Sport'")
        u
          h4 Sporting Interests:
        RecursiveList(:list='sport' :onSelect='skillModal' :selected='interest_ids' :options='listOptions')
      div(v-show="show==='Cultural'")
        u 
          h4 Cultural Interests:
        RecursiveList(:list='cultural' :onSelect='skillModal' :selected='interest_ids' :options='listOptions')
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
      split_list: {},
      sections: [],
      aliases: {}
    }
  },
  props: {
    list: { type: Array },
    interest_ids: { type: Array },
    payload: { type: Object }
  },
  created: function () {
    this.subdivideList()
  },
  computed: {
    listOptions: function () {
      var options = {
        selectable: true,
        showSelect: this.definedSkill,
        selectText: '- [experience level]'
      }
      if (this.payload && this.payload.userid) {
        options.open = 'selected'
        options.hide = true
      } else {
        options.open = 'all'
      }

      return options
    },
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
  watch: {
    interest_ids: function (val) {
      console.log('WATCHED interest_ids: ' + val)
    }
  },
  methods: {
    subdivideList: function () {
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
          // console.log('add ' + interest.name + ' to ' + section)
        } else {
          this.split_list[section] = [interest]
          this.sections.push(name)
          console.log(section + ' section added for ' + name)
        }
      }
      console.log('generated sections: ' + this.sections.join(', '))
      console.log('generated split_list: ' + JSON.stringify(this.split_list))
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
