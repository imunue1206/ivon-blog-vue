<template>
    <div class="index-box">
        <BlogCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<script setup>
import BlogCard from '../components/BlogCard.vue';
import { ref } from 'vue';

const posts = ref([
    {
        id: '987987',
        title: 'CleanCode And Effect',
        author: 'John Doe',
        authorId: 123,
        excerpt: 'The Composition API is a new feature in Vue 3 that provides an alternative approach to writing component logic...',
        favorites: 123,
        views: 4567,
        comments: 89
    },
    {
        id: '567688',
        title: '我最喜欢的设计模式',
        author: '小文文',
        authorId: 989,
        excerpt: '模版模式是一个非常实用且常用的一个设计模式，我想分享我在工作中经常用到的几个设计模式',
        favorites: 2676,
        views: 964567,
        comments: 489
    },
])

</script>

<style scoped>

.index-box {
}


</style>