<template>
    <v-card class="pa-3 ma-3" elevation="4">
        <h5 class="text-center">{{ displayText }}</h5>
        <v-otp-input v-model="vcode" @input="updateValue($event)"></v-otp-input>
        <v-btn block :disabled="isDisabled" :loading="isSending" variant="outlined" color="green" @click="handleSend"
            class="d-flex align-center">
            <v-icon v-if="!isCountingDown">mdi-email-send</v-icon>
            <v-icon v-else>mdi-reload</v-icon>
            <span v-if="!isCountingDown">发送验证码至{{ props.email }}</span>
            <span v-else>没有收到？重新发送至{{ props.email }}</span>
        </v-btn>
    </v-card>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import debounce from 'lodash.debounce';

const props = defineProps({
    modelValue: {type: String,required: true,},
    email: { type: String, required: true }, // 邮箱地址
    title: { type: String, default: '请输入邮箱验证码' }, // 显示标题
    countdown: { type: Number, default: 60 }, // 倒计时时间
});

const emit = defineEmits(['update:modelValue']);

const isSending = ref(false);
const isCountingDown = ref(false);
const countdownTime = ref(props.countdown);
const vcode = ref('');
const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email));

// 当本地值变化时触发事件，通知父组件
function updateValue(newValue) {
    emit('update:modelValue', vcode.value); // 通知父组件
}

const displayText = computed(() =>
    !isValidEmail.value
        ? '无法读取正确的邮箱'
        : isCountingDown.value
            ? `已发送至 ${props.email}，有效期为5分钟`
            : props.title
);

const handleSend = async () => {
    if (!isValidEmail.value || isSending.value) return;

    isSending.value = true;
    try {
        // 模拟发送验证码请求
        await debounceSendVcode();

        isCountingDown.value = true;
        startCountdown();
    } finally {
        isSending.value = false;
    }
};

const startCountdown = () => {
    const timer = setInterval(() => {
        countdownTime.value--;
        if (countdownTime.value <= 0) {
            clearInterval(timer);
            isCountingDown.value = false;
            countdownTime.value = props.countdown;
        }
    }, 1000);
};

const debounceSendVcode = debounce(async () => {
    console.log('发送验证码至:', props.email); // 替换为实际的 API 请求
    const generatedCode = Math.floor(100000 + Math.random() * 900000); // 生成六位验证码
}, 100);

const isDisabled = computed(
    () => !isValidEmail.value || isSending.value || isCountingDown.value
);
</script>