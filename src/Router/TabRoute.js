// import Vue from "vue";

const route = Object.create(null);
route.install = function (vue) {
    // 第一个字符串是 组件名，第二个是组件路径，第三个是包名(如果不指定则已1.js,2.js....n.js命名)
    vue.component('home', (resolve) => {
        require.ensure([], () => resolve(require('@/Views/home.vue')))
    });
    vue.component('one', (resolve) => {
        require.ensure([], () => resolve(require('@/Views/one.vue')))
    });
    vue.component('two', (resolve) => {
        require.ensure([], () => resolve(require('@/Views/two.vue')))
    });
    vue.component('switchTest', (resolve) => {
        require.ensure([], () => resolve(require('@/Views/switchTest.vue')))
    });

};
export default route
