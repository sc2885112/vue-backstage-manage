<template>
    <el-container style="height: 100%;">
        <!--左侧 开始-->
        <transition name="left">
            <aside class="left" v-if="showMenu">
                <!--搜索和收藏 开始-->
                <header class="searchAndFavor">
                    <!--<el-input placeholder="请输入内容" size="mini" v-model="searchText">
                        <i class="el-icon-search searchiIcon" slot="suffix"></i>
                    </el-input>-->
                    <div class="myFavor">
                        <el-dropdown placement="bottom">
                            <i class="el-icon-star-on myFavorIcon"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item disabled>收藏夹</el-dropdown-item>

                                <el-dropdown-item v-for="(item,itemIndex) in config.favor" :key="itemIndex">
                                    <span @click="openTab(item)">{{item.title}}</span>
                                    <i class="el-icon-close ml10" @click="removeCollect(index)"></i>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </header>
                <!--搜索和收藏 结束-->

                <!--左侧主菜单 开始-->
                <el-menu :default-active="currentTabIndex" :default-openeds="spreadedMenus"
                         background-color="rgba(255, 208, 75, 0)"
                         text-color="#4b0404"
                         active-text-color="#409EFF">
                    <el-submenu v-for="(item,index) in menuList"
                                :key="index"
                                :index="item.menuId">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>


                        <div v-for="(subItem,subindex) in item.sub">
                            <el-submenu v-if="subItem.sub != null"
                                        :key="subindex"
                                        :index="subItem.menuId">
                                <template slot="title">
                                    <i :class="subItem.icon"></i>
                                    <span>{{subItem.title}}</span>
                                </template>

                                <el-menu-item v-for="(subItem1,subindex1) in subItem.sub"
                                              :key="subindex1"
                                              @click="openTab(subItem1)"
                                              :index="subItem1.menuId">

                                    <i :class="subItem1.icon"></i>
                                    <span>{{subItem1.title}}</span>
                                </el-menu-item>
                            </el-submenu>


                            <el-menu-item v-else
                                          :key="subindex"
                                          :index="subItem.menuId"
                                          @click="openTab(subItem)">
                                <i :class="subItem.icon"></i>
                                <span>{{subItem.title}}</span>
                            </el-menu-item>
                        </div>

                    </el-submenu>
                </el-menu>
                <!--左侧主菜单 结束-->
            </aside>
        </transition>
        <!--左侧 结束-->

        <el-container>
            <!--头部栏 开始-->
            <el-header class="topWrap">
                <!--顶部栏 左侧-->
                <div class="dsf">
                    <!--logo 开始-->
                    <div class="topLogo">
                        <img class="topLogo-img" src="@/Images/default.jpg"/>
                        <div class="menu-body"
                             @click="open_close_menu">
                            <svg t="1562993864769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1117"><path d="M110.025 252.249c0 13.741 5.456 27.374 14.899 37.112s22.663 15.364 35.987 15.364 26.544-5.626 35.987-15.364c9.441-9.738 14.899-23.371 14.899-37.112s-5.456-27.375-14.899-37.111c-9.442-9.738-22.663-15.364-35.987-15.364s-26.544 5.626-35.987 15.364c-9.338 9.736-14.899 23.37-14.899 37.111m0 0zM103.625 512.575c0 13.741 5.455 27.482 14.899 37.22 9.442 9.738 22.663 15.364 36.091 15.364 13.324 0 26.649-5.626 36.091-15.364s14.899-23.371 14.899-37.22c0-13.741-5.455-27.482-14.899-37.22-9.442-9.738-22.662-15.364-36.091-15.364-13.324 0-26.649 5.626-36.091 15.364-9.444 9.737-14.899 23.37-14.899 37.22m0 0zM103.625 774.089c0 13.741 5.455 27.482 14.899 37.22 9.442 9.738 22.663 15.364 36.091 15.364 13.324 0 26.649-5.626 36.091-15.364s14.899-23.37 14.899-37.22c0-13.741-5.455-27.482-14.899-37.22-9.442-9.737-22.662-15.364-36.091-15.364-13.324 0-26.649 5.627-36.091 15.364-9.444 9.847-14.899 23.479-14.899 37.22m0 0zM919.041 249.869c0 27.699-19.935 50.095-44.59 50.095H345.88c-24.655 0-44.59-22.397-44.59-50.095 0-27.699 19.935-50.095 44.59-50.095h528.571c24.656-0.001 44.59 22.396 44.59 50.095m0 0zM919.041 510.195c0 27.59-19.935 50.095-44.59 50.095H345.88c-24.655 0-44.59-22.398-44.59-50.096 0-27.699 19.935-50.096 44.59-50.096h528.571c24.656-0.109 44.59 22.397 44.59 50.097m0 0zM919.041 771.601c0 27.699-19.935 50.096-44.59 50.096H345.88c-24.655 0-44.59-22.397-44.59-50.096 0-27.591 19.935-49.988 44.59-49.988h528.571c24.656-0.108 44.59 22.397 44.59 49.988m0 0z" fill="#4b0404" p-id="1118"></path></svg>
                        </div>
                    </div>
                    <!--logo 结束-->
                </div>
                <div class="dsf topLogo">
                    <!--用户信息-->
                    <div class="userInfoWrap">
                        <el-dropdown placement="bottom">
                          <span class="userInfoWrap_text">
                            <img src="@/Images/default.jpg" class="avatar">
                              <span>
                                  张三丰
                              </span>
                            <i class="el-icon-arrow-down ml10"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><span>修改密码</span></el-dropdown-item>
                                <el-dropdown-item><span>基本信息</span></el-dropdown-item>
                                <el-dropdown-item><span>退出系统</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <!--顶部栏 右侧-->
            </el-header>
            <!--头部栏 结束-->


            <!--左侧 显示菜单按钮 结束-->
            <el-main>
                <!--打开的菜单(tab-bar) 开始-->
                <div class="tabWrap">
                    <div class="tabBar">
                        <el-tabs :value="currentTabIndex" @input="$tab.showTab" type="border-card"
                                 @tab-remove="$tab.close" class="elTables">

                            <el-tab-pane
                                    v-for="item in openedTabs"
                                    :key="item.menuId"
                                    :label="item.title"
                                    :name="item.menuId"
                                    :closable="item.menuId !== homeTabMenuId">
                                <el-dropdown slot="label" placement="bottom">
                                       <span>
                                          <i v-if="item.menuId === homeTabMenuId" class="el-icon-s-home"></i>
                                        <div v-else>{{item.title}}</div>
                                       </span>

                                    <el-dropdown-menu slot="dropdown"
                                                      class="elDropdownMenu"
                                                      :class="{hiddenDropDown:item.menuId !== currentTabIndex}">
                                        <el-dropdown-item class="elDropdownItem">
                                            <div class="tabDropdown">
                                                <div class="tabDropdownFavor" @click="addCollect(item)">
                                                    <i class="hx hx-hx_xshoucang"></i> 收藏
                                                </div>
                                            </div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                    <div class="content pr10">
                                        <component :is="item.component"
                                                       v-if="item.component"></component>
                                    </div>
                            </el-tab-pane>
                        </el-tabs>
                        <div class="tabOperate">
                            <el-dropdown trigger="click" placement="bottom-start">
                                <i class="el-icon-s-unfold"></i>

                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="$tab.closeAll">关闭全部</el-dropdown-item>
                                    <el-dropdown-item @click.native="$tab.closeOthers">关闭其他标签</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                </div>
                <!--打开的菜单(tab-bar) 结束-->
                <!--<Router-Views></Router-Views>-->
            </el-main>
        </el-container>
        <!--主框架 结束-->


    </el-container>
