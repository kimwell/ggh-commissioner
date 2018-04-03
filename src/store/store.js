import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        authorization: Vue.ls.get('authorization_zy'),
        loginId: Vue.ls.get('loginId_zy'),
        user: Vue.ls.get('user_zy')
    },
    getters: {
        user: state => {
            return state.user
        }
    },
    mutations: {
        [types.LOGIN]: (state, payload) => {
            Vue.ls.set('authorization_zy', payload.authorization);
            Vue.ls.set('loginId_zy', payload.loginId);
            Vue.ls.set('user_zy', payload.user);
            state.authorization = payload.authorization;
            state.loginId = payload.loginId;
            state.user = payload.user;
        },
        [types.LOGOUT]: (state) => {
            Vue.ls.remove('authorization_zy');
            Vue.ls.remove('loginId_zy');
            Vue.ls.remove('user_zy');
            state.authorization = undefined;
            state.loginId = undefined;
            state.user = {};
        }
    }
})