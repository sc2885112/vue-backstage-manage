export default {
	// 菜单列表
	menu: [
		{
			title: '主菜单1',            // 一级菜单名称
			icon: 'fa fa-grav',   		// 一级菜单 icon
			menuId: '1',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{
					title: '子菜单1-1',      // 菜单名称
					component: 'one',       // 点击菜单打开的组件名称
					menuId: '1-1' ,			// 索引 (用于识别当前打开的tab,必须唯一，是字符串)
					icon: 'fa fa-code-fork'
				},
				{title: '子菜单1-2', component: 'two', menuId: '1-2' ,icon: 'fa fa-free-code-camp'},
				{title: '子菜单1-3', component: 'hello3', menuId: '1-3' ,icon: 'fa fa-meetup'}
			]
		},
		{
			title: '主菜单2',
			icon: 'fa fa-bell-slash-o',
			menuId: '2',
			sub: [
				{title: '子菜单2-1', component: 'hello1', menuId: '2-1' , icon: 'fa fa-superpowers'},
				{title: '子菜单2-2', component: 'hello2', menuId: '2-2' , icon: 'fa fa-calendar-check-o'},
				{title: '子菜单2-3', component: 'hello3', menuId: '2-3' , icon: 'fa fa-caret-square-o-down'}
			]
		},

	],
	// 收藏列表  字段说明同 [菜单列表]
	favor: [
		// {title: '子菜单1-1', component: 'hello1', menuId: '1-1'},
	],
	// 主页 tab 配置
	homeTab: {
		title: '首页',                      //  tab 显示标题
		component: 'home',                 //  tab 对应的组件
		menuId: 'home'
	}
}
