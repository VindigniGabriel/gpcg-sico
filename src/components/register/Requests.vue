<template>
  <v-layout row>
    <v-flex>
      <v-subheader>
        Requerimiento(s)
        <v-spacer></v-spacer>
          <v-btn flat icon v-if="clientData.userId != ''" @click="$store.commit('changeDialogNewRequest', true)">
            <v-icon>add</v-icon>
          </v-btn>
      </v-subheader>
      <v-divider></v-divider>
      <v-list two-line>
          <template v-for="(item, index) in clientRequests">
            <v-list-tile
              :key="index"
              avatar
              ripple
              @click="viewRequest(item)"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon>phone_android</v-icon>{{ item.phone }} - {{ item.request}} - {{ item.typeLine }}
                </v-list-tile-title>
                <v-list-tile-sub-title>Creado el: {{ item.created }} por OC: {{item.ocm}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.status }}</v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        <new-request></new-request>
    </v-flex>
  </v-layout>
</template>

<script>
import NewRequest from './NewRequest'
import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      NewRequest
    },
    data () {
      return {
        
      }
    },
    computed: {
      ...mapState(['clientData', 'user', 'clientRequests'])
    },
    methods: {
      ...mapMutations(['changeAlertObservationsContent', 
      'changeAlertObservations',
      'changeDialogNewRequest']),
      viewRequest(request){
        request.observations.forEach(observation => {
            this.$alertify.alert("Observaciones de fecha: " + observation.date , observation.content+". Creado por: "+observation.author, function(){ alertify.success('Ok'); });
        })
      },
    }
  }
</script>