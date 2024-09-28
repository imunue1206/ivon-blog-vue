<template>
    <div class="index-box center">
        <!-- 顶部窄长按钮 -->
        <div class="top-search-button-box" @click="drawerVisible = true">
            <div class="top-search-button center">你想要搜索什么？</div>
        </div>

        <!-- 主体内容 -->
        <a-spin :spinning="loading">
            <BlogCard v-for="post in visiblePosts" :key="post.id" :post="post" />
        </a-spin>

        <!-- 查看更多按钮 -->
        <div v-if="showLoadMore" class="load-more-box">
            <a-button type="text" @click="loadMore">查看更多</a-button>
        </div>

        <!-- 顶部下拉Drawer -->
        <a-drawer placement="top" :visible="drawerVisible" @close="drawerVisible = false" :closable="false" height="90">
            <div class="center">
                <input type="text" class="input search-input" placeholder="请输入搜索内容..." />
                <button class="btn search-btn">
                    <SearchOutlined></SearchOutlined>
                </button>
            </div>
        </a-drawer>
    </div>
</template>

<script setup>
import BlogCard from '../components/BlogCard.vue';
import { ref, onMounted } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';

// 初始化和加载数量设置
const initialLoadCount = 10; // 初始化加载数量
const loadCount = 10; // 每次加载的数量
const maxRetainCount = 60; // 最大保留数量

// 数据和状态
const posts = ref([]);
const visiblePosts = ref([]);
const drawerVisible = ref(false);
const showLoadMore = ref(false);
const loading = ref(false); // 添加loading状态
let start = 0; // 用于跟踪拉取数据的起始位置

// 模拟的API请求函数
async function fetchData(start, count) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = Array.from({ length: count }, (_, index) => ({
        id: start + index,
        title: `Post Title ${start + index}`,
        author: `Author ${start + index}`,
        authorId: start + index,
        excerpt: `This is an excerpt of post ${start + index}...`,
        favorites: Math.floor(Math.random() * 1000),
        views: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 100),
    }));
    return data;
}

// 初始化数据加载
const loadInitialData = async () => {
    loading.value = true; // 开始加载
    const initialData = await fetchData(start, initialLoadCount);
    posts.value = initialData;
    visiblePosts.value = initialData;
    showLoadMore.value = initialData.length === initialLoadCount;
    start += initialLoadCount;
    loading.value = false; // 结束加载
};

// 加载更多数据
const loadMore = async () => {
    loading.value = true; // 开始加载
    const moreData = await fetchData(start, loadCount);
    posts.value = posts.value.concat(moreData);
    visiblePosts.value = posts.value;

    // 如果超过最大保留数量，从第20到第30条删除
    if (posts.value.length > maxRetainCount) {
        posts.value.splice(20, 10);
    }

    visiblePosts.value = posts.value;
    showLoadMore.value = moreData.length === loadCount;
    start += loadCount;
    loading.value = false; // 结束加载
};

// 回到顶部
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 组件挂载时加载初始数据
onMounted(() => {
    loadInitialData();
});
</script>


<style scoped>
.index-box {
    flex-direction: column;
    width: 100%;
    position: relative;
    padding-top: 30px;
}

.top-search-button-box {
    height: 30px;
    margin-left: 10%;
    width: 80%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.top-search-button {
    height: 25px;
    margin-left: 15%;
    width: 70%;
    cursor: pointer;
    font-size: 12px;
    color: grey;
    background-color: #d3d3d3;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    border-radius: 0 0 30px 30px;
    border: 0px;
}

.drawer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    height: 100%;
}

.search-input {
    width: 60%;
    height: 40px;
    margin: 0px;
    font-size: 13px;
}

.search-btn {
    width: 35px;
    height: 40px;
    margin: 0px;
    margin-left: 10px;
}

.load-more-box {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
</style>