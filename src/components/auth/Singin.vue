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
                  <span class="headline">Ingresar</span>
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  @click="validate"
                  outline
                  color="primary"
                  small
                >
                  Entrar
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
    passwordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'Email es requerido',
      v => /.+@.+/.test(v) || 'Email no es válido'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Contraseña es requerida'
    ]
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.loginWithFirebase()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
   loginWithFirebase () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signInAction', user)
    }
  }
}
</script>



