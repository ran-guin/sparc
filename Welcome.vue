<template lang='pug'>
    div(width='100%')
      div.container(v-if='payload && payload.username')
        h3
          u {{payload.username}}'s Dashboard
        hr
        div.col-md-4
          h4 Registered Interests ({{interests.length}})
          ul
            li(v-for='interest in interests')
              b {{interest}}
        div.col-md-4
          h4 Upcoming Events ({{events.length}})
          ul
            li(v-for='event in events')
              b {{event}}
        div.col-md-4
          h4 Current Invitations ({{invites.length}})
          ul
            li(v-for='invite in invites')
              b {{invite}}
      div(v-else)
        div.container
          h2 Connecting Communities One Event at a Time...
          hr
        div.col-md-12
          div.col-title.col-md-3
            a.pick(href='#' v-on:click="pickMe('Interests')")
              h3 Looking for your Tribe ? . . .
            <!-- img.welcome-slides(src='/static/images/sparc/alone-sunset.jpg') -->
          div.col-title.col-md-3
            a.pick(href='#' v-on:click="pickMe('Events')")
              h3 Find Events . . .
            <!-- img.welcome-slides(src='/static/images/sparc/host-glasses.jpg' ) -->
          div.col-title.col-md-3
            a.pick(href='#' v-on:click="pickMe('Host')")
              h3 Host Events . . .
            <!-- img.welcome-slides(src='/static/images/sparc/host-glasses.jpg' ) -->
          div.col-title.col-md-3
            h3 Connect !
            <!-- img.welcome-slides(src='/static/images/sparc/event-table.jpg') -->
</template>

<script>
import Modal from './../Standard/Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
    }
  },
  props: {
    redirect: {type: Function},
    payload: {type: Object},
    interests: {type: Array},
    events: {type: Array},
    invites: {type: Array}
  },
  computed: {
  },
  methods: {
    pickMe (page) {
      if (this.redirect && this.redirect.constructor === Function) {
        console.log('redirect to ' + page)
        this.redirect(page)
      } else {
        console.log('no redirect method defined... ')
      }
    }
  }
}
</script>

<style scoped>

.container {
  color: white;
}

.h3 {
  color: grey
}

.col-title {
  text-align: center;
  color: #eee;
}

.pick {
  color: #ccc;
}

.pick:hover {
  color: #fff;
  text-decoration: none;
}

.welcome-slides {
  width: 100%;
}
</style>
