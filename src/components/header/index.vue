<template>
    <div class="header">
        <a class="back" @click="$router.go('-1')">返回</a>
        <slot></slot>
        <a class="right">
            <slot name="right"></slot>
        </a>
    </div>
</template>

<script>
    export default {
        props: {
            backText: {
                type: String,
                default: '返回'
            }
        },
        methods: {
            goBack(){
                
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../style/mixin.less';
    .header {
        position: fixed;
        width: 100%;
        height: .46rem;
        line-height: .46rem;
        left: 0;
        top: 0;
        background-color: #fff;
        font-size: .17rem;
        text-align: center;
        border-bottom: 1px solid @line_light_gray;
        z-index: 998;
        .back {
            position: absolute;
            font-size: .12rem;
            left: .1rem;
        }
        .right{
            position: absolute;
            font-size: .12rem;
            right: .1rem;
        }
    }
</style>

