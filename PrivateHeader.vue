<template lang='pug'>
  div.info-header
    div.col-xs-2.info-logo
      router-link(:to="{name: 'Sparc'}")
        img(src='/static/images/venn.jpg' height='40px')
    div.col-xs-6.info-left
      b.input-lg SPARC &nbsp; &nbsp;
    div.col-xs-4
      span.navbar-right
        table
          tr
            td
              <!-- LoginButton(:payload='payload') -->
            td
              SearchButton()
</template>

<script>
import User from '@/components/User'
// import LoginPopup from '@/components/Standard/LoginPopup'
// import LoginButton from '@/components/Standard/LoginButton'
import SearchButton from '@/components/Standard/SearchButton'

import 'vue-awesome/icons/home'
import 'vue-awesome/icons/bars'

export default {
  data () {
    return {
      addStaff: {'user': ['name'], 'staff': ['alias']},
      userFields: ['email', 'name'],
      userSearch: false,
      staffSearch: true
    }
  },
  components: {
    User,
    // LoginButton,
    SearchButton
  },
  props: {
    searchOpen: {
      type: Boolean,
      default: false
    },
    patient: {
      type: Object,
      default () { return {} }
    },
    staff: {
      type: Object,
      default () { return {} }
    },
    demo: {
      type: Boolean
    }
  },
  computed: {
    payload: function () {
      var payload = this.$store.getters.payload || null
      if (payload && payload.constructor === Object) {
        console.log('payload: ' + payload)
        return payload
      } else if (payload && payload.constructor === String) {
        console.log('payload: ' + payload)
        return JSON.parse(payload)
      } else {
        return { access: 'public' }
      }
    }
  },
  methods: {
    setPatient (data) {
      console.log('set Patient')
      console.log(JSON.stringify(data))

      var keys = Object.keys(data[0])
      for (var i = 0; i < keys.length; i++) {
        this.$set(this.patient, keys[i], data[0][keys[i]])
      }

      console.log(JSON.stringify(this.patient))
    },
    setStaff (data) {
      console.log('set Staff')
      console.log(JSON.stringify(data))

      var keys = Object.keys(data[0])
      for (var i = 0; i < keys.length; i++) {
        this.$set(this.staff, keys[i], data[0][keys[i]])
      }
      console.log(JSON.stringify(this.staff))
    },
    clearPatient () {
      if (this.patient) {
        var keys = Object.keys(this.patient)
        for (var j = 0; j < keys.length; j++) {
          this.$delete(this.patient, keys[j])
        }
      } else { console.log('patient already empty') }
    },
    clearStaff () {
      if (this.staff) {
        var keys = Object.keys(this.staff)
        for (var j = 0; j < keys.length; j++) {
          this.$delete(this.staff, keys[j])
        }
      } else { console.log('staff already empty') }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.info-header {
  padding: 10px;
  height: 60px;
  color: #666;
  background-color: white;
}
.info-logo {
  text-align: left;
}

.info-left {
  text-align: left;
}

.info-right {
  text-align: right;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
