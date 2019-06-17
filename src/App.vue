<template>
  <v-app dark>
    <!-- display nav bar -->
    <nav-bar></nav-bar>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-text>
                <Router-view/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import NavBar from '@/views/NavBar'
  export default {
    name: 'App',
    components:{
      NavBar
    },
    data() {
      return {
        drawer: false,
        mini: true
      }
    },
    computed: {
      ...mapState(['itemsMenu'])
    },
    props: {
      source: String
    },
    methods: {
      url(url){
        this.$router.push(url)
      }
    }
  }
</script>
