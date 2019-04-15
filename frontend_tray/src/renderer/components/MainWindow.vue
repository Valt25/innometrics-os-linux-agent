<template>
    <div id="wrapper">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <button id="btnSearch" class="btn btn-primary btn-md center-block">Send to server</button>
                    <button id="btnClear" class="btn btn-warning btn-md center-block" @click="refresh">Refresh</button>
                </div>
            </div>
        </div>

        <table v-if="activities" class="table">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Type</th>
                    <th scope="col">Data</th>
                    <th scope="col">Created at</th>

                </tr>
                </thead>
                <tbody>
                <tr v-for="activity of activities">
                    <th scope="row">{{activity.id}}</th>
                    <td>{{activity.type}}</td>
                    <td>{{activity.data}}</td>
                    <td>{{activity.createdAt}}</td>
                </tr>
                </tbody>
            </table>
    </div>
    </template>

<script>
    const axios = require('axios');

    export default {
        name: "MainWindow.vue",
        data() {
            return {
                activities: undefined
            }
        },
        mounted() {
            this.refresh()
        },
        methods: {
            refresh() {
                axios.get('http://localhost:3000/client/activities').then((res) => {
                    this.activities = res.data;
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

    #btnSearch,
    #btnClear{
        display: inline-block;
        vertical-align: top;
    }
</style>
