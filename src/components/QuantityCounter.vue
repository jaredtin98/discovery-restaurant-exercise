<template>
  <div>
    <button v-on:click = "decrement">
        -
    </button>

    <span>
        {{updateDisplay()}}
    </span>

    <button v-on:click = "increment">
        +
    </button>
  </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                count:0
            }
        },
        methods: {
            updateDisplay: function() {
                return this.count;
            },
            increment: function() {
                if (this.count === 10) {
                    alert("You cannot buy more than 10 items.")
                } else {
                    this.count++;
                }
                this.$emit('counter', this.item, this.count)
            },
            decrement: function() {
                if (this.count > 0) {
                    this.count--;
                }
                this.$emit('counter', this.item, this.count)
            },
        }
    }
</script>

<style>

div button {
    font-size: 40px;
    width: 50px;
    border-radius: 8px;
    background-color: #FFDAB9;
}

div span {
    font-size: 40px;
}

</style>