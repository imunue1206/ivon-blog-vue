<template>
    <div class="login-box box">
        <input v-model="email" class="input" placeholder="请输入邮箱">
        <input v-model="password" type="password" class="input" placeholder="请输入密码">
        <button class="btn" @click="handleLogin">登陆</button>
        <a class="black" href="/register">没有账号？ 前往注册</a>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue'
import request from '@/api/BaseRequest.js'

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    if (!email.value || !password.value) {
        message.error('请输入邮箱和密码');
        return;
    }

    try {
        const response = request.post('/login', {
            email: email.value,
            password: password.value
        });

        if (response.success) {
            message.success('登录成功');
            router.push('/');
        } else {
            message.error(response.message || '登录失败');
        }
    } catch (error) {
        console.error('Login error:', error);
        message.error('请求失败，请重试');
    }
};
</script>

<style scoped>

.login-box {
    width: 300px;
}
</style>