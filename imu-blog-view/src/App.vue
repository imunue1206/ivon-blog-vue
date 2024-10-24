<template>
    <v-container>

        <!-- 组件路由，顶部栏都由组件内部来决定 -->
        <v-row class="mid">
            <RouterView></RouterView>
        </v-row>

        <!-- 底部菜单栏 -->
        <v-row class=bottom>

        </v-row>
    </v-container>
</template>

<script setup>

</script>

<style lang="css" scoped>

.bottom {
    background-color: yellow;
}
</style>