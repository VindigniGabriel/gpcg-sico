<template>
    <div>
        <v-card>
            <v-card-title>
                Listado de Usuarios registrados
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Filtrar"
                    single-line
                    hide-details
                    color="primary"
                ></v-text-field>
            </v-card-title>
            <v-card-title>
            <span class="font-weight-thin font-italic">Click en el registro para visualizar memo(s)</span>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="requests"
            :search="search"
            :pagination.sync="pagination"
            >
                <template 
                    v-slot:items="props" 
                >
                <tr @click="viewRequest(props.item)">
                    <td>{{ props.item.created }} {{dateRelative(props.item.created)}}</td>
                    <td>{{ props.item.status }}</td>
                    <td>{{ props.item.identify }}</td>
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.request }}</td>
                    <td class="text-xs-left">{{ props.item.phone }}</td>
                    <td class="text-xs-left">{{ props.item.typeLine }}</td>
                    <td class="text-xs-left">{{dateRelative(props.item.update)}}</td>
                </tr>
                </template>
                <template v-slot:no-results>
                    Sin resultados para "{{ search }}".
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import moment from 'moment'
import firebase from 'firebase'
import { mapState } from 'vuex'
moment.locale('es')
export default {
    data() {
        return {
            search: '',
            pagination: { rowsPerPage: 25 },
            requests: [],
            headers: [
                {
                text: 'Fecha de Creación',
                align: 'left',
                value: 'created',
                view: true
                },
                { text: 'Estatus', value: 'status', view: true, sortable: false },
                { text: 'Cédula', value: 'identify', view: true },
                { text: 'Usuario', value: 'name', view: true },
                { text: 'Requerimiento(s)', value: 'request', view: true },
                { text: 'Línea', value: 'phone', view: true, sortable: false },
                { text: 'Tec.', value: 'typeLine', view: true, sortable: false },
                { text: 'Ult. Actualización', value: 'update', view: true, sortable: false }
            ],
        }
    },
    methods: {
        dateRelative(fecha){
            return moment(fecha).fromNow()
        },
        viewRequest(request){
            request.observations.forEach(observation => {
                this.$alertify.alert("Observaciones de fecha: " + observation.date , observation.content+". Creado por: "+observation.author, function(){ alertify.success('Ok'); });
            })
        },
        loadRequests(idOffice){
            this.requests = []
            firebase.firestore()
                .collection('usersRequests')
                .where('idOffice', '==', idOffice)
                .get()
                .then(requests => {
                    requests.forEach(request => {
                        firebase.firestore()
                            .collection('usersRegisters')
                            .where('userId', '==', request.data().userId)
                            .get()
                            .then(dataClient => { 
                                dataClient.forEach(client => {
                                    let object = {}
                                    object = Object.assign({}, request.data())
                                    object = Object.assign(object, {
                                        name : client.data().name,
                                        identify : client.data().identify
                                    })
                                    this.requests.push(object)
                                })
                            })
                    })
                })
        }
    },
    computed: {
        historyOcm: state => state.requests
    },
    mounted() {
        this.requests = []
        firebase.firestore()
            .collection('usersApp')
            .where('idUser', '==', this.$route.params.id)
            .get()
            .then(r => {
                r.forEach(u => {
                    this.loadRequests(u.data().idOffice)
                })
            })
    },
}
</script>