</template>
<script>
    import config from './MainConf'
    export default {
        data() {
            return {
                config: config,             // 全局配置
                showMenu: true,             // 是否显示左侧菜单
                menuList: [],               // 复制一份菜单列表
                spreadedMenus: [],          // 要展开的菜单列表
                windowInnerWidth:window.innerWidth,
            }
        },
        computed: {
            // 当前 tab 项的 name
            currentTabIndex() {
                return this.$store.getters.GetCurrentTabIndex
            },
            // 打开的页签列表
            openedTabs() {
                return this.$store.getters.GetOpenedTabs
            },
            // 主页 tab 的 menuId
            homeTabMenuId() {
                return this.$store.getters.GetHomeTabMenuId
            }
        },
        methods: {
            // 打开 页签
            openTab(item) {
                this.$tab.open(item)
            },
            initializeMemu() {
                this.menuList = config.menu;
            },
            // 监听hash的变动
            listenHistory() {
                window.addEventListener('hashchange', (e) => {
                    let url = location.href;
                    let indexOfSharp = url.indexOf('#');
                    if (indexOfSharp > 0) {
                        let hash = url.substr(indexOfSharp + 1);
                        let tab = JSON.parse(Base64.decode(hash));
                        if (tab.fromHistory) return;
                        tab.fromHistory = true;
                        this.$tab.open(tab);
                    }
                })
            },
            addCollect(item) {
                config.favor.push(item);
            },
            removeCollect(index) {
                config.favor.splice(index, 1);
            },
            open_close_menu(){
                if(this.showMenu){
                    this.showMenu = false;
                }else {
                    this.showMenu = true;
                }
            },

        },
        watch:{
            windowInnerWidth(val){
                if (val < 460){
                    this.showMenu = false;
                }
            }

        },
        created() {
            this.$tab.reShow();
            this.initializeMemu();
            //this.listenHistory();
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                return (() => {
                    that.windowInnerWidth = window.innerWidth;
                })()
            };

            if(window.innerWidth < 460){
                this.showMenu = false;
            }
        },
    }
