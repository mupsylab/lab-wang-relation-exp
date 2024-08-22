<template>
    <div class="insturction-all-box">
        <div id="md-box">
            <div class="content">欢迎参加本次实验！接下来你将会回答有关你的社交网络的问题。</div>
            <div class="head1">指导语</div>
            <div class="content">在游戏过程中，你需要输入那些你认识并与之互动的家人、朋友、熟悉的人的名字。</div>
            <div class="content">你的每段关系都会在你的宇宙中拥有属于自己的部分，为了让你创造最完整的宇宙，你将需要把人们分成6个不同的组：</div>
            <ul class="list1">
                <li>家人</li>
                <li>朋友</li>
                <li>打电话</li>
                <li>发短信</li>
                <li>面对面</li>
                <li>社交媒体（例如，微信，QQ，微博…）</li>
            </ul>
            <div class="head1">关于隐私</div>
            <div class="content">在开始前，还有一件更重要的事</div>
            <div class="content">在完成游戏后，我们将尽一切可能使数据尽可能匿名。我们将删除你所有朋友和家人的姓名/昵称。</div>
            <div class="content">例如，如果你输入“爸爸，妈妈，李华，赵腾飞”，我们将会把名字转换成“1，2，3，4”，我们将不会存储任何名字。</div>
            <div class="content">祝你玩得愉快！</div>
        </div>
        <div class="button-box">
            <div class="check" @click="emits('endTrials')">开始实验</div>
        </div>
    </div>
</template>

<style scoped>
.insturction-all-box {
    width: 300px;
    height: 600px;
    font-size: 16px;
    text-align: left;
    overflow-y: auto;
}

#md-box {
    width: 100%;
    height: 500px;
    overflow: hidden auto;
}

#md-box .head1 {
    font-size: 24px;
    line-height: 32px;
    margin: 20px 0 0 0;
}
#md-box .list1 {
    margin: 0;
}
#md-box .content {
    font-size: 16px;
    line-height: 24px;
    margin: 0 0 20px 0;
    text-indent: 2em;
}

.button-box {
    width: 100%;
    margin: 20px 0;
}

.button-box>div {
    width: 100px;
    height: 40px;
    margin: auto;
    box-sizing: content-box;
    padding: 10px;
    font-size: 24px;
    line-height: 40px;
    cursor: pointer;
    color: var(--font-high-light);
    background-color: var(--menu-activate);
}
</style>

<script setup lang="ts">
const emits = defineEmits(["endTrials"]);
</script>