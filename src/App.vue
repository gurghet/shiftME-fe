<template>
  <div id="app">
    <nav>
      <router-link to="FavouriteSlots">Favourite Slots</router-link>
      <router-link to="SpareSlots">Spare Slots</router-link>
    </nav>
    <router-view></router-view>
    <div v-for="error in errorStack" class="ui negative message" :key="error.id">
      <i class="close icon" @click="close(error.id)"></i>
      <div class="header">Error</div>
      <p>{{error.message}}</p></div>
  </div>
</template>

<script>
import 'pure-semantic-ui-css/semantic.css'
export default {
  name: 'app',
  computed: {
    errorStack () {
      return this.$store.state.errorStack
    }
  },
  methods: {
    close (id) {
      this.$store.commit('REMOVE_ERROR_FROM_STACK', id)
    }
  }
}
</script>