</script>

<!--私有样式-->
<style scoped>
    .el-main::-webkit-scrollbar {
        width: 0px;
    }

    .el-main {
        margin-top: 3px;
        padding: 0 !important;
        overflow: unset !important;
    }

    /*顶部栏*/
    .topWrap {
        width: 100%;
        height: 50px !important;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        color: #4b0404;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }

    /*头部logo*/
    .topLogo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-left: 10px;
    }

    .topLogo-img {
        height: 30px;
    }

    .topLogoText {
        line-height: 30px;
        font-size: 18px;
        font-weight: bold;
        margin-left: 15px;
        color: #4b0404;
    }

    /*应用选择*/
    .appName {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 64px;
        /*background: #0680F9;*/
        background: #399CFF;
        color: #fff;
        border-right: 1px solid #53a9ff;
    }

    .appName:hover {
        background: #53a9ff;
    }

    .appNameIcon {
        font-size: 30px;
    }

    .appSelected {
        color: #fff;
        font-size: 30px;
    }

    .appItem {
        display: flex;
        align-items: center;
    }

    .appItem-icon {
        margin-right: 5px;
        font-size: 16px;
    }

    /*当前项目名称*/
    .currentProjectName {
        padding-left: 15px;
        line-height: 64px;
        font-size: 16px;
    }

    .userInfoWrap_text{
        height: 65px;
        font-weight:bold;
        color: #4b0404;
        align-items: center;
        display: flex;
    }

    .avatar {
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    /*主容器*/
    .middleWrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        position: relative;
    }

    /*主菜单*/
    .left {
        width: 200px;
        height: 100%;
        /*overflow-y: scroll;*/
        overflow-x: hidden;
        padding: 0;
        margin: 0;
        position: relative;
        box-sizing: border-box;
        flex-shrink: 0;
        -ms-overflow-style: none;
        border-right:1px solid #a5a2a259;
        background-color: #2f4156;
    }

    .left::-webkit-scrollbar {
        display: none;
    }

    /*菜单显示/隐藏 动画*/
    .left-enter-active, .left-leave-active {
        transition: width .5s;
    }

    .left-enter, .left-leave-to {
        width: 0px;
    }

    /*搜索和收藏*/
    .searchAndFavor {
        margin: 8px 0;
    }

    .searchiIcon {
        font-size: 20px;
        line-height: 28px;
    }

    .myFavor {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #2b5992;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .myFavor:hover {
        background: #3d76bc;
    }

    .myFavorIcon {
        color: #fff;
        font-size: 20px;
        line-height: 28px;
    }

    /*隐藏菜单 按钮*/
    .hideMenuButton {
        width: 12px;
        height: 50px;
        position: fixed;
        top: 50%;
        left: 187px;
        transform: translate(0, -50%);

        background: #030A13;
        border-radius: 10px 0 0 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        z-index: 99;
    }

    /*显示菜单 按钮*/
    .showMenuButton {
        width: 12px;
        height: 50px;
        position: fixed;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);

        background: #030A13;
        border-radius: 0px 10px 10px 0px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        z-index: 99;
    }

    /*显示/隐藏 按鈕 动画*/
    .hideMenu-enter-active, .hideMenu-leave-active {
        transition: all .5s;
    }

    .hideMenu-enter, .hideMenu-leave-to {
        left: -12px;
    }

    /*显示/隐藏 按鈕 动画*/
    .showMenu-enter-active, .showMenu-leave-active {
        transition: all .5s;
    }

    .showMenu-enter, .showMenu-leave-to {
        opacity: 0;
    }

    /*右侧布局*/
    .right {
        width: 100%;
        height: 100%;
        overflow: hidden;
        flex-shrink: 1;
        background: #fff;
        border-top: 1px solid #e6e6e6;
    }

    .tabWrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .tabBar {
        background: #F5F7FA;
        box-sizing: border-box;
        height: 100%;
    }

    /*以下2个样式,是覆盖 element 下拉菜单的默认样式*/
    .elDropdownMenu {
        margin-top: 0 !important;
        padding: 3px 0;
    }

    /*没有选中的 tab 标签 要隐藏下拉菜单*/
    .hiddenDropDown {
        display: none !important;
    }

    .elDropdownItem:hover {
        background-color: #fff !important;
    }

    .tabIcon {
        font-size: 20px;
        line-height: 30px;
        box-sizing: border-box;
    }

    .tabOperate {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 15px;
        top: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 3px;
        border: 1px solid #e4e7ed;
    }

    .tabDropdown {
        display: flex;
        align-items: center;
    }

    .tabDropdown i {
        font-size: 20px;
        margin-right: 5px;
    }

    .tabDropdownRefresh {
        color: #606266;
        font-size: 14px;
        padding-right: 10px;
        display: flex;
        align-items: center;
    }

    .tabDropdownRefresh:hover {
        color: #399CFF;
    }

    .tabDropdownFavor {
        color: #606266;
        font-size: 14px;
    }

    .tabDropdownFavor:hover {
        color: #399CFF;
    }

    .content {
        width: 100%;
        height: calc(100vh - 90px);
        overflow-y: scroll;
        box-sizing: border-box;
    }

    .menu-body{
        padding: 0px 5px;
        margin: 0px 0 0 10px;
    }

    .menu-body>svg{
        width: 30px;
        height: 30px;
        padding: 50% 0px;
    }

    .menu-body>svg:hover{
        background-color: #98979757;
    }

    @media only screen and (max-width: 460px) {
       .topLogo-img{
           display: none;
       }
    }


    /*下下下下下下下下下下下下下下下下下下下下下下下下下下下下下下*/

    /deep/ .el-table th.is-leaf {
        background: rgb(242, 242, 242);
        color:#333333;
        font-size:13px;
        font-weight: 700;

    }

    .cal{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .call{
        display: flex;
        flex-direction: row;
    }
    .sle{
        display: flex;
        flex-direction:row;
    }

    /deep/ .el-dialog__footer {
        border-top:1px solid #DCDFE6;
    }
    /deep/ .el-dialog {
        width:900px;
    }
    /deep/ .el-dialog__header {
        border-bottom:1px solid #DCDFE6;
    }

    /*/deep/ .el-input__inner{*/
    /*    border-top-left-radius:0;*/
    /*    border-bottom-left-radius: 0;*/
    /*}*/

    /deep/ .el-textarea__inner {
        border-top-left-radius:0;
        border-bottom-left-radius: 0;
    }
    /deep/ .page .btn-next {
        min-width: 35px !important;
        height: 35px !important;
        line-height: 35px !important;
    }
    /*分页*/

    /deep/ .page .el-pager li{
        min-width: 35px;
        height: 35px;
        line-height: 35px;
    }
    /deep/ .page .btn-prev {
        min-width: 35px !important;
        height: 35px !important;
        line-height: 35px !important;
    }

    /deep/ .page .btn-next {
        min-width: 35px !important;
        height: 35px !important;
        line-height: 35px !important;
    }
</style>
