import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import '@config/common'

Vue.use(Router)


let home = r => require.ensure([], () => r(require('./views/home')), 'home')
let detail = r => require.ensure([], () => r(require('./views/detail')), 'detail')

const router = new Router({
    routes: [{
        path: '/home',
        component: home,
        children: []
    }, {
        path: '/detail',
        component: detail
    }, {
        path: '/',
        redirect: '/home'
    }]
})



// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})