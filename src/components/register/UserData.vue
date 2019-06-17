<template>
    <v-layout>
        <v-flex>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
            <v-subheader
            >
                Información del usuario
                <v-spacer></v-spacer>
                <v-btn flat icon @click="editUserData" v-if="edit">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn 
                    flat 
                    icon 
                    @click="saveUserData" 
                    v-else
                    :disabled="!valid || validIdentify"
                >
                    <v-icon>save</v-icon>
                </v-btn>
            </v-subheader>
            <v-divider></v-divider>
                
                <p v-if="edit">Nombre: {{clientData.name}}</p>
                <v-text-field
                    v-else
                    :rules="nameRules"
                    label="Nombre"
                    color="deep-orange lighten-1"
                    :value="clientData.name"
                    required
                    v-model="clientData.name"
                ></v-text-field>  
                <p v-if="edit">Cédula: {{clientData.identify}}</p>
                <cleave
                    v-else
                    required
                    :options="optionsCleaveIdentify" 
                    class="form-control" 
                    color="deep-orange lighten-1"
                    type="tel"
                    :value="clientData.identify"
                    :rules="identifyRules"
                    v-model="clientData.identify"
                    >
                </cleave>
                <p v-if="edit">Contacto 1: {{clientData.contact1}}</p>
                <v-text-field
                    v-else
                    required
                    v-model="clientData.contact1"
                    label="Tél. Contacto 1"
                    persistent-hint
                    :mask="mask"
                    single-line
                    color="dark"
                    type="tel"
                    :rules="contactRules"
                ></v-text-field> 
                <p v-if="edit">Contacto 2: {{clientData.contact2}}</p>
                <v-text-field
                    v-else
                    v-model="clientData.contact2"
                    label="Tél. Contacto 2"
                    persistent-hint
                    single-line
                    :mask="mask"
                    color="dark"
                    type="tel"
                ></v-text-field>                 
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
import firebase from 'firebase'
import Cleave from 'vue-cleave-component';
import { mapState, mapMutations } from 'vuex';
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            mask: 'phone',
            valid: false,
            edit: true,
            nameRules: [
                v => !!v || 'Nombre requerido',
            ],
            identifyRules: [
                v => v.length = 6 || 'Cédula requerido',
            ],
            contactRules: [
                v => v.length === 10 || 'Tél. contacto requerido'
            ]
        }
    },
    computed: {
        ...mapState(['clientData', 'optionsCleaveIdentify']),
        validIdentify: state => state.clientData.identify.length < 7 ? true : false
    },
    methods: {
        ...mapMutations(['keyUserData']),
        editUserData(){
            this.edit = false
        },
        saveUserData(){
            if(this.clientData.userId === ''){

                this.$store.dispatch('addClientData')

                this.$alertify.success("Usuario agregado con éxito.")

                setTimeout(() => {
                    this.$alertify.warning("Ya puede agregar uno o más requerimiento(s).")
                }, 3000)
            }else{

                this.$store.dispatch('updateClientData')

                this.$alertify.success("Infomación del usuario actualizado con éxito.")

            }
            this.edit = true
        }
    },
    components: {
        Cleave
    },
}
</script>
