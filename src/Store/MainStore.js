import store from "./index";
import conf from '../Frame/MainConf'
import {Base64} from 'js-base64'

export default {
	state: {
		currentTabIndex: conf.homeTab.menuId, // 当前显示的 tab
		homeTabMenuId: conf.homeTab.menuId,   // 主页 tab 的 menuId
		openedTabs: [                         // 当前打开的 tab 列表
			conf.homeTab
		],
	},
	getters: {
		// 获取 当前显示的 tab name
		GetCurrentTabIndex (state) {
			return state.currentTabIndex
		},
		// 获取 主页 tab 的 menuId
		GetHomeTabMenuId (state) {
			return state.homeTabMenuId
		},
		// 获取 当前打开的 tab 列表
		GetOpenedTabs (state) {
			return state.openedTabs
		},
		// 获取查询参数
		GetQuery (state) {
			let res = Object.create(null)
			state.openedTabs.map(i => {
				if (i.menuId === state.currentTabIndex) {
					res = i.query || {}
				}
			});
			return res
		},
		// 获取当前激活的 tab
		GetCurrentTab (state) {
			return state.openedTabs.find(i => i.menuId === state.currentTabIndex)
		}
	},
	mutations: {
		// 设置 hash
		SetHash (state) {
			let cur = state.openedTabs.find(i => i.menuId === state.currentTabIndex)
			location.hash =  Base64.encode(JSON.stringify(cur))
		},

		// 设置 主页 tab
		SetHomeTab (state,item) {
			state.homeTabMenuId = item.menuId;
			state.openedTabs[0] = item
		},

		// 设置 当前显示的 tab name
		SetCurrentTabIndex (state, data) {
			state.currentTabIndex = data;
			store.commit('SetHash');
		},

		// 添加 tab 到 tab 列表
		OpenedTabsPush (state, item) {
			// 设置当前要显示的 tab name
			state.currentTabIndex = item.menuId;
			// 判断 tab 项是否已存在
			let tabExsit = state.openedTabs.find(i => i.menuId === item.menuId)



			if (tabExsit && item.query){
				tabExsit.query = item.query;
			}

			if (!tabExsit) {
				state.openedTabs.push({
					title: item.title,                      // 显示标题
					menuId: item.menuId,                    // 用于标记当前打开 tab 的 name
					component: item.component,   			//  tab 对应的组件
					query: item.query,
				});

				sessionStorage.setItem("openedTabs", JSON.stringify(state.openedTabs));

			}
            store.commit('SetHash');
		},
		// 从 tab 列表 移除 tab
		OpenedTabsRemove (state, menuId) {
			for (let i = 0; i < state.openedTabs.length ; i++) {
				if(state.openedTabs[i].menuId === menuId){
					state.openedTabs.splice(i,1);
				}
			}

			if(state.currentTabIndex == menuId){
				state.currentTabIndex = state.openedTabs[state.openedTabs.length - 1].menuId;
			}

			sessionStorage.setItem("openedTabs", JSON.stringify(state.openedTabs));
			store.commit('SetHash')
		},
		// 关闭 其他的 tab
		CloseOthersTabs (state) {
			state.openedTabs = state.openedTabs.filter(item => {
				return item.menuId === state.homeTabMenuId || item.menuId === state.currentTabIndex
			});
			store.commit('SetHash')
		},

		// 关闭所有 tab
		CloseAllTabs (state) {
			state.openedTabs = [];
			state.openedTabs.push(conf.homeTab);
			state.currentTabIndex = conf.homeTab.menuId;
			store.commit('SetHash')
		},

        // 回显 tab
        reShowHash (state) {
            let url = location.href;
            let indexOfSharp = url.indexOf('#');
            if (indexOfSharp > 0) {
                let hash = url.substr(indexOfSharp + 1);
                let tab = JSON.parse(Base64.decode(hash));

				let openedTabs = sessionStorage.getItem("openedTabs");

				if (openedTabs!=null){
                	state.openedTabs = JSON.parse(openedTabs);
				}

                state.currentTabIndex = tab.menuId
            }
			store.commit('SetHash')
        },

		//跳转
		reSwitch(state,item){
			for(let i = 0 ; i < state.openedTabs.length ; i++){
				let current_page = state.openedTabs[i];
				if(current_page.menuId == item.menuId){
					let coms = current_page.components;
					if(coms == null){
						coms = new Array();
						coms.push(current_page);
					}else {
						coms = JSON.parse(coms);
						let isIn = false;
						for (let i in coms){
							if (coms[i].menuId == current_page.menuId){
								isIn = true;
							}
						}
						if (!isIn){
							coms.push(current_page);
						}
					}
					state.openedTabs[i].components = JSON.stringify(coms);
					state.openedTabs[i].component = item.component;
					if (item.title != null){
						state.openedTabs[i].title = item.title;
					}
					state.openedTabs[i].query = item.query;
				}
			}
			store.commit('SetHash')
		},

		//返回
		comeBack(state,item){
			for(let i = 0 ; i < state.openedTabs.length ; i++){
				let current_page = state.openedTabs[i];
				if(current_page.menuId == item.menuId){
					let coms = current_page.components;
					coms = JSON.parse(coms);
					let prePage = coms.pop();
					state.openedTabs[i].components = prePage.components;
					state.openedTabs[i].component = prePage.component;
					state.openedTabs[i].query = prePage.query;
					state.openedTabs[i].title = prePage.title;

				}
			}
		}
	},
	actions: {},
}
