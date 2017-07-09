/**
 * Created by pomy on 09/07/2017.
 */

import './reset.less';
import 'babel-polyfill';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Setting = () => import(/* webpackChunkName: "set" */ '../general/setting/');
const AddLink = () => import(/* webpackChunkName: "add" */ '../general/add-link/');

const Outer = { template: '<router-view></router-view>' };

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Outer,
            children: [
                { path: '', component: Setting, alias: 'index' },
                { path: 'add', component: AddLink }
            ]
        }
    ]
});


new Vue({
    router,
    ...Outer
}).$mount('#wiki');