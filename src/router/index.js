import Vue from 'vue';
import Router from 'vue-router';
import { routerMode } from '@/utils/evn'
import store from '@/store/store'
import * as types from '@/store/types'
import { MessageBox } from 'mint-ui'
Vue.use(Router);
// 页面刷新时，重新赋值token
if (Vue.ls.get('authorization_zy')) {
    store.commit(types.LOGIN, {
        authorization: Vue.ls.get('authorization_zy'),
        loginId: Vue.ls.get('loginId_zy'),
        user: Vue.ls.get('user_zy')
    })
}
const router = new Router({
    mode: routerMode,
    base: '/zy/',
    redirect: '/businessList',
    routes: [{
            path: '/businessList',
            component: resolve => require(['@/views/businessList/index.vue'], resolve),
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/businessDetial-:id',
            component: resolve => require(['@/views/businessDetial/index.vue'], resolve),
            name: 'businessDetial'
        },
        {
            path: '/buys',
            component: resolve => require(['@/views/buys/index.vue'], resolve),
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/buysDetail-:ironBuyId',
            name: 'buysDetail',
            component: resolve => require(['@/views/buysDetail/index.vue'], resolve)
        },
        {
            path: '/user',
            name: 'user',
            component: resolve => require(['@/views/user/index.vue'], resolve)
        },
        {
            path: '/help',
            name: 'help',
            component: resolve => require(['@/views/publish/index.vue'], resolve)
        },
        {
            path: '/pbs:id',
            name: 'pbs',
            component: resolve => require(['@/views/publish/pbs.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/views/login/index.vue'], resolve),
            meta: {
                requireAuth: true
            }
        },
        {
            path: '*',
            name: 'notFound',
            component: resolve => require(['@/views/main.vue'], resolve)
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        next();
    } else {
        if (store.state.authorization) {
            next();
        } else {
            MessageBox.alert('请登录!').then(action => {
                next({
                    path: '/login'
                })
            });
        }
    }
})

export default router;