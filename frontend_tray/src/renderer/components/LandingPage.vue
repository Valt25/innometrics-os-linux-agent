<template>
    <div id="wrapper">

        <div id="info-panel">
            <div class="info">
                System is {{platform}}
            </div>
            <div class="info">
                IP address is {{ip_address}}
            </div>
            <div class="info">
                Mac address is {{mac_address}}
            </div>
            <div class="info">
                Login is {{login}}
            </div>
            <div class="info">
                User name is {{username}}
            </div>
        </div>
    </div>
</template>

<script>
    import SystemInformation from './LandingPageComponents/SystemInformation'

    const axios = require('axios');
    const os = require('os');
    const mac = require('getmac');
    const externalip = require('externalip');

    export default {
        name: 'landing-page',
        components: {SystemInformation},
        data() {
            return {
                platform: os.platform() + ' ' + os.release(),
                ip_address: 'undefined',
                mac_address: 'undefined',
                login: 'undefined',
                username: 'undefined'
            }
        },
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link)
            }
        },
        mounted() {
            mac.getMac((err, macAddress) => {
                if (err) throw err;
                this.mac_address = macAddress
            });

            externalip((err, ip) => {
                if (err) throw err;
                this.ip_address = ip;
            });

            axios.get('http://localhost:3000/global').then((res) => {
                let data = res.data;
                this.login = data.login;
                this.username = data.username;
            }).catch((err) => {
                console.log(err)
            })
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    body {
        overflow-x: hidden;
    }
</style>
