<template>
<el-container class="is-vertical my-app">
    <AppHeader style="height: 50px">
        <HeadNav slot="topnav" :navList="navList" :curIndex="curIndex"></HeadNav>
    </AppHeader>
    <el-container>
        <el-aside style="width: 200px" :class="{off: sidebarState}">
            <AppSidebar :list="sidebarList" :active="sidebarActive" :openeds="sidebarOpeneds"></AppSidebar>
            <div class="icon sidebar-ctrl-btn" :class="{off: sidebarState}" @click.stop="sidebarHandle"></div>
        </el-aside>
        <el-main :class="{on: sidebarState}">
            <transition name="router">
            <router-view class="view-wrapper" :key="key"></router-view>
            </transition>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import {getUrlHash} from 'assets/js/tools'
import {doLogin} from 'api'

import AppHeader from 'components/Header.vue'
import HeadNav from './HeadNav.vue'
import AppSidebar from 'components/Sidebar.vue'

export default {
    name: 'Layout',
    data (){
        return {
            sidebarState: false, // 侧边栏显示隐藏状态
            curIndex: 0, // 当前一级分类索引
            parentDepth: '', // 父级元素的深度
            sidebarList: [], // 侧边栏分类数组
            sidebarActive: '', // 侧边栏选中
            sidebarOpeneds: '' // 侧边栏展开
        }
    },
    computed: {
        ...mapGetters(['navList']),
        key (){
            return this.$route.name !== undefined ? this.$route.name + +new Date() : 'view-' + +new Date()
        }
    },
    watch: {
        $route (to, from){
            if (this.navList.length > 0 && to.path.split('/').length < 3){
                this.setNavInfo()
            }
        }
    },
    created(){
        this.iterFunc(this.navList, '')
        this.setNavInfo()
    },
    methods: {
        sidebarHandle (){
            this.sidebarState = !this.sidebarState
        },
        setNavInfo(){
            // 处理 hash 值
            let _hash = getUrlHash()
            // 获取一级分类索引
            this.curIndex = this.navList.findIndex(item => item.link === '/' + _hash.split('/')[1])
            if (this.curIndex === -1) return
            // 设置导航菜单信息
            this.sidebarList = _.cloneDeep(this.navList[this.curIndex].list)
            // 获取父元素的深度
            this.findParDepth(this.navList, _hash)
            // console.log(_hash, this.parentDepth)
            // 切换导航菜单选中状态
            this.sidebarActive  = _hash
            this.sidebarOpeneds = this.parentDepth
        },
        iterFunc(arr, str){
            for (let i = 0; i < arr.length; i++){
                arr[i].depth = str + i
                if (_.isArray(arr[i].list)){
                    this.iterFunc(arr[i].list, arr[i].depth + '-')
                }
            }
        },
        findParDepth(arr, str){
            for (let i = 0; i < arr.length; i++){
                if (arr[i].link === str){
                    this.parentDepth = arr[i].depth.slice(0, -2)
                } else {
                    if (_.isArray(arr[i].list)){
                        this.findParDepth(arr[i].list, str)
                    }
                }
            }
        }
    },
    components: {
        AppHeader,
        HeadNav,
        AppSidebar
    }
}
</script>

<style>
.my-app > .el-container {
    height: calc(100vh - 50px);
    position: relative;
}
.my-app .el-aside {
    background-color: #273240;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: visible;
    -webkit-transition: all .2s ease;
  transition: all .2s ease;
}
.my-app .el-aside.off {
    left: -200px;
}
.my-app .sidebar-ctrl-btn {
    height: 48px;
    width: 24px;
    position: absolute;
    top: 45%;
    right: -20px;
    background-position: 100% -116px;
    cursor: pointer;
    z-index: 10;
}
.my-app .sidebar-ctrl-btn:hover {
    background-position: right -164px;
}
.my-app .sidebar-ctrl-btn.off {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
.my-app .el-main {
    position: relative;
    background-color: #eee;
    margin-left: 200px;
    padding: 0px;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
}
.my-app .el-main.on {
    margin-left: 0;
}
.my-app .view-wrapper {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
}

/**
 * 路由组件切换动画
 */
#app .router-enter {
    opacity: 0;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
}
#app .router-enter-to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
#app .router-leave {
    opacity: 1;
}
#app .router-leave-to {
    opacity: 0;
}
#app .router-enter-to,
#app .router-leave {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
#app .router-enter-active,
#app .router-leave-active {
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
}
</style>