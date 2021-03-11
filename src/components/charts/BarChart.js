import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels:[],
                datasets:[{
                    label: "Quantity",
                    backgroundColor: ['Purple', "Red", "Orange", "Blue", "Green", "Black"],
                    data: []
                }]
            },
            options: {
                legend: {display:false},
                title: {
                    display: true,
                    text: 'Total quantity of each dish ordered',
                    fontSize: 20,
                    fontColor: "Black"
                },
                scales :{
                    yAxes:[{
                        ticks: {
                            min:0,
                            stepSize:1,
                            fontSize:18,                           
                        }
                    }],
                    xAxes:[{
                        ticks:{
                            fontSize: 18,
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        fetchItems: function() {
            database.collection("orders").get().then(querySnapShot => {
                var counter = 0
                var cumulatedOrders = {}
                querySnapShot.forEach(doc => {
                    var singleOrder = doc.data()
                    if (counter == 0) {
                        cumulatedOrders = singleOrder
                        counter += 1
                    } else {
                        for (var key in singleOrder) {
                            cumulatedOrders[key] += singleOrder[key]
                        }
                    }
                })
                this.datacollection.labels = Object.keys(cumulatedOrders)
                this.datacollection.datasets[0].data = Object.values(cumulatedOrders)
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created() {
        this.fetchItems()
    }
}

