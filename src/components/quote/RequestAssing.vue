<template>
    <v-data-table
        :headers="headers"
        class="elevation-1"
        :items="requests"
        :pagination.sync="pagination"
    >
        <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td v-for="(aplication, i) in props.item.aplications" :key="i">
            <v-switch 
            color="success"
            v-model="requests[props.index].aplications[i]"
            >
            </v-switch>
        </td>
        <td>
            <v-switch 
            color="success"
            v-model="requests[props.index].face"
            >
            </v-switch>
        </td>
        </template>
    </v-data-table>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            pagination: { rowsPerPage: 25 },
            requests: [],
            headers: [
                {
                    text: 'Requerimientos',
                    sortable: false,
                    align: 'left',
                    value: 'name'
                },
                {
                    text: 'Pre/CDMA',
                    sortable: false,
                    align: 'left',
                    value: 'aplications'
                },
                {
                    text: 'Pre/GSM',
                    sortable: false,
                    align: 'left',
                    value: 'aplications'
                },
                {
                    text: 'Cre/CDMA',
                    sortable: false,
                    align: 'left',
                    value: 'aplications'
                },
                {
                    text: 'Cre/GSM',
                    sortable: false,
                    align: 'left',
                    value: 'aplications'
                }
            ]
        }
    }
}
</script>
