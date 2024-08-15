<script setup lang="ts">
import { Ref, ref } from 'vue';

const emits = defineEmits(["endTrials"]);
const props = defineProps<{
    pairNames: string[][],
    leave: number
}>();

const resp: Ref<boolean[]> = ref([]);
for (let i = 0; i < props.pairNames.length; i++) {
    resp.value.push(false);
}
const changeResp = (i: number) => {
    resp.value[i] = !resp.value[i];
}
</script>

<template>
    <div class="name-know-box">
        <div class="title-box">
            <div class="desc">下面是你所认识的人，你需要判断他们之间是否彼此认识，若认识请点击中间的圆点。</div>
        </div>
        <div class="display-box">
            <div class="content-box" v-for="item, i in props.pairNames" @click="changeResp(i)">
                <div class="left">{{ item[0] }}</div>
                <div :class="{ radio: true, activate: resp[i] }"></div>
                <div class="right">{{ item[1] }}</div>
            </div>
        </div>
        <div>{{ leave }}</div>
        <div class="button-box">
            <div class="submit" @click="emits('endTrials', resp);">提交</div>
        </div>
    </div>
</template>

<style scoped>
.content-box {
    display: block;
    width: 100%;
    height: 45px;
    font-size: 24px;
    line-height: 40px;
    cursor: pointer;
    margin: 0 0 20px 0;
}
.content-box .left {
    display: inline-block;
    width: 120px;
    vertical-align: middle;
    text-align: right;
    direction: rtl;
    white-space: nowrap;
}
.content-box .right {
    display: inline-block;
    width: 120px;
    vertical-align: middle;
    text-align: left;
    direction: ltr;
    white-space: nowrap;
}
.content-box .radio {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 20px;
    vertical-align: middle;
    border: 1px solid var(--font-high-light);
    border-radius: 50%;
}
.content-box .radio.activate {
    background-color: var(--fc-warn-color);
}

.name-know-box {
    display: block;
    width: 320px;
    height: 510px;
    user-select: none;
    background-color: var(--dashboard-layout);
    padding: 20px;
    border-radius: 10px;
}
.title-box {
    width: 100%;
    height: 60px;
    text-align: left;
}
.title-box .title {
    height: 36px;
    font-size: 24px;
    line-height: 1.5em;
    color: var(--font-color);
}
.title-box .desc {
    height: 18px;
    font-size: 16px;
    line-height: 18px;
    color: var(--font-desc);
}
.display-box {
    width: 100%;
    height: 400px;
    overflow: hidden;
}
.button-box {
    width: 100%;
    height: 50px;
}
.button-box>div {
    width: 80px;
    height: 40px;
    margin: auto;
    font-size: 24px;
    line-height: 40px;
    cursor: pointer;
    color: var(--font-high-light);
    background-color: var(--menu-activate);
}
</style>