<template>
<div>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    dark
    v-show="userActive"
  >
    <v-list class="pt-5">
      <v-divider light></v-divider>

      <v-list-tile
        v-for="item in itemsMenu"
        :key="item.text"
        @click="url(item.url)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini" v-if="!mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-btn icon @click.stop="mini = !mini" v-else>
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>  
    <!-- display the navigation bar -->
  <v-toolbar
    color="primary"
    dense
    fixed
    clipped-left
    app
    dark
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"  v-show="userActive"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">GerenciaPCG</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- navigation bar links -->
    <div v-show="!userLogedIn">
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          dark
          v-on="on"
        >
          <v-icon>
            person
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          :to="item.link"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </div>
    <!-- sign out button -->
    <div v-show="userLogedIn">
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" icon @click="logoutFromFirebase">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>
        <span>Cerrar sesión</span>
      </v-tooltip>
      <span class="hidden-sm-and-down">
        {{userName}}
      </span>
    </div>
  </v-toolbar>
</div>
</template>
<script>
import { mapState } from "vuex";
import firebase from 'firebase'
export default {
  data() {
    return {
      userName: null,
      userActive: true,
      drawer: false,
      mini: true,
      idOffice: null
    }
  },
  computed: {
    ...mapState(['itemsMenu']),
    items() {
      let menuItems =  [
        {
          title: 'Nuevo registro',
          icon: 'person_add',
          link: '/register'
        },
        {
          title: 'Iniciar sesión',
          icon: 'person',
          link: '/login'
        }
      ]
    return menuItems
    },
    userLogedIn: state => state.userActive
  },
  methods: {
    logoutFromFirebase () {
      this.$store.dispatch('signOutAction')
    },
    url(url){
      this.$router.push(`${url}/${firebase.auth().currentUser.uid}`)
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userName = firebase.auth().currentUser.displayName
        console.log('usuario está logueado')
        
        this.$router.push('/add/'+firebase.auth().currentUser.uid)
        
        this.userActive = true

        firebase.firestore()
            .collection('usersApp')
            .where('idUser', '==', this.$route.params.id)
            .get()
            .then(r => {
                r.forEach(u => {
                    this.$store.commit('setIdOffice', u.data().idOffice)
                })
            })
        
      } else {
        console.log('usuario NO está logueado.')
        this.userActive = false
        this.userName = null
        this.$router.push('/')
      }
    })
  },
}
</script>