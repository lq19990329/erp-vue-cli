<template>
    <el-menu router class="app-sidebar-menu" 
        :default-active="active" 
        :default-openeds="[openeds]" 
        background-color="#273240" 
        text-color="#fff" 
        active-text-color="#ffd04b">
        <el-submenu v-for="(val, key) in list" :index="val.depth">
            <template slot="title">
                <i :class="'el-icon-' + val.iconName"></i>
                <span>{{ val.title }}</span>
            </template>
            <el-menu-item v-for="(item, index) in val.list" :index="item.link">
                {{ item.title }}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        list: Array,
        active: String,
        openeds: String
    },
    data(){
        return {}
    }
}
</script>

<style>
.app-sidebar-menu {
    border-right: none;
}
</style>