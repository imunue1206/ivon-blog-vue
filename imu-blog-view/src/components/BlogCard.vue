<template>
    <div class="post box" @click="goToPost">
        <!-- 第一行：标题 -->
        <div class="post-title hide">{{ post.title }}</div>

        <!-- 第二行：部分内容 -->
        <div class="post-excerpt">{{ post.excerpt }}</div>

        <!-- 第三行：作者 -->
        <div class="post-author">
            作者: <a :href="`/author/${post.authorId}`">{{ post.author }}</a>
        </div>

        <!-- 第四行：收藏、观看、评论 -->
        <div class="post-meta">
            <span> {{ post.favorites }} 收藏</span>
            <span> {{ post.views }} 观看</span>
            <span> {{ post.comments }} 评论</span>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});

const router = useRouter();

const goToPost = () => {
    router.push(`/read/${props.post.id}`);
};
</script>

<style scoped>
.post {
    width: 320px;
    height: 110px;
    /* 减少高度 */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* 减少间距 */
    padding: 5px;
    /* 减少内边距 */
    margin-bottom: 10px;
    /* 减少外边距 */
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
}

.post-title {
    width: 100%;
    height: 20px;
    /* 减少高度 */
    font-size: 16px;
    /* 减少字体大小 */
    font-weight: bold;
    color: #333;
}

.post-author {
    display: flex;
    height: 15px;
    width: 100%;
    justify-content: flex-end;
    padding-right: 5px;
    padding-left: 8px;
    /* 减少内边距 */
    font-size: 12px;
    /* 减少字体大小 */
    color: #666;
}

.post-author a {
    color: #007bff;
    text-decoration: none;
}

.post-excerpt {
    width: 100%;
    height: 40px;
    font-size: 12px;
    /* 减少字体大小 */
    color: #555;
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 限制两行显示 */
    -webkit-box-orient: vertical;
}

.post-meta {
    width: 100%;
    height: 15px;
    display: flex;
    justify-content: flex-end;
    padding-right: 5px;
    gap: 10px;
    /* 减少间距 */
    font-size: 12px;
    /* 减少字体大小 */
    color: #888;
}
</style>