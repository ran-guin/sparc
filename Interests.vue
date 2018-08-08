<template lang='pug'>
    div.container
        h5 Interests
        RecursiveList(:list='aliases' :onSelect='skillModal' :options='options')
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
      options: {
        selectable: true,
        showSelect: this.definedSkill,
        selectText: '- [experience level]'
      }
    }
  },
  props: {
    list: { type: Array }
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
