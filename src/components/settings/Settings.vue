<template>
  <v-container>
    <v-layout 
      align-center
      row
      justify-center 
      wrap>
      <v-flex xs12>
        <h3 class="headline mb-0 font-weight-light font-italic">
          <v-icon>
            settings
          </v-icon>
          Configuraciones
        </h3>
      </v-flex>
      <v-flex xs12>
        <v-container>
          <v-layout 
          align-center
          row
          justify-center  
          fill-height
          wrap>
            <v-flex xs12>
              <v-expansion-panel
              v-model="dir"
              expand
              block
              >
                <v-expansion-panel-content>
                  <template v-slot:header>
                      <span>
                          Direcciones Comerciales
                      </span>
                  </template>
                  <v-card>
                      <settings-directions></settings-directions>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
              v-model="ger"
              expand
              block
              >
                <v-expansion-panel-content>
                  <template v-slot:header>
                      <span>
                          Gerencias Comerciales
                      </span>
                  </template>
                  <v-card>
                      <settings-managements></settings-managements>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
              v-model="off"
              expand
              block
              >
                <v-expansion-panel-content>
                  <template v-slot:header>
                      <span>
                          Oficinas Comerciales
                      </span>
                  </template>
                  <v-card>
                      <settings-offices></settings-offices>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
              v-model="opt"
              expand
              block
              >
                <v-expansion-panel-content>
                  <template v-slot:header>
                      <span>
                          Requerimientos
                      </span>
                  </template>
                  <v-card>
                      <settings-requests></settings-requests>
                  </v-card>
                </v-expansion-panel-content>
                </v-expansion-panel>              
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SettingsRequests from './SettingsRequests'
import SettingsManagements from './SettingsManagements'
import SettingsDirections from './SettingsDirections'
import SettingsOffices from './SettingsOffices'
export default {
    data() {
        return {
            dir: ['true'],
            ger: ['true'],
            off: ['true'],
            opt: ['true']
        }
    },
    components: {
        SettingsRequests,
        SettingsManagements,
        SettingsDirections,
        SettingsOffices
    }
    
}
</script>