import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import loading from '../public/img/loading.gif'
import './registerServiceWorker'
import './mock/mockServer'
import './filter'
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
    loading
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')