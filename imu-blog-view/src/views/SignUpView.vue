<template>
    <v-container class="d-flex  align-center h-screen flex-wrap">
        <v-row>
            <v-col cols=12>
                <h1 class="text-center">IMU BLOG</h1>
            </v-col>
            <v-col :offset-md="2" :cols="12" :md="8">
                <v-stepper class="rounded-xl" v-model="activeStep" :items="['邮箱密码', '邮箱验证', '注册成功']" hide-actions>
                    <template v-slot:item.1>
                        <div class="py-0 px-0 text-center">
                            <v-form v-model="formValidationStatus">
                                <v-text-field label="请输入邮箱" v-model="email" clearable
                                    :rules="[rules.required, rules.email]" class="mb-3"
                                    :errorMessages="emailAvailableMsg"></v-text-field>
                                <v-text-field label="请输入密码" v-model="pwd" clearable type="password"
                                    :rules="[rules.required, rules.pwd]" class="mb-3"></v-text-field>
                                <v-text-field label="请确认密码" v-model="pwdRepeat" clearable type="password"
                                    :rules="[rules.required, rules.pwdRepeat]" class="mb-3"></v-text-field>
                            </v-form>
                            <v-btn text="前往邮箱验证" size="large" variant="elevated" block color="green"
                                :disabled="isFirstStepOk === false" :loading="firstStepBtnLoading"
                                @click="firstStepAction" />
                        </div>
                    </template>

                    <template v-slot:item.2>
                        <div class="py-0 px-0 text-center mx-auto">
                            <VCodeSender v-model="vcode" :email="email" title="请输入注册邮箱验证码"/>
                            <v-row>
                                <v-col cols="4">
                                    <v-btn text="返回上一步" class="mt-3" size="large" variant="outlined" block @click="activeStep--" />
                                </v-col>
                                <v-col cols="8">
                                    <v-btn text="验证并注册" :disabled="!(isFirstStepOk === true && vcode.length === 6)"
                                    :loading="secondStepBtnLoading" color="success" size="large" variant="elevated" block
                                    class="mt-3" @click="secondStepAction" />
                                </v-col>
                            </v-row>
                        </div>
                    </template>

                    <template v-slot:item.3>
                        <v-card flat>
                            <v-card-title class="display-1 font-weight-bold text-center primary--text">
                                欢迎来到IMU-Blog
                                <h6 class="text-green">您是第13位注册的用户</h6>
                            </v-card-title>
                            <v-card-text class="text-center">
                                <p class="subtitle-1 mb-4">
                                    开启您的个人博客之旅，记录生活，分享想法，展示自己。
                                </p>
                                <v-btn block large color="success" class="elevation-2 mt-4" @click="goToLogin">
                                    前往登录
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-stepper>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import apiRequest from '@/api/BaseRequest'
import debounce from 'lodash.debounce';
import VCodeSender from '@/components/VCodeSender.vue';

const formValidationStatus = ref(true);

// 验证规则
const rules = {
    required: v => !!v || '此字段为必填项',
    email: v => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址',
    pwd: v => v.length >= 6 || '密码最少6位',
    pwdRepeat: v => v === pwd.value || '两次输入的密码不一致'
};

const activeStep = ref(1);

const isFirstStepOk = computed(() => {
    const isValidEmail = rules.required(email.value) === true && rules.email(email.value) === true;
    const isValidPwd = rules.required(pwd.value) === true && rules.pwd(pwd.value) === true;
    const isValidPwdRepeat = rules.required(pwdRepeat.value) === true && rules.pwdRepeat(pwdRepeat.value) === true;

    return isValidEmail && isValidPwd && isValidPwdRepeat;
});

const firstStepBtnLoading = ref(false);
const firstStepAction = async () => {
    try {
        firstStepBtnLoading.value = true;

        // 验证邮箱是否已被注册过
        let isExist = false;

        if (emailAvailableMsg === '') {
            isExist = await isEmailExist();
        } else {
            isExist = await debounceCheckEmailExist();
        }

        if (!isExist) {
            activeStep.value++;
        }
    } finally {
        firstStepBtnLoading.value = false;
    }
}

const emailAvailableMsg = ref('')
const isEmailExist = async () => {
    const response = await apiRequest.get('/user/is-email-exist', {
        params: { email: email.value }
    });

    let isExist = response.data;

    if (isExist === true) {
        emailAvailableMsg.value = '该邮箱已被注册'
    }
    
    return isExist
}
const debounceCheckEmailExist = debounce(async () => {
    await isEmailExist();
}, 200);


const secondStepBtnLoading = ref(false)
const secondStepAction = () => {
    secondStepBtnLoading.value = true;
    try {
        activeStep.value++;
    } finally {
        secondStepBtnLoading.value = false;
    }
}

const email = ref('')
const pwd = ref('')
const pwdRepeat = ref('')
const vcode = ref('')

</script>
