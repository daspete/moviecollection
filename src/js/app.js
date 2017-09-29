import Vue from 'vue'
import VueStash from 'vue-stash'

Vue.use(VueStash)

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import App from './App.vue'

let app = new Vue({
    el: '#app',
    template: `<app></app>`,
    components: { App },
    data(){
        return {
            store: {
                config: {
                    urls: {
                        api: 'http://192.168.0.36:3000/api/'
                    }
                }
                
            }
        }
    }
});