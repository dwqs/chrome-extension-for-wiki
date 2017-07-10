/**
 * Created by pomy on 09/07/2017.
 */

import './index.less';

import Vue from 'vue';
import { Button, Input, Select, Option } from 'element-ui';

// 按需引入
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(Option);

window.eventBus = new Vue();
window.eventBus.$on('saveData', (token = '', repo = '') => {
    if(token) {
        window.token = token;
    }

    if(repo) {
        window.repo = repo;
    }
});

import Wiki from '../general/wiki/index.vue';

new Vue({
    el: '#wiki',
    render: (h) => h(Wiki)
});
