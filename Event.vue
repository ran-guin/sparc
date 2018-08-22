<template lang='pug'>
  div
    div.event
      table.table
        tr
          td(width='300px')
            img.event-thumbnail(:src='image')
          td
            h2 {{title}}
            div.navbar-right [{{event.location}}]
            ul(v-if='event.interests')
              span(v-for="int in event.interests.split(', ')")
                li.interests {{int}}
            span(v-else) no interests specified
            // i.interests(v-if='event.interests') &nbsp; &nbsp; [{{event.interests}}]
            div(v-if='event.skills')
              hr
              span Experience required: &nbsp;
              b {{event.skills}}
</template>

<script>
import 'vue-awesome/icons/exclamation-triangle'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  props: {
    event: {
      type: Object,
      default () { return {} }
    },
    modal: {
      type: Function
    }
  },
  computed: {
    image: function () {
      if (this.event.image) {
        return '/static/images/sparc/' + this.event.image
      } else {
        return '/static/images/sparc/default.png'
      }
    },
    title: function () {
      if (this.event.title) {
        return this.event.title
      } else {
        return this.event.name
      }
    }
  },
  methods: {
  }
}
</script>

<style>

.event {
  border: 1px solid black;
  padding: 20px;
  margin: 20px;
}
.event-thumbnail {
  width: 250px;
  margin: 10px;
}
</style>
