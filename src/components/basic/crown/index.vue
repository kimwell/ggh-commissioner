<template>
    <div class="crown-container">
        <label>{{ tit }}</label>
        <span v-for="el in num" :key="el" :class="'crown'+pic"></span>
        <div class="tip">{{ tip }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            tit: {
                type: String,
                default: ''
            },
            level: {
                type: String,
                default: '1-1'
            },
            tip: {
                type: String,
                default: ''
            }
        },
        computed: {
            num() {
                return this.level != '' ? this.level.split('-')[1] * 1 : 1;
            },
            pic() {
                return this.level != '' ? this.level.split('-')[0] : 1;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../style/mixin.less';
    .crown-container {
        position: relative;
        display: inline-block;
        vertical-align: top;
        height: .16rem;
        text-indent: 0!important;
        span {
            position: relative;
            top: .02rem;
            display: inline-block;
            width: .16rem;
            height: .16rem;
            margin-right: .02rem;
            background-repeat: no-repeat;
            background-position: center;
            &.crown1 {
                background-image: url('http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/crown/1.png')
            }
            &.crown2 {
                background-image: url('http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/crown/2.png')
            }
            &.crown3 {
                background-image: url('http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/crown/3.png')
            }
        }
        .tip {
            position: absolute;
            display: none;
            font-size: .12rem;
            line-height: .3rem;
            text-align: center;
            color: #fff;
            text-indent: 0;
            padding: 0 .1rem;
            background-color: rgba(70, 76, 91, .9);
            white-space: nowrap;
            z-index: 10;
            top: 0;
            left: .2rem;
            .borderRadius;
        }
        &.tip-left {
            .tip {
                top: .09rem;
                right: .2rem;
                left: auto;
            }
        }
        &:hover {
            .tip {
                display: block;
            }
        }
    }
</style>

