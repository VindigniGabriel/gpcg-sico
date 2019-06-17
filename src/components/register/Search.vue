<template>
    <div class="justify-center">
        <form @submit.prevent="$store.dispatch('search', clientData.identify)">
            <v-select
            :items="nacionality"
            color="dark"
            v-model="selectNacionality"
            label="Seleccione nacionalidad"
            @change="changeNacionality"
            ></v-select>
            <cleave 
            :options="optionsCleaveIdentify" 
            class="form-control" 
            color="deep-orange lighten-1"
            v-model.number="clientData.identify"
            type="tel"
            >
            </cleave>
            <v-btn 
            type="submit"
            outline
            color="deep-orange lighten-1"
            block
            small
            :disabled="verifySearch"
            >
            Registrar   
            </v-btn>
        </form>
    </div>
</template>

<script>
import Cleave from 'vue-cleave-component';
import firebase from 'firebase'
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            nacionality: [
                'Venezolana',
                'Extranjero'
            ],
            selectNacionality: 'Venezolana',
        }
    },
    components: {
        Cleave
    },
    methods: {
        changeNacionality(){
            this.clientData.identify = ''
            this.options.prefix = this.selectNacionality.substr(0,1)
        },
    },
    computed: {
        ...mapState(['optionsCleaveIdentify', 'clientData']),
        verifySearch: (state) => state.clientData.identify.length > 6 ? false : true
    },
    
}
</script>