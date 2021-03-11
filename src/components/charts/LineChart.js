import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels:[],
                datasets:[{
                    data:[],
                    label:'',
                    fill: false,
                    borderColor: "#3e95cd"
                }, {
                    data:[],
                    label:'',
                    fill: false,
                    borderColor: "#8e5ea2"
                }, {
                    data:[],
                    label:'',
                    fill:false,
                    borderColor: "#3cba9f"
                }, {
                    data:[],
                    label:'',
                    fill:false,
                    borderColor: "Orange"
                }, {
                    data:[],
                    label:'',
                    fill:false,
                    borderColor: "#c45850"
                }, {
                    data:[],
                    label:'',
                    fill:false,
                    borderColor: "Black"
                }]
            },

            options:{
                legend: {display: true},
                title: {
                    display: true,
                    text:'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

    methods: {
        fetchItems: function() {
            axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
            .then(response => {
                
                for (var i = 0; i < response.data.region_metadata.length; i++) {
                    this.datacollection.datasets[i].label = response.data.region_metadata[i].name 
                }

                for (var item of response.data.items) {
                    this.datacollection.labels.push(item.timestamp)
                    var psi = item.readings.psi_twenty_four_hourly
                    for (var j = 0; j < this.datacollection.datasets.length; j++) {
                        var values = Object.values(psi)
                        this.datacollection.datasets[j].data.push(values[j])
                    } 
                } 
                this.renderChart(this.datacollection, this.options)
            })
        }
    },

    created() {
        this.fetchItems()
    }

}
