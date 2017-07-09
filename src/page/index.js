/**
 * Created by pomy on 09/07/2017.
 */

import './reset.less';

import Vue from 'vue';

import Wiki from '../general/wiki/index.vue';

new Vue({
    el: '#wiki',
    render: (h) => h(Wiki)
});
