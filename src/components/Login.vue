<template>
<el-row class="login-wrapper">
    <el-col :span="6" :offset="9">
        <h3 class="welcome">欢迎使用</h3>
        <el-form class="app-form" ref="form" label-position="top" :model="form" :rules="rules">
            <el-form-item label="请输入用户名" prop="username">
                <el-input v-model="username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="password">
                <el-input v-model="password" placeholder="密码" @keyup.enter.native="doLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click.stop="doLogin">登 录</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</el-row>
</template>

<script>
import { mapActions } from 'vuex';
import { doLogin } from 'api'

export default {
    name: 'Login',
    data (){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'createLoginInfo'
        ]),
        async doLogin(){
            if (this.username == '' || this.password == ''){
                return this.$message({
                    message: '请正确填写用户名和密码！',
                    type: 'warning'
                })
            }
            try {
                const response = await doLogin({
                    username: this.username,
                    password: this.password
                })
                // console.log(response.data)
                if (response.data.errCode == 1){
                    this.createLoginInfo({
                        id: '1',
                        name: 'lq',
                        type: ['admin', 'super-edit']
                    })
                    this.$router.push({ path: '/' })
                } else {
                    this.$message({
                        message: '用户名或密码有误！',
                        type: 'error'
                    })
                }
            } catch (err){
                console.error(err)
            }
        }
    }
}
</script>

<style>
.login-wrapper .welcome {
    text-align: center;
    padding: 40px 0 30px;
    font-size: 30px;
    line-height: 40px;
}
.login-wrapper .app-form {
    padding: 10px 20px 0;
    background-color: #fff;
    border: 1px solid #d8dee2;
    border-radius: 5px;
}
</style>