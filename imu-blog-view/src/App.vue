<template>
    <div>
        <!-- Main Content -->
        <main class="main-box">
            <router-view></router-view>
        </main>

        <!-- Footer -->
        <footer class="footer-box">
            &copy; 2024 IMU-Blog. All rights reserved.
        </footer>

        <!-- Settings Float Button -->
        <a-float-button @click="drawerVisible = true" style="bottom: 20px; left: 20px;">
            <template #icon>
                <SettingOutlined />
            </template>
        </a-float-button>

        <!-- Back to Home Float Button -->
        <a-float-button v-if="!isHome" @click="goHome" style="bottom: 70px; left: 20px;">
            <template #icon>
                <HomeOutlined />
            </template>
        </a-float-button>

        <!-- Back to Top Float Button -->
        <a-back-top class="back-top" />

        <a-drawer placement="bottom" :visible="drawerVisible" @close="drawerVisible = false">
            <template #title>
                <div v-html="userName"></div>
            </template>
            <div class="drawer-menue-content box">
                <button :disabled="!isLoggedIn" class="btn" @click="goTo('history')">历史记录</button>
                <button :disabled="!isLoggedIn" class="btn" @click="goTo('favorites')">我的收藏</button>
                <button :disabled="!isLoggedIn" class="btn" @click="goTo('likes')">我的点赞</button>
                <button :disabled="!isLoggedIn" class="btn" @click="goTo('comments')">我的评论</button>
                <button :disabled="!isLoggedIn" class="btn" @click="goTo('drafts')">我的草稿</button>
                <button :disabled="!isLoggedIn" class="btn" @click="goTo('articles')">我的文章</button>
            </div>
        </a-drawer>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SettingOutlined, HomeOutlined } from '@ant-design/icons-vue';

export default {
    name: 'App',
    components: {
        SettingOutlined,
        HomeOutlined
    },
    setup() {
        const drawerVisible = ref(false);
        const route = useRoute();
        const router = useRouter();

        // 模拟用户信息
        const isLoggedIn = ref(true); // 假设用户已登录，如果为false则用户未登录
        const username = ref('John Doe'); // 假设的用户名

        const isHome = computed(() => route.path === '/');

        const goHome = () => {
            router.push('/');
        };

        // 跳转到不同的页面
        const goTo = (page) => {
            const routes = {
                history: '/history',
                favorites: '/favorites',
                likes: '/likes',
                comments: '/comments',
                drafts: '/drafts',
                articles: '/articles'
            };

            if (isLoggedIn.value) {
                router.push(routes[page]);
            }
        };
        
        // 监听路由变化，自动关闭drawer
        watch(() => route.path, () => {
            drawerVisible.value = false;
        });

        const userName = computed(() => {
            return isLoggedIn.value
                ? `你好, ${username.value}`
                : '您未登录，<a href="/login" @click.prevent="goToLogin">请登录</a>';
        });

        const goToLogin = () => {
            router.push('/login');
        };

        return {
            drawerVisible,
            isHome,
            goHome,
            isLoggedIn,
            userName,
            goTo,
            goToLogin
        };
    }
}
</script>

<style>
@import 'assets/BaseStyle.css';

.main-box {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
    min-height: 97vh;
}

.footer-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.drawer-menue-content {
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 340px;
    height: 270px;
}

.drawer-menue-content .btn {
    border-radius: 20px;
    width: 140px;
    height: 60px;
}

.drawer-menue-content .btn:disabled {
    background-color: #e1e1e1;
    /* 禁用时按钮变灰 */
    color: #ffffff;
    /* 禁用时字体颜色变浅 */
    cursor: not-allowed;
    /* 鼠标悬浮时显示禁用标志 */
    box-shadow: none;
    /* 禁用时去除阴影 */
    border: 1.5px solid white;
    /* 禁用时添加浅灰色边框 */
}

.back-top {
    position: fixed;
    
    right: 20px;
    bottom: 20px;
}
</style>