<template>
<el-header class="app-header clearFix">
    <div class="app-head-logo fl">
        <router-link to="/">ERP管理系统</router-link>
    </div>
    <div class="app-top-nav fl">
        <slot name="topnav"></slot>
    </div>
    <div class="user-setting fr">
        <DropdownMenu placement="right">
            <span slot="title">管理员</span>
            <div slot="list" class="user-setting-list">
                <ul>
                    <li @click.stop.native="">
                        个人设置
                    </li>
                    <li @click.stop.native="">
                        安全退出
                    </li>
                </ul>
            </div>
        </DropdownMenu>
    </div>
</el-header>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue'

export default {
    name: 'Header',
    data(){
        return {}
    },
    components: {
        DropdownMenu
    }
}
</script>

<style>
.app-header {
    height: 50px;
    line-height: 50px;
    background-color: #2dc3e8;
}
.app-head-logo {
    width: 180px;
    color: #fff;
    font-size: 16px;
}
.app-head-logo a {
    color: #fff;
}

.user-setting {
    height: 50px;
}
.user-setting-list {
    padding: 6px 0;
}
.user-setting-list ul li {
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
}
.user-setting-list ul li:hover {
    background: #2dc3e8;
    color: #fff;
}
</style>