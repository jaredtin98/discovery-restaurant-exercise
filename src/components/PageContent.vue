<template>

    <div>

      <h1> TinTin's Best Zi Char </h1>     
      <div id = 'itemsList'>
        
        <nav>
          <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
          </ul>
        </nav>

        <ul>
          <li v-for="item in items" v-bind:key = "item.id"> 
            <span id = 'itemName'> {{item.name}} <br> </span>
            <img v-bind:src = item.imageURL>
            <p id = 'price'> ${{item.price}} </p>
            <QuantityCounter v-bind:item="item" v-on:counter="onCounter">  </QuantityCounter>
          </li>
        </ul>
      </div>

      <div id = 'shoppingBasket'>
        <Basket v-bind:itemsSelected="itemsSelected"> </Basket>
      </div>

    </div>

</template>

<script>
    import QuantityCounter from './QuantityCounter.vue'
    import Basket from './Basket.vue'
    import database from '../firebase.js'
    export default {
        components: {
            QuantityCounter,
            Basket
        },
        data() {
          return {
            itemsSelected:[],
            items:[]
          }
        },
        created() {
          this.fetchItems()
        },
        methods: {
          fetchItems: function() {
            database.collection("menu").get().then((querySnapShot) => {
              let item = {}
              querySnapShot.forEach(doc => {
                item = doc.data()
                item.show = false
                this.items.push(item)
              })
            })
          },

          onCounter: function(item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
              //If there is nothing in items selected, push the ORDER in
              console.log(item.name);
              this.itemsSelected.push([item.name, count, item.price]);
            } else {
              // Loop through everything to check what is not in the basket
              var hasBeenAdded = false;
              for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const item_name = curr_item[0];
                // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                if (item_name == item.name && count > 0) {
                  hasBeenAdded = true;
                  this.itemsSelected.splice(i,1,[item.name, count, item.price]);
                  break;
                } // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                else if (item_name == item.name && count == 0){
                  hasBeenAdded = true;
                  this.itemsSelected.splice(i,1)
                  break;
                } // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
              }
              if (!hasBeenAdded && count > 0) { 
                this.itemsSelected.push([item.name, count, item.price]);
              }             
            }
          }
        }
      }
</script>

<style scoped>
    #itemsList {
      width: 100%;
      max-width: 70%;
      margin: 0px;
      padding: 0 5px;
      box-sizing: border-box;
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
    img {
      width: 135px;
      height: 135px;
    }

    #price {
      font-size: 30px;
    }

    #itemName {
      font-size: 30px;
    }

    #shoppingBasket {
      position: absolute;
      top: 23%;
      left: 78%;
    }

    div h1 {
      text-align: center;
      color:lightcoral;
    }
</style>