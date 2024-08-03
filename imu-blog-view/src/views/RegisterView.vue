<template>
    <div class="register-box box">
        <input v-model="email" class="input" placeholder="请输入邮箱">
        <input v-model="password" type="password" class="input" placeholder="请输入密码">
        <input v-model="confirmPassword" type="password" class="input" placeholder="确认密码">
        <div class="verification">
            <input v-model="verificationCode" class="input" placeholder="请输入验证码">
            <button class="btn" @click="sendVerificationCode">发送</button>
        </div>
        <button class="btn" @click="handleRegister">注册</button>
        <a class="black" href="/login">已有账号？ 前往登录</a>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import request from '@/api/BaseRequest.js';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const verificationCode = ref('');
const router = useRouter();

const sendVerificationCode = () => {
    // 模拟发送验证码
    const code = '123456'; // 固定6位数验证码
    message.success(`验证码已发送: ${code}`);
    verificationCode.value = code; // 直接设定验证码用于演示
};

const handleRegister = async () => {
    if (!email.value || !password.value || !confirmPassword.value || !verificationCode.value) {
        message.error('请填写所有字段');
        return;
    }

    if (password.value !== confirmPassword.value) {
        message.error('两次输入的密码不一致');
        return;
    }

    if (verificationCode.value !== '123456') {
        message.error('验证码错误');
        return;
    }

    try {
        const response = await request.post('/register', {
            email: email.value,
            password: password.value
        });

        if (response.success) {
            message.success('注册成功');
            router.push('/login');
        } else {
            message.error(response.message || '注册失败');
        }
    } catch (error) {
        console.error('Register error:', error);
        message.error('请求失败，请重试');
    }
};
</script>

<style scoped>
.register-box {
    width: 300px;
}

.verification {
    box-sizing: border-box;
    width: 300px;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.verification .input {
    margin-right: 0px;
}

.verification .btn {
    margin-right: 20px;
}
</style>