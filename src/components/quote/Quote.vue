<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title primary-title dark>
                        <div>
                            <h3 class="headline mb-0 font-weight-light font-italic">
                            <v-icon>
                                event
                            </v-icon>
                            Gestión de citas
                            </h3>
                        </div>
                    </v-card-title>
                    <v-container grid-list-lg>
                        <Assign/>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        {{requestsPendingFaceTrue}}
    </v-container>
</template>

<script>
import firebase from 'firebase'
import Assign from './Assign'
import { mapState } from 'vuex';
export default {
    components: {
        Assign
    },
    computed: {
        ...mapState(['requestsPendingFaceTrue'])
    },
    created() {
        this.$store.dispatch('updateRequestsFace')
    },
}
</script>
