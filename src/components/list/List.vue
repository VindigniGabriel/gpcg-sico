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
            insert_chart
          </v-icon>
        Historial de la OC
        </h3>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-lg>
          <list-table></list-table>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ListTable from './ListTable'
export default {
    components: {
        ListTable
    },
    data() {
        return {
        }
    },
}
</script>
