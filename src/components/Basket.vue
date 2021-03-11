<template>
    <div>
        Menu:
        <ul>
            <li v-for="item in itemsSelected" v-bind:key="item[0]">              
                {{item[0]}} x {{item[1]}}
            </li>
        </ul>  

        <div id = 'container'>
            <Button id = "total" v-on:click = "toggle(); sendOrder()"> Add Order </Button> 
        </div> <br>

        <div v-show = "isShown">
            <div>
                Subtotal: ${{findSubtotal()}}
            </div> <br> 

            <div>
                Grand Total: ${{grandtotal}}
            </div>
        </div>
    </div>

</template>

<script>
    import database from '../firebase.js'
    export default {
        data() {
            return {
                subtotal:0,
                grandtotal:0,
                isShown: false
            }
        },
        props: {
            itemsSelected:{
                type: Array
            }
        },
        methods: {
            sendOrder: function() {
                var order = {"Prawn omelette":0, "Dry Beef Hor Fun":0, "Mapo Tofu":0, "Pork Fried Rice":0,
                "Cereal Prawn":0, "Sambal KangKung":0}

                for (var item of this.itemsSelected) {
                    order[item[0]] = item[1]
                }
                            
                database.collection("orders").add(order).then(() => location.reload())
            },
            toggle: function() {
                this.isShown = !this.isShown;
            },
            findSubtotal: function() {
                var total = 0;
                for (var item of this.itemsSelected) {
                    var amount = item[1] * item[2];
                    total += amount;
                }
                this.subtotal = total;
                return this.subtotal
            }
        },
        watch: {
            subtotal: function() {
                var totalAmount = 1.07 * this.subtotal;
                this.grandtotal = totalAmount.toFixed(2);
            }
        }
    }
</script>

<style>

div {
    font-size: 26px;
}

#total {
    font-size:32px;
    width: 250px;

}

#container {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>