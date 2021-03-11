<template>
    <div>
        <h1> TinTin's Best Zi Char </h1>

        <div>
            <nav>
                <ul>
                    <li> <router-link to = "/" exact> Home </router-link> </li>
                    <li> <router-link to = "/orders" exact> Orders </router-link> </li>
                    <li> <router-link to = "/dashboard" exact> Dashboard </router-link> </li>
                </ul>
            </nav>
        </div>
        
        <div>
            <ul>
                <li v-for="order in orders" v-bind:key="order[0]"> 

                    <div v-for="(count, dish) in order[1]" v-bind:key="dish">
                        <span> {{dish}}: {{count}} </span> <br>  
                    </div>

                    <button v-bind:id="order[0]" v-on:click="deleteItem($event)">
                        Delete
                    </button> &nbsp;

                    <button v-bind:id="order[0]" v-on:click="route($event)">
                        Modify
                    </button>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import database from '../firebase.js'
    export default {
        data() {
            return {
                orders:[]
            }
        },
        created() {
            this.fetchItems()
        },
        methods: {
            fetchItems: function() {
                database.collection("orders").get().then((querySnapShot) => {
                    let singleOrder = {}
                    querySnapShot.forEach(doc => {
                        singleOrder = doc.data()
                        this.orders.push([doc.id, singleOrder])
                    })
                })
            },

            deleteItem: function(event) {
                let doc_id = event.target.getAttribute("id")
                database.collection("orders").doc(doc_id).delete().then(() => location.reload())
            },

            route: function(event) {
                let doc_id = event.target.getAttribute("id")
                this.$router.push({name: 'modify', params: {id: doc_id}})
            }
        },
    }
</script>

<style scoped>
    div h1 {
      text-align: center;
      color:lightcoral;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    }
    button {
        width: 65px;
        height: 30px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
        font-size:18px;
    }
    #dish {
        list-style-type: none;
        font-size: 50px;
    }
</style>
