<template>
  <v-container grid-list-lg>
    <v-layout 
      align-center
      row
      justify-center 
      wrap>
      <v-flex xs12>
        <h3 class="headline mb-0 font-weight-light font-italic">
          <v-icon>
            person_add
          </v-icon>
          Registro de Usuario
        </h3>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-lg>
          <v-layout 
          align-center
          column
          justify-center  
          fill-height
          wrap
          v-if="sectionSearchIdentify">
            <v-flex xs12>
              <Search/>
            </v-flex>
          </v-layout>
          <v-layout 
          align-start
          justify-center 
          row 
          fill-height 
          wrap
          v-else>
            <v-flex xs12 md4>
              <UserData/>
            </v-flex>
            <v-flex xs12 md8>
              <Requests/>
            </v-flex>
            <v-flex xs12>
              <template>
                <blockquote
                v-show="alertObservations"
                  class="blockquote"
                  v-for="(content, index) in alertObservationsContent" :key="index"
                > 
                  <v-divider></v-divider>
                    <v-layout align-center justify-space-between row>
                      <v-flex xs4>
                        <v-toolbar-title>
                          {{ content.date }}
                        </v-toolbar-title>
                      </v-flex>
                      <v-flex xs4 text-right>
                        <v-btn icon small @click="$store.commit('changeAlertObservations', false)">
                          <v-icon>close</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    <v-list two-line>
                      <v-list-tile-content>
                        <v-list-tile-title>por: {{ content.author }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary text-center">{{ content.content }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list>
                  <v-divider></v-divider>
                </blockquote>
              </template>
            </v-flex>
            <v-flex xs12 class="text-center">
              <v-btn outline small @click="check" :disabled="countRequest">
                <v-icon>check</v-icon>
                Listo
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import Search from './Search'
import Requests from './Requests'
import UserData from './UserData'
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
    }
  },
  components: {
    Search,
    Requests,
    UserData
  },
  computed: {
    ...mapState(['sectionSearchIdentify', 'alertObservations', 'alertObservationsContent', 'clientRequests']),
    countRequest: (state)=> state.clientRequests.length < 1 ? true : false
  },
  methods: {
    check(){
      this.$store.commit('changeSectionSearchIdentify', true)
    }
  },
  mounted() {
    
  },
}
</script>