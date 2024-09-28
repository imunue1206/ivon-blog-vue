<template>
    <div class="post-view center">
        <div v-if="isLoading">加载中...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <!-- 博客标题 -->
            <h1 class="post-title center">{{ post.title }}</h1>

            <!-- 作者信息 -->
            <div class="post-author center">
                作者: <a :href="`/author/${post.authorId}`">{{ post.author }}</a>
                发布于: {{ formatDate(post.date) }}
            </div>

            <!-- 博客内容 -->
            <div class="post-content box" v-html="post.content"></div>

            <!-- 元数据（收藏、观看、评论） -->
            <div class="post-meta center">
                <span> {{ post.favorites }} 收藏</span>
                <span> {{ post.views }} 观看</span>
                <span> {{ post.comments }} 评论</span>
            </div>
            <CommentsSection :id="post.id" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CommentsSection from './CommentSection.vue'; 

// 模拟单篇文章数据
const posts = [
    {
        id: '1',
        title: '文章标题1',
        author: '作者1',
        authorId: '1',
        date: '2023-01-01',
        content: '<p>这是文章1的内容</p>',
        favorites: 10,
        views: 100,
        comments: 5
    }
    // 这里假设可以有更多文章，但只提供一个用于示例
];

// 模拟数据拉取函数
const fetchPostById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const post = posts.find(p => p.id === id);
            if (post) {
                resolve(post);
            } else {
                reject('文章未找到');
            }
        }, 300); // 模拟网络延迟
    });
};

const route = useRoute();
const post = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const postId = route.params.id;
        post.value = await fetchPostById(postId);
    } catch (err) {
        error.value = err;
    } finally {
        isLoading.value = false;
    }
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.post-view {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 97vh;
    margin: 0 auto;
}

.post-title {
    height: 30px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.post-author {
    height: 20px;
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
}

.post-author a {
    color: #007bff;
    text-decoration: none;
    margin-right: 30px;
}

.post-content {
    width: 380px;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 30vh;
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
}

.post-meta {
    display: flex;
    gap: 20px;
    font-size: 14px;
    color: #888;
}
</style>