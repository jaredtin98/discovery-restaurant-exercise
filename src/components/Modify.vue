<template>
    <div>
        <h1>  TinTin's Best Zi Char </h1>
        <div>
            <ul>
                <li v-for="(count, dish, index) in datapacket" v-bind:key="index">
                    <span> {{dish}}: {{count}}</span> <br> <br>
                    <input v-bind:id = index type = "number" placeholder = 0 min = "0"> <br> <br>
                </li>

                <li>
                    <button id = "update" v-on:click="updateOrder">
                        Update order
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import database from '../firebase.js'
    export default {
        props: ["id"],
        data() {
            return {
                datapacket:{}
            }
        },
        methods: {
            fetchItems: function() {
                database.collection("orders").get().then((querySnapShot) => {
                    querySnapShot.forEach(doc => {
                        if (doc.id === this.id) {
                            this.datapacket = doc.data()
                        }
                    })
                })
            },
            updateOrder: function() {
                var copy = this.datapacket
                for (var i = 0; i < 6; i++) {
                    var dish = document.getElementById(i)
                    copy[Object.keys(copy)[i]] = parseInt(dish.value)
                }                
                database.collection('orders').doc(this.id).set(copy).then(() => 
                this.$router.push({path: '/orders'}))
            }
        },
        created() {
            this.fetchItems()
        }
    }
</script>

<style>
    div h1 {
      text-align: center;
      color:lightcoral;
    }
    li {
        list-style-type: none;
    }
    input {
        width:350px;
        height: 30px;
        font-size:26px;
    }
    #update {
        width: 200px;
        height: 50px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
        font-size:26px;
    }


</style>
