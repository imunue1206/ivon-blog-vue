<template>
    <v-container>

        <!-- 组件路由，顶部栏都由组件内部来决定 -->
        <v-row>
            <RouterView></RouterView>
        </v-row>

        <!-- 底部菜单栏 -->
        <v-row>
        </v-row>

        <!-- 错误信息 Snackbar -->
        <v-snackbar v-model="errorBar.visible" :timeout="errorBar.timeout" color="red" multi-line location="center">
            {{ errorBar.message }}

            <template v-slot:actions>
                <v-btn @click="errorBar.visible = false">
                    关闭
                </v-btn>
            </template>
        </v-snackbar>

        <!-- 错误遮罩层 -->
        <v-overlay v-model="errorBar.visible" opacity="0.5" :z-index="999">
        </v-overlay>

    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const errorBar = ref({
    visible: false,
    timeout: 2000,
    message: ''
});

// 控制全局加载状态
const loading = ref(false);

const showerrorBar = (message) => {
    errorBar.value.message = message;
    errorBar.value.visible = true;
};

onMounted(() => {
    // 监听全局的错误处理事件
    window.addEventListener('axiosGlobalErrorHandle', (event) => showerrorBar(event.detail));
});
</script>

<style scoped>
/* v-overlay 样式，保证全屏覆盖 */
.v-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>