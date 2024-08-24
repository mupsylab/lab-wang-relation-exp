<script setup lang="ts">
import { InputHTMLAttributes } from 'vue';

const props = defineProps({
    inputType: {
        type: String,
        default: ""
    },
    showBackButton: {
        type: Boolean,
        default: false
    },
    recordInputs: {
        type: Array<String>,
        default: []
    }
});
const emits = defineEmits(["endTrial", "back"]);
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const getInputName = () => {
    const inputs = document.querySelectorAll(".input-content input");
    let repeat = false;
    const names: string[] = [];
    inputs.forEach(item => {
        const dom = (item as InputHTMLAttributes)
        if(names.indexOf(dom.value) >= 0) {
            repeat = true;
        }
        if(dom.value.length) {
            names.push(dom.value);
        }
    });
    if(repeat) {
        alert("存在重复名字，请修改");
        return [];
    }
    return names;
}

const endTrial = () => {
    const result = getInputName();
    if(result.length) {
        emits("endTrial", result);
    } else {
        alert("当前未输入任何名字，请输入");
    }
}
</script>

<template>
    <div class="input-name-box">
        <div class="title-box">
            <div class="title">{{ props.inputType }}</div>
            <div class="desc">
                <div>请您依据上方的标题，思考一下与此标题相关的人员，并在下方当中写下1~10人的姓名。</div>
                <div><strong>不同人名字不能重复</strong>，若有重复可以结尾添加数字，比如：李四1。</div>
            </div>
        </div>
        <div class="input-box">
            <div v-for="_i in arr" class="input-content">
                <input type="text" :name="_i.toString()" placeholder="输入姓名" autocomplete="off" v-if="_i < props.recordInputs.length" :value="props.recordInputs[_i]" />
                <input type="text" :name="_i.toString()" placeholder="输入姓名" autocomplete="off" v-else />
            </div>
        </div>
        <div class="button-box">
            <div @click="emits('back', getInputName())" v-if="props.showBackButton">上一步</div>
            <div @click="endTrial">下一步</div>
        </div>
    </div>
</template>

<style scoped>
.input-name-box {
    width: 280px;
    height: 470px;
    background-color: var(--dashboard-layout);
    user-select: none;
    box-sizing: content-box;
    padding: 20px;
    border-radius: 10px;
}
.title-box {
    width: 100%;
    height: 135px;
    text-align: left;
}
.input-box {
    width: 100%;
    height: 280px;
    text-align: center;
    overflow-y: hidden;
}
.button-box {
    width: 100%;
    height: 50px;
}
.button-box>div {
    display: inline-block;
    width: 80px;
    height: 50px;
    margin: 0 20px;
    font-size: 24px;
    line-height: 50px;
    cursor: pointer;
    color: var(--font-high-light);
    background-color: var(--menu-activate);
}
.input-content {
    display: inline-block;
    width: 120px;
    height: 36px;
}
.input-content:nth-child(odd) {
    margin: 0 40px 18px 0;
}
.input-content:nth-child(even) {
    margin: 0 0 18px 0;
}
.input-content input {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    border: none;
    font-size: 16px;
    line-height: 36px;
    color: var(--font-color);
    background-color: var(--bg-color-input);
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
</style>