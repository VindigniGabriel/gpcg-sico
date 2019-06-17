<template>
    <v-layout align-start justify-center row wrap>
        <v-flex xs12 md4 class="text-center">
            <v-date-picker 
            v-model="date" 
            :reactive="true"
            locale="es"
            color="primary"
            ></v-date-picker>
        </v-flex>
        <v-flex xs12 md8>
            <v-layout row justify-space-between align-center wrap>
                <v-flex xs6>
                    <span>
                        Requerimientos asignados para el {{dateFormat}}
                    </span>
                </v-flex>
                <v-flex xs6 class="text-right">
                    <Dialog/>
                </v-flex>
            </v-layout>                                 
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
        </v-flex>
    </v-layout>
</template>

<script>
import moment from 'moment'
import Dialog from './Dialog'
export default {
    components:{
        Dialog
    },
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
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
                { text: 'Requerimiento(s)', value: 'request', view: true },
                { text: 'Línea', value: 'phone', view: true, sortable: false },
                { text: 'Tec.', value: 'typeLine', view: true, sortable: false },
            ],
        }
    },
    computed: {
        dateFormat: state => moment(state.date).format('DD/MM/YY')
    },
}
</script>
