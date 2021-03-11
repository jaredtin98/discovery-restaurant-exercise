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

        <h1> Bar Chart </h1>
        <BarChart> </BarChart>

        <h1> Line Chart </h1>
        <LineChart> </LineChart>

    </div>
</template>

<script>
    import BarChart from './charts/BarChart.vue'
    import LineChart from './charts/LineChart.vue'
    export default {
        components: {
            BarChart,
            LineChart
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

</style>