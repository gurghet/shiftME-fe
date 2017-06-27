// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueFire from 'vuefire'
// import FireBase from 'firebase'
import store from '@/store'

// Vue.use(VueFire)

/* var config = {
  apiKey: 'AIzaSyCAy8mi3BvY-cuFmqXSadeTUrCSMrYFqf8',
  authDomain: 'shifter-97923.firebaseapp.com',
  databaseURL: 'https://shifter-97923.firebaseio.com',
  storageBucket: 'shifter-97923.appspot.com',
  messagingSenderId: '563205507519'
} */
// const firebase = FireBase.initializeApp(config)
// const firebasedb = firebase.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    user: {},
    messages: []
  },
  store,
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    /* firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Cache user - an '''anonymously''' authenticated firebase.User account
        //  - https://firebase.google.com/docs/reference/js/firebase.User
        this.user = user
        // Bind this instance's 'messages' property to the 'messages/${uid}'
        // Firebase reference via vuefire.js' $bindAsArray() method
        this.$bindAsArray('messages', firebasedb.ref('messages/' + user.uid))
        // Note: Child component instances will have access to these
        // references via this.$root.user and this.$root.messages
      } else {
        /* firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        }); *\/
        // firebase.auth().signInAnonymously().catch(console.error)
      }
    }) */
  },
  mounted () {
    this.$store.dispatch('createMonth', { year: 2017, month: 1 })
  }
})
