import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('components/Login.vue')
const Layout = () => import('components/Layout.vue')
const Home = () => import('components/Home.vue')

export const allRoutesMap = [
    {
        path: '/home',
        name: '首页',
        component: Layout,
        children: [
            {
                path: '',
                name: '首页-欢迎',
                component: Home
            },
            {
                path: 'dept',
                name: '部门管理',
                component: Home,
            },
            {
                path: 'employ',
                name: '员工管理',
                component: Home
            },
            {
                path: 'student',
                name: '在校学生',
                component: Home
            },
            {
                path: 'pool',
                name: '学员池',
                component: Home
            }
        ]
    },
    {
        path: '/tasks',
        component: Layout,
        name: '任务',
        children: [
            {
                path: '',
                name: '任务-欢迎',
                component: Home
            },
            {
                path: 'my',
                name: '我的任务',
                component: Home
            },
            {
                path: 'follow',
                name: '关注任务',
                component: Home
            },
            {
                path: 'auth',
                name: '权限设置',
                component: Home
            }
        ]
    }
]

export const constantRouterMap = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

export default new VueRouter({routes: constantRouterMap})