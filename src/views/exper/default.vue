<template>
    <div id="exp"></div>
</template>

<script setup lang="ts">
import { onMounted, render, h } from 'vue';
import { initJsPsych } from 'jspsych';

import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import jsPsychCallFunction from "@jspsych/plugin-call-function";

import endExp from "./endExp.vue";
const jsPsych = initJsPsych({
    display_element: "exp",
    on_finish() {
        const dom = document.querySelector("#exp") as Element;
        dom.innerHTML = "";
        render(h(endExp), dom);
        jsPsych.data.get().filter({ save: true }).localSave("csv", `${new Date().getTime()}.csv`);
    }
});

const timeline: object[] = [];
import insturctionAll from "./components/insturctionAll.vue";
timeline.push({
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "<div id='box'></div>",
    choices: ["NO_KEYS"],
    on_load() {
        render(h(insturctionAll, {
            onEndTrials() {
                jsPsych.finishTrial();
            }
        }), document.querySelector("#box") as Element);
    }
});

// 获取名字
// 不同名字之间进行匹配，看看哪些是认识的
import inputName from "./components/inputName.vue";

const parseNamesFromResp = () => {
    const data = jsPsych.data.get().filter({ save: true }).values();

    const names: Set<string> = new Set();
    data.forEach(element => {
        const { name_resp } = element;
        name_resp.forEach((v: string) => {
            names.add(v);
        });
    });
    return Array.from(names);
};
let names: string[] = [];
timeline.push({
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        choices: ["NO_KEYS"],
        stimulus: '<div id="box"></div>',
        on_load() {
            const inputType: string = jsPsych.timelineVariable("inputTitle", true);
            render(h(inputName, {
                inputType: inputType,
                onEndTrial(result: string[]) {
                    jsPsych.finishTrial({
                        name_resp: result,
                        name_type: inputType
                    })
                }
            }), document.querySelector("#box") as Element)
        },
        on_finish(data: any) {
            const { name_resp, name_type } = data;
            jsPsych.data.write(Object.assign({}, {
                save: true, exper_type: "getName",
                name_type, name_resp
            }));
        }
    }],
    timeline_variables: [
        { inputTitle: "家人" },
        { inputTitle: "好朋友" },
        { inputTitle: "使用手机通话交流" },
        { inputTitle: "使用手机打字交流" },
        { inputTitle: "过去一周面对面交流" },
        { inputTitle: "过去一周用社交媒体互动" },
    ]
}, {
    type: jsPsychCallFunction,
    func() {
        names = parseNamesFromResp();
    }
});

// 判断哪些人是认识的
import nameKnow from "./components/nameKnow.vue";
let name_index: Array<number[]> = [];
const getNamesFromIndex = (num: number) => {
    const result = [];
    if(num > name_index.length) num = name_index.length;
    for (let i = 0; i < num; i++) {
        const random_index = Math.floor(Math.random() * name_index.length);
        const [i1, i2] = name_index.splice(random_index, 1)[0];
        result.push([names[i1], names[i2]]);
    }
    return result;
};
timeline.push({
    type: jsPsychCallFunction,
    func() {
        const len = names.length;
        if(len < 5) {
            alert("填写人数小于5，无法完成实验~");
            location.reload();
        }
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < i; j++) {
                name_index.push([i, j]);
            }
        }
    }
}, {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div id="box"></div>',
        choices: ["NO_KEYS"],
        on_load() {
            const pair_names = getNamesFromIndex(6);
            render(h(nameKnow, {
                pairNames: pair_names,
                leave: name_index.length,
                onEndTrials(resp) {
                    jsPsych.finishTrial({
                        pair_resp: Array.from(resp),
                        pair_names: pair_names
                    });
                }
            }), document.querySelector("#box") as Element);
        },
        on_finish(data: any) {
            const { pair_names, pair_resp } = data;
            jsPsych.data.write(Object.assign({}, {
                save: true, exper_type: "pairName",
                pair_names, pair_resp
            }));
        }
    }],
    loop_function() {
        return name_index.length > 0;
    }
});

// 你们什么关系、上次面对面互动是什么时候、上一次网上互动是什么时候、
// 性别、年龄、种族、喜欢、好事、坏事找ta的可能性、是否共同生活

// 给人填写个人信息
import infoName from "./components/infoName.vue";
let progress_index = 0;
timeline.push({
    type: jsPsychCallFunction,
    func() {
        progress_index = 0
    }
}, {
    timeline: [{
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div id="box"></div>',
        choices: ["NO_KEYS"],
        on_load() {
            render(h(infoName, {
                name: names[progress_index],
                desc: "下面需要您回答与此人相关的一些问题",
                leave: names.length - progress_index,
                onEndTrial(d) {
                    jsPsych.finishTrial(Object.assign({}, {
                        save: true,
                        exper_type: "infoName",
                        name: names[progress_index]
                    }, d));
                }
            }), document.querySelector("#box") as Element);
        },
        on_finish() {
            progress_index += 1;
        }
    }],
    loop_function() {
        return progress_index < names.length
    }
});

onMounted(() => {
    jsPsych.run(timeline);
});
</script>