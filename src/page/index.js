/**
 * Created by pomy on 09/07/2017.
 */

import './reset.less';

import Vue from 'vue';
import { Button, Input, Select } from 'element-ui';

// 按需引入
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);

import Wiki from '../general/wiki/index.vue';

new Vue({
    el: '#wiki',
    render: (h) => h(Wiki)
});
