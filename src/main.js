import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from './utils/http'
import './utils/rem'
import * as filters from './filters/index' //过滤器
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import VueLocalStorage from 'vue-ls';
import { Toast, MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
// 无限滚动插件
Vue.use(VueScroller);
Vue.use(VueLocalStorage);
Vue.prototype.$Toast = Toast;
Vue.prototype.$MessageBox = MessageBox;

//批量注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})