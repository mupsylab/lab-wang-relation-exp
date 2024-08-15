<template>
    <div>{{ errMsg[errCode] }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const errCode = route.params.pathMatch[0];

interface Dictionary {
    [Key: string]: string
}
const errMsg: Dictionary = {
    "400": "不支持的浏览器类型",
    "404": "未知页面"
};
</script>