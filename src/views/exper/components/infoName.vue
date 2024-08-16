<template>
    <div class="info-name-box">
        <div class="title-box">
            <div class="title">{{ props.name }}</div>
            <div class="content">{{ props.desc }}</div>
        </div>
        <form class="question-box" action="" @submit="formSubmit">
            <div class="text-input">
                <div class="text">您与此人属于什么关系？</div>
                <input type="text" name="relation" placeholder="请输入" v-model="info.relation.value" required />
            </div>
            <div class="text-input">
                <div class="text">上次面对面互动是什么时候？</div>
                <input type="text" name="ia_face" placeholder="请输入" v-model="info.ia_face.value" required />
            </div>
            <div class="text-input">
                <div class="text">上一次网上互动是什么时候？</div>
                <input type="text" name="ia_online" placeholder="请输入" v-model="info.ia_online.value" required />
            </div>
            <div class="radio-input">
                <div class="text">性别是？</div>
                <div class="radio" style="--size: 2">
                    <label for="gender_male"><input type="radio" id="gender_male" name="gender" value="male" @click="info.gender.value = 'male'" required />男</label>
                    <label for="gender_female"><input type="radio" id="gender_female" name="gender" value="female" @click="info.gender.value = 'female'" />女</label>
                </div>
            </div>
            <div class="text-input">
                <div class="text">年龄</div>
                <input type="number" name="age" min="1" max="99" v-model="info.age.value" required />
            </div>
            <div class="text-input">
                <div class="text">爱好</div>
                <input type="text" name="hobby" placeholder="请输入" v-model="info.hobby.value" required />
            </div>
            <div class="radio-input">
                <div class="text">好事找ta的可能性（1表示绝对不可能，5表示绝对会找）</div>
                <div class="radio" style="--size: 5">
                    <label for="good_1"><input type="radio" id="good_1" name="good" value="1" @click="info.good.value = 1" required />1</label>
                    <label for="good_2"><input type="radio" id="good_2" name="good" value="2" @click="info.good.value = 2" />2</label>
                    <label for="good_3"><input type="radio" id="good_3" name="good" value="3" @click="info.good.value = 3" />3</label>
                    <label for="good_4"><input type="radio" id="good_4" name="good" value="4" @click="info.good.value = 4" />4</label>
                    <label for="good_5"><input type="radio" id="good_5" name="good" value="5" @click="info.good.value = 5" />5</label>
                </div>
            </div>
            <div class="radio-input">
                <div class="text">坏事找ta的可能性（1表示绝对不可能，5表示绝对会找）</div>
                <div class="radio" style="--size: 5">
                    <label for="bad_1"><input type="radio" id="bad_1" name="bad" value="1" @click="info.bad.value = 1" required />1</label>
                    <label for="bad_2"><input type="radio" id="bad_2" name="bad" value="2" @click="info.bad.value = 2" />2</label>
                    <label for="bad_3"><input type="radio" id="bad_3" name="bad" value="3" @click="info.bad.value = 3" />3</label>
                    <label for="bad_4"><input type="radio" id="bad_4" name="bad" value="4" @click="info.bad.value = 4" />4</label>
                    <label for="bad_5"><input type="radio" id="bad_5" name="bad" value="5" @click="info.bad.value = 5" />5</label>
                </div>
            </div>
            <input type="submit" hidden>
        </form>
        <div class="button-box">
            <div class="submit" @click="submit">提交</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const emits = defineEmits(["endTrial"]);
const props = defineProps<{
    name: string,
    desc: string,
}>();

const info: { [key: string]: Ref<string | number> } = {
    relation: ref(""),
    ia_face: ref(""),
    ia_online: ref(""),
    gender: ref(""),
    age: ref(0),
    hobby: ref(""),
    good: ref(0),
    bad: ref(0),
};
const submit = () => { (document.querySelector("input[type=submit]") as HTMLElement).click(); };
const formSubmit = (e: Event) => {
    e.preventDefault();

    const r: { [key: string]: string | number } = {};
    Object.keys(info).forEach(k => {
        r[k] = info[k].value;
    });
    emits("endTrial", r);

    return false;
}
</script>

<style scoped>
input[type=text], input[type=number] {
    display: block;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    border: none;
    font-size: 16px;
    line-height: 36px;
    color: var(--font-color);
    background-color: var(--bg-color-input);
}

.question-box {
    display: block;
    width: 240px;
    height: 450px;
    margin: 20px auto 20px auto;
    padding: 0 10px 0 0;
    text-align: left;
    overflow: hidden auto;
}

.question-box>div {
    margin: 10px 0;
}

.question-box>div.radio-input .radio label {
    display: inline-block;
    width: calc(100% / var(--size));
    text-align: center;
    cursor: pointer;
}

.info-name-box {
    padding: 20px;
    border-radius: 10px;
    user-select: none;
    background-color: var(--dashboard-layout);
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

.button-box {
    width: 100%;
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