<template>
    <div class="post box" @click="goToPost">
        <!-- 第一行：标题 -->
        <div class="post-title hide">{{ post.title }}</div>
        <!-- 第二行：作者 -->
        <div class="post-author">
            作者: <a :href="`/author/${post.authorId}`">{{ post.author }}</a>
        </div>
        <!-- 第三行：部分内容 -->
        <div class="post-excerpt">{{ post.excerpt }}</div>
        <!-- 第四行：收藏、观看、评论 -->
        <div class="post-meta">
            <span class="meta-item">
                <a-icon type="heart" /> {{ post.favorites }} 收藏
            </span>
            <span class="meta-item">
                <a-icon type="eye" /> {{ post.views }} 观看
            </span>
            <span class="meta-item">
                <a-icon type="message" /> {{ post.comments }} 评论
            </span>
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
    router.push(`/post/${props.post.id}`);
};
</script>

<style scoped>
.post {
    width: 300px;
    height: 150px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
}

.post-title {
    width: 100%;
    height: 25px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.post-author {
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    color: #666;
}

.post-author a {
    color: #007bff;
    text-decoration: none;
}

.post-excerpt {
    font-size: 14px;
    color: #555;
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 限制两行显示 */
    -webkit-box-orient: vertical;
}

.post-meta {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    font-size: 14px;
    color: #888;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>