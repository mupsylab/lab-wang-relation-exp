<template>
    <div class="insturction-all-box">
        <div id="md-box"></div>
    </div>
</template>

<style scoped>
.insturction-all-box {
    width: 300px;
    height: 600px;
    font-size: 16px;
    text-align: left;
    text-indent: 2em;
    overflow-y: auto;
}
</style>

<script setup lang="ts">
import Vditor from 'vditor'
import { onMounted } from 'vue';

onMounted(() => {
    Vditor.preview(
        document.querySelector("#md-box") as HTMLDivElement,
        `欢迎参加本次实验！接下来你将会回答有关你的社交网络的问题。
# 指导语
在游戏过程中，你需要输入那些你认识并与之互动的家人、朋友、熟悉的人的名字。

你的每段关系都会在你的宇宙中拥有属于自己的部分，为了让你创造最完整的宇宙，你将需要把人们分成6个不同的组：
- 家人
- 朋友
- 打电话
- 发短信
- 面对面
- 社交媒体（例如，微信，QQ，微博…）


## 关于隐私
在开始前，还有一件更重要的事

在完成游戏后，我们将尽一切可能使数据尽可能匿名。我们将删除你所有朋友和家人的姓名/昵称。

例如，如果你输入“爸爸，妈妈，李华，赵腾飞”，我们将会把名字转换成“1，2，3，4”，我们将不会存储任何名字。

祝你玩得愉快！`, {
        mode: "dark"
    }
    );
});
</script>