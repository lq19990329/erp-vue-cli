<template>
<nav class="head-nav">
   <ul class="clearFix">
        <li v-for="(item, key) in navList" :key="key" :class="{active: key == curIndex}">
            <router-link :to="item.link">
                <i class="icon" :class="'graph-' + item.iconName"></i>
                <span>{{ item.title }}</span>
            </router-link>
        </li>
    </ul> 
</nav>
</template>

<script>
export default {
    name: 'HeadNav',
    props: {
        navList: {
            type: Array,
            default: []
        },
        curIndex: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style>
.head-nav ul li {
    float: left;
}
.head-nav ul li a {
    display: block;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
.head-nav ul li a:hover,
.head-nav ul li.active a {
    background-color: #02aed9;
}
.head-nav ul li a i.icon {
    height: 16px;
    width: 16px;
    margin-top: -3px;
}
.head-nav ul li a span {
    margin-left: 6px;
    font-size: 16px;
    color: #fff;
}

/* 头部导航分类图标 */
.head-nav ul li a i.graph-home {
    background-position: 0 0;
}
.head-nav ul li a i.graph-task {
    background-position: -96px 0;
}
</style>