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
        RecursiveList(title='Social Interests' :list='social' :onSelect='skillModal' :selected='interest_ids' :options='listOptions')
      div(v-show="show==='Sport'")
        RecursiveList(title='Sports Interests' :list='sport' :onSelect='skillModal' :selected='interest_ids' :options='listOptions')
      div(v-show="show==='Cultural'")
        RecursiveList(title='Cultural Interests' :list='cultural' :onSelect='skillModal' :selected='interest_ids' :options='listOptions')
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
      aliases: {},
      loaded: false
    }
  },
  props: {
    list: { type: Array },
    interest_ids: { type: Array },
    payload: { type: Object }
  },
  created: function () {
    if (!this.loaded) {
      this.parseList()
    } else { console.log('already loaded') }
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
      var list = this.split_list['sport'] || []
      console.log('retrieved sport list: ' + list.length)
      return list
    },
    cultural: function () {
      var list = this.split_list['cultural'] || []
      console.log('retrieved cultural list: ' + list.length)
      return list
    },
    social: function () {
      var list = this.split_list['social'] || []
      console.log('retrieved social list: ' + list.length)
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
    },
    list: function (val) {
      this.parseList()
    }
  },
  methods: {
    parseList: function () {
      this.split_list = {}
      this.sections = []
      this.loaded = false

      console.log('parse list of interests...' + this.list.length)
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
      // console.log('generated split_list: ' + JSON.stringify(this.split_list))
      this.loaded = true
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
