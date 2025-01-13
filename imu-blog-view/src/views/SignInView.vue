<template>
    <v-container class="d-flex align-center h-screen">
        <v-row>
            <v-col cols=12>
                <h1 class="text-center">IMU BLOG</h1>
            </v-col>
            <v-col :offset-md="3" :cols="12" :md="6">
                <v-card class="pa-4" title="欢迎回来！我们需要验证你的身份。" elevation="10">
                    <v-form>
                        <v-text-field label="请输入邮箱" v-model="email" class="mb-3 mt-3"></v-text-field>
                        <VCodeSender v-if="isNeedDoubleCheckWithVCode" :email="email" title="请输入登录邮箱验证码" />
                        <v-text-field v-else label="请输入密码" v-model="pwd" class="mb-3"></v-text-field>
                    </v-form>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-checkbox label="记住我" v-model="remberMe"></v-checkbox>
                        </v-col>
                        <v-col cols="8" class="d-flex justify-end">
                            <v-btn size="large" variant="tonal" @click="isNeedDoubleCheckWithVCode = !isNeedDoubleCheckWithVCode">
                                {{ isNeedDoubleCheckWithVCode ? '使用密码登录' : '使用验证码登陆' }}
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-btn text="登陆" size="large" variant="elevated" block color="green" class="mb-3" />

                    <v-btn href="/signUp" variant="text" color="green">没有账号？前往注册</v-btn>
                    <v-btn variant="text" @click="isNeedDoubleCheckWithVCode = true" color="grey">
                        忘记密码？使用验证码登陆
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import apiRequest from '@/api/BaseRequest'
import debounce from 'lodash.debounce';
import VCodeSender from '@/components/VCodeSender.vue';

const email = ref('');
const pwd = ref('');
const remberMe = ref(false);

const isNeedDoubleCheckWithVCode = ref(false);
const vcode = ref('');

</script>