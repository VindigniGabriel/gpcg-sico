<template>
    <div>
        <highcharts :options="chartOptionsHistory"></highcharts>
    </div>
</template>

<script>
import firebase, { firestore } from 'firebase'
import {Chart} from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
exportingInit(Highcharts)
export default {
    components: {
        highcharts: Chart 
    },
    data() {
        return {
            chartOptionsHistory: {
                chart: {
                type: 'bar',
                style: {
                    fontFamily: 'serif'
                }
                },
                title: {
                text: 'Requerimientos Registrados Histórico',
                },
                subtitle: {
                text: 'OC Caricuao'
                },
                xAxis: {
                categories: [],
                title: {
                    text: null,
                },
                },
                yAxis: {
                min: 0,
                title: {
                    text: '',
                },
                labels: {
                    overflow: 'justify',
                },
                },
                tooltip: {
                valueSuffix: ' registro(s)',
                },
                plotOptions: {
                bar: {
                    dataLabels: {
                    enabled: true,
                    },
                },
                },
                legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 20,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                shadow: true,
                },
                credits: {
                enabled: false,
                },
                lang: {
                viewFullscreen: 'Ver pantalla grande',
                printChart: 'Imprimir Gráfico',
                downloadPNG: 'Descargar PNG imagen',
                downloadJPEG: 'Descargar JPEG imagen',
                downloadPDF: 'Descargar PDF documento',
                downloadSVG: 'Descargar SVG imagen vector',
                contextButtonTitle: 'Opciones para el gráfico'
                },
                series: [
                {
                    name: 'Requerimientos',
                    data: [0]
                },
                {
                    name: 'Procesados',
                    data: [0]
                },
                {
                    name: 'Pendientes',
                    data: [0]
                },
                ],
                responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
                }
            },
        }
    },
     computed: {
    },
    methods: {
    },
    mounted() {
    },
}
</script>
