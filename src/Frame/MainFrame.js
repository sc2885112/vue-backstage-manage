import  "babel-polyfill";   // 兼容IE

import Vue from 'vue';
import store from '../Store/index';
import index from './MainFrame.vue';
import ElementUI from 'element-ui';
import TabRoute from '../Router/TabRoute';
import RouterMethods from '../Router/RouterMethods';
import Util from './GlobalUtil.js';

import 'element-ui/lib/theme-chalk/index.css';
import '../Styles/btn.scss';
import '../Styles/common.css';
import '../Styles/base.css';
import '../Styles/fontAwesome/css/fontAwesome.min.css';
import '../Styles/fonts.css';


Vue.use(TabRoute);
Vue.use(ElementUI, {size: 'medium'});

new Vue({
    el: '#app',
    store,
    render: v => v(index)
});
