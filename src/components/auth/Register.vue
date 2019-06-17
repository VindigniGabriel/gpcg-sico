<template>
  <v-container grid-list-lg>
    <v-layout align-space-between justify-center wrap row>
      <v-flex xs12 sm12 md7>
        <Welcome/>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-card>
          <v-card-title primary-title>
            <v-container>
              <v-layout>
                <v-flex>
                  <span class="headline">Nuevo Registro</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-autocomplete
              v-model="location"
              :items="dataLocationsLoad"
              label="Pertenece a"
              color="primary"
            ></v-autocomplete>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Contraseña"
              required
              :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
              :type="passwordShow ? 'text' : 'password'"
              @click:append="passwordShow = !passwordShow"
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              label="Confirme Contraseña"
              :rules="passwordRules"
              required
              :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
              :type="confirmPasswordShow ? 'text' : 'password'"
              @click:append="confirmPasswordShow = !confirmPasswordShow"
            ></v-text-field> 
              <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn
              :disabled="!valid"
              @click="validate"
              outline
              color="primary"
              small
            >
              Registrar
            </v-btn>

            <v-btn
              color="error"
              @click="reset"
              outline
              small
            >
              Limpiar
            </v-btn>
              </v-card-actions>
            </v-form> 
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import Welcome from '@/components/Welcome'
export default {
  components:{
    Welcome
  },
  data: () => ({
    name: '',
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    email: '',
    nameRules: [
      v => !!v || 'Nombre es requerido',
    ],
    emailRules: [
      v => !!v || 'E-mail es requerido',
      v => /.+@.+/.test(v) || 'E-mail no es válido'
    ],
    password: '',
    confirmPassword: '',
    passwordRules: [
      v => !!v || 'Contraseña y la confirmación de contraseña es requerido'
    ],
    location: '',
    dataLocations: []
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.registerWithFirebase()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    registerWithFirebase () {
      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
        ocm: this.location
      }
      this.$store.dispatch('signUpAction', user)
    }
  },
  computed: {
    dataLocationsLoad: state => state.dataLocations
  },
  created() {
    this.dataLocations = []
    firebase.firestore().collection('officeCommercial')
        .onSnapshot( snapshot => {
            snapshot.forEach(request => {
              this.dataLocations.push(request.data().name)
            })
        })

    firebase.firestore().collection('managementsCommercial')
        .onSnapshot( snapshot => {
            snapshot.forEach(request => {
              this.dataLocations.push(request.data().name)
            })
        })

    firebase.firestore().collection('directionsCommercial')
        .onSnapshot( snapshot => {
            snapshot.forEach(request => {
              this.dataLocations.push(request.data().name)
            })
        })
  },
   
}
</script>