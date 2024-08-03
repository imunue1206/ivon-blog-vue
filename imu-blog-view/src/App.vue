<template>
    <div class="flex flex-col min-h-screen">

        <!-- Main Content -->
        <main class="main-box">
            <router-view></router-view>
        </main>

        <!-- Footer -->
        <footer class="footer-box">
            &copy; 2024 IMU-Blog. All rights reserved.
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
};
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
    min-height: 90vh;
}

.footer-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>