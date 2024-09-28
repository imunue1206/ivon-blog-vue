<template>
  <div class="comments-section">
    <div class="comments-header">
      <span class="comments-title">评论</span>
      <div class="sorting-options">
        <a @click="sortComments('hottest')" :class="{ active: currentSort === 'hottest' }">最热</a>
        <a @click="sortComments('newest')" :class="{ active: currentSort === 'newest' }">最新</a>
        <a @click="sortComments('oldest')" :class="{ active: currentSort === 'oldest' }">最早</a>
        <a @click="sortComments('mine')" :class="{ active: currentSort === 'mine' }">我的评论</a>
      </div>
    </div>

    <div class="comment-submit">
      <textarea class="text-area" rows="3" v-model="newCommentContent" placeholder="发表你的见解"
        @focus="openDrawer"></textarea>
    </div>

    <a-drawer :visible="drawerVisible" placement="bottom" height="400" @close="drawerVisible = false">
      <template #title>
        <span style="margin-left: 30px; font-size: 13px; font-weight: lighter;">不同的人，不同的视角</span>
        <a-button class="btn comment-submit-btn" @click="submitComment" style="float: right;">发布评论</a-button>
      </template>
      <textarea class="text-area" v-model="newCommentContent" rows="13" placeholder="请在此写下你的评论"></textarea>
    </a-drawer>

    <CommentItem v-for="comment in comments" :key="comment.commentId" :comment="comment"></CommentItem>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CommentItem from './CommentItem.vue';
import { Comment } from '@/services/CommentService.js'; // 假设你的Comment类在models文件夹中

const drawerVisible = ref(false);
const currentSort = ref('hottest');
const newCommentContent = ref('');
const comments = ref([]);

// Props
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

// 加载评论
const loadComments = async () => {
  const response = await Comment.getComments(props.id, 1); // 假设第一页
  comments.value = response.data.map(commentData => new Comment(commentData));
};

// 提交评论
const submitComment = async () => {
  if (newCommentContent.value.trim()) {
    await Comment.addComment(props.id, newCommentContent.value);
    newCommentContent.value = '';
    drawerVisible.value = false;
    loadComments(); // 重新加载评论
  }
};

// 排序评论
const sortComments = async (sort) => {
  currentSort.value = sort;
  // 在这里进行api调用，根据不同的排序方式获取评论
  // 例如：const response = await Comment.getCommentsSorted(props.id, sort, 1);
  // comments.value = response.data.map(commentData => new Comment(commentData));
};

// 打开评论抽屉
const openDrawer = () => {
  drawerVisible.value = true;
};

onMounted(loadComments);
</script>

<style scoped>
.comments-section {
  margin-top: 30px;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.comments-title {
  font-size: 18px;
  font-weight: bold;
}

.sorting-options a {
  font-size: 15px;
  margin-left: 14px;
  cursor: pointer;
  color: #333;
}

.sorting-options a.active {
  font-size: 16px;
  font-weight: bold;
}

.comment-submit-btn {
  width: 120px;
  height: 45px;
  font-size: 15px;
  margin: -5px;
  font-weight: bold;
}
</style>