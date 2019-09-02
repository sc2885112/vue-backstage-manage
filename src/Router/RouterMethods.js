import store from '@/Store/index';
import Vue from 'vue';

Vue.prototype.$tab = {
    // 设置当前显示的 tab name
    showTab(data) {
        store.commit('SetCurrentTabIndex', data)
    },
    // 打开新的 tab  项
    open(item) {
        store.commit('OpenedTabsPush', item)
    },
    // 删除 tab 项
    close(menuId) {
        store.commit('OpenedTabsRemove', menuId)
    },
    // 关闭所有 tab
    closeAll() {
        store.commit('CloseAllTabs')
    },
    // 关闭其他标签
    closeOthers() {
        store.commit('CloseOthersTabs')
    },
    // 获取当前组件的查询参数
    query() {
        return store.getters.GetQuery
    },
    // 获取当前激活的 tab
    info() {
        return store.getters.GetCurrentTab
    },
    // 根据浏览器的 url 回显 tab
    reShow() {
        store.commit('reShowHash')
    },
    //跳转
    reSwitch(item){
        store.commit('reSwitch',item)
    },
    //返回
    comeBack(item){
        store.commit('comeBack',item)
    }
};
