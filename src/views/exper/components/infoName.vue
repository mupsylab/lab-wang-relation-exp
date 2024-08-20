<template>
    <div class="info-name-box">
        <div class="title-box">
            <div class="title">{{ props.name }}</div>
            <div class="desc">{{ props.desc }}</div>
        </div>
        <form class="question-box" action="" @submit="formSubmit">
            <div v-for="item1, i1 in questionList" class="q-box">
                <div class="text">
                    <div class="title">{{ item1.title }}</div>
                    <div class="desc">{{ item1.desc }}</div>
                </div>
                <div class="radio" v-if="item1.type == 'radio'">
                    <label :for="`${i1}_${i2}`" v-for="item2, i2 in item1.choices">
                        <input type="radio" :name="`${i1}`" :id="`${i1}_${i2}`" :value="`${i2}`" required />
                        {{ item2 }}
                    </label>
                </div>
                <div class="number" v-if="item1.type == 'number'">
                    <input type="number" :name="`${i1}`" min="1" max="99" required />
                </div>
            </div>
            <input type="submit" hidden>
        </form>
        <div>当前还剩余: {{ props.leave }}</div>
        <div class="button-box">
            <div class="submit" @click="submit">提交</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["endTrial"]);
const props = defineProps<{
    name: string,
    desc: string,
    leave: number
}>();

const questionList = [
    { type: "radio", title: "你最近与这个人互动是什么时候？", choices: ["过去1周内", "1周前但在过去1个月内", "1个月前但在过去6个月内", "6个月前"], require: true },
    { type: "radio", title: "你们的关系是什么？", choices: ["朋友", "同学", "家人", "其他"], require: true },
    { type: "number", title: "这个人多大了？", desc: "请为每个人输入一个数字。如果您不确定，请输入您猜测的年龄。", require: true },
    { type: "radio", title: "这个人的性别是什么？", choices: ["男", "女", "其他"], require: true },
    { type: "radio", title: "这个人和你是同一种族，还是不同种族？", choices: ["相同种族", "不同种族", "不确定"], require: true },
    { type: "radio", title: "你有多喜欢这个人？", choices: ["非常不喜欢", "有点不喜欢", "一般", "有点喜欢", "非常喜欢"], require: true },
    { type: "radio", title: "当好事发生时，您去找这个人的可能性有多大？", choices: ["非常不可能", "不太可能", "中立", "可能", "非常可能"], require: true },
    { type: "radio", title: "当一些糟糕的事情发生时，您去找这个人的可能性有多大？", choices: ["非常不可能", "不太可能", "中立", "可能", "非常可能"], require: true },
];

const submit = () => { (document.querySelector("input[type=submit]") as HTMLElement).click(); };
const formSubmit = (e: Event) => {
    e.preventDefault();

    const r: { [Key: string]: string } = {};
    const doms = document.querySelectorAll("input");
    doms.forEach((dom) => {
        if (dom.type == "radio" && dom.checked) {
            r[dom.name] = dom.value;
        } else if (["number"].indexOf(dom.type) >= 0) {
            r[dom.name] = dom.value;
        }
    });
    emits("endTrial", r);

    return false;
}
</script>

<style scoped>
.question-box {
    display: block;
    width: 240px;
    height: 450px;
    margin: 20px auto 20px auto;
    padding: 0 10px 0 0;
    text-align: left;
    overflow: hidden auto;
}

.q-box {
    margin: 10px 0;
}

.q-box .text .title {
    font-size: 16px;
}

.q-box .text .desc {
    font-size: 12px;
    color: var(--font-desc);

}

.q-box .radio label {
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
}

input[type=text],
input[type=number] {
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