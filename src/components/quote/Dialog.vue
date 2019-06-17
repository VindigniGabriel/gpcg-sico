<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn outline v-on="on" small color="primary">Agregar</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Agregar cita(s)</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-lg>
            <v-layout wrap>
              <v-flex xs12>
                <request-pending></request-pending>
              </v-flex>
                <!-- <v-flex xs12 md6>
                    <v-subheader>Requerimiento(s) pendientes</v-subheader>
                    <request-pending></request-pending>
                </v-flex>
                <v-flex xs12 md6>
                    <v-subheader>Asignar requerimiento(s)</v-subheader>
                    <request-assing></request-assing>
                </v-flex> -->
            </v-layout>
        </v-container>
        
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import RequestPending from './RequestPending'
import RequestAssing from './RequestAssing'
    export default {
        components:{
            RequestAssing,
            RequestPending
        },
        data () {
            return {
                dialog: false
            }
        }
    }
</script>