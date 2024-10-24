<template>
    <v-container>
        <v-row>
            <v-toolbar density="compact" class="rounded-lg">
                <v-row no-gutter>

                    <!-- 筛选按钮 -->
                    <v-col cols="2" class="pl-4">
                        <v-btn icon size="small" @click="openFilterDialog">
                            <v-icon>mdi-filter</v-icon>
                        </v-btn>
                    </v-col>

                    <!-- 搜索框 -->
                    <v-col cols="8">
                        <v-text-field :loading="isLoading" :color="loadingColor" density="compact" hide-details
                            single-line clearable variant="outlined" class="bg-white"></v-text-field>
                    </v-col>

                    <!-- 搜索按钮 -->
                    <v-col cols="2" class="pr-4">
                        <v-btn size="small" icon @click="triggerLoading">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-col>

                </v-row>
            </v-toolbar>

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
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

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
const tags = ['MySql', '设计模式', 'Redis', '函数式编程','方法论'];

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
};

// 应用筛选条件
const applyFilters = () => {
    console.log('选择的时间范围:', timeRangeLabels[selectedTimeRange.value]);
    closeFilterDialog();
};
</script>

<style scoped>
</style>