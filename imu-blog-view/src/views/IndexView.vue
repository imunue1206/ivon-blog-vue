<template>
    <v-container class="pt-1">
        <v-row>
            <v-col vols="12" lg="8" offset-lg="2">
                <transition name="slide">
                    <v-toolbar density="compact" :elevation="6" class="rounded-lg">
                        <v-row no-gutter>
                            <!-- 筛选按钮 -->
                            <v-col cols="2" class="pr-0 d-flex justify-start pl-5">
                                <v-btn icon size="small" @click="openFilterDialog">
                                    <v-icon>mdi-filter</v-icon>
                                </v-btn>
                            </v-col>

                            <!-- 搜索框 -->
                            <v-col cols="8">
                                <v-text-field :loading="isLoading" :color="loadingColor" density="compact" hide-details
                                    single-line clearable class="bg-white"></v-text-field>
                            </v-col>

                            <!-- 搜索按钮 -->
                            <v-col cols="2" class="pl-0 d-flex justify-end pr-5">
                                <v-btn size="small" icon @click="triggerLoading">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-toolbar>
                </transition>
            </v-col>

            <!-- 筛选弹窗 -->
            <v-dialog v-model="isFilterDialogOpen" max-width="600px">
                <v-card>
                    <v-card-title>筛选条件</v-card-title>
                    <v-card-text>

                        <!-- 滑块选择时间范围 -->
                        <p>当前选择：{{ timeRangeLabels[selectedTimeRange] }}</p>
                        <v-slider v-model="selectedTimeRange" :min="0" :max="7" :step="1" ticks="always" tick-size="4"
                            :labels="timeRangeLabels" dense></v-slider>


                        <!-- 类型标签选择 -->
                        <v-select v-model="selectedTag" :items="tags" label="选择类型标签" multiple chips
                            clearable></v-select>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn text @click="closeFilterDialog">取消</v-btn>
                        <v-btn text @click="applyFilters">应用</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-row>
            <v-col cols="12" v-for="(post, index) in postList" :key="index">
                <v-card class="mx-auto" max-width="800" min-width="300">
                    <!-- 顶部：标题 -->
                    <v-card-title class="text-h6">{{post.title}}</v-card-title>

                    <!-- 顶部：标签 -->
                    <v-card-subtitle class="text-subtitle-2">
                        {{post.tags}}
                    </v-card-subtitle>

                    <!-- 中间：简介 -->
                    <v-card-text class="py-2">
                        {{post.des}}
                    </v-card-text>

                    <!-- 底部：交互按钮 -->
                    <v-card-actions>
                        <v-list-item class="w-100">
                            <template v-slot:prepend>
                                <v-avatar color="grey-darken-3"
                                    :image="post.avatar"></v-avatar>
                            </template>

                            <v-list-item-title>{{post.authorName}}</v-list-item-title>
                            <v-list-item-subtitle>{{post.authorDes}}</v-list-item-subtitle>

                            <template v-slot:append>
                                <div class="justify-self-end d-flex align-center">
                                    <!-- 点赞 -->
                                    <v-icon size="16px" class="me-1" icon="mdi-thumb-up-outline"></v-icon>
                                    <span class="text-xs me-2">{{post.like}}</span>

                                    <!-- 点踩 -->
                                    <v-icon size="16px" class="me-1" icon="mdi-thumb-down-outline"></v-icon>
                                    <span class="text-xs me-2">{{post.disLike}}</span>

                                    <!-- 收藏 -->
                                    <v-icon size="16px" class="me-1" icon="mdi-bookmark-outline"></v-icon>
                                    <span class="text-xs me-2">{{post.faourite}}</span>
                                </div>
                            </template>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import apiRequest from '@/api/BaseRequest'

// 文章内容管理-START
const postList = ref([]);
const listLoading = ref(false)
const loadMore = ref(true)

const fetchPost = async () => {
    listLoading = true;
    try {
        const postDataResponse = await apiRequest.get('/post');
        let data = postDataResponse.data;
        
        if (data.length < 15) {
            loadMore = false;
        }

        postList.push(data);

        if (postList.value.length > 75) {
            // 删除最上面的15
        }
    } finally {
        listLoading = false;
    }
}
// 文章内容管理-END


// 控制loading状态
const isLoading = ref(false);
const loadingColor = ref("");
const isFilterDialogOpen = ref(false);

// 时间范围滑块的值
const selectedTimeRange = ref(7);

// 滑块标签，对应不同的时间范围
const timeRangeLabels = [
    '三天内',
    '一周内',
    '1个月内',
    '3个月内',
    '6个月内',
    '1年内',
    '三年内',
    '所有时间'
];

// 类型标签数据
const selectedTag = ref([]);
const tags = ['MySql', '设计模式', 'Redis', '函数式编程', '方法论'];

const triggerLoading = () => {
    isLoading.value = true;
    loadingColor.value = 'green'
    setTimeout(() => {
        isLoading.value = false;
        loadingColor.value = ''
    }, 1000);
};

// 打开筛选弹窗
const openFilterDialog = () => {
    isFilterDialogOpen.value = true;
};

// 关闭筛选弹窗
const closeFilterDialog = () => {
    isFilterDialogOpen.value = false;
    selectedTimeRange.value = 7;
    selectedTag.value=[]
};

// 应用筛选条件
const applyFilters = () => {
    isFilterDialogOpen.value = false;
};
</script>

<style scoped>
</style>