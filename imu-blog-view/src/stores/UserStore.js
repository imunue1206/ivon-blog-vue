import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userId: null,
        userName: '',
        isAuthenticated: false,
    }),
    actions: {
        setUser(userId, userName) {
            this.userId = userId;
            this.userName = userName;
            this.isAuthenticated = true;
        },
        clearUser() {
            this.userId = null;
            this.userName = '';
            this.isAuthenticated = false;
        },
        async fetchUser() {
            // 假设从 API 或本地存储中获取用户信息
            const userData = await someApi.getUser();
            if (userData) {
                this.setUser(userData.userId, userData.userName);
            }
        },
    }
});