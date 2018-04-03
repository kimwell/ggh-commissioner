<template>
    <div class="search-container">
        <div class="search" :class="isFocus?'on-focus':''">
            <div class="search-main">
                <div class="search-warp">
                    <input class="goast-input" ref="search_input" v-model="searchText" @blur="lazyHide" @focus="isFocus = true" type="text" placeholder="请输入公司名/手机号">
                </div>
                <a class="clear-text" @click="clear">取消</a>
            </div>
            <!-- <div class="search-history">
                <h3>最近搜索</h3>
                <div class="history-list">
                    <div class="item" @click="fillText">
                        <span class="iconfont icon-shizhong"></span> 搜索内容
                    </div>
                </div>
            </div> -->
        </div>
        <div class="goast-search" v-show="isFocus"></div>
    </div>
</template>

<script>
    export default {
        props: {
            value: String
        },
        data() {
            return {
                isFocus: false,
                searchText: ''
            }
        },
        methods: {
            clear() {
                this.isFocus = false;
                this.searchText = '';
            },
            lazyHide() {
                setTimeout(() => {
                    if (this.isFocus)
                        this.isFocus = false
                }, 500);
            }
        },
        watch: {
            value(val) {
                this.searchText = val;
            },
            searchText(val) {
                this.$emit('input', val);
            },
            isFocus(val){
                if(val)
                    this.$refs.search_input.focus();
            }
        },
        mounted() {
            if (this.value) {
                this.searchText = true;
            }
        }
    }
</script>


<style lang="less" scoped>
    @import '../../style/mixin.less';
    .goast-search {
        width: 100%;
        height: .46rem;
    }
    
    .search {
        width: 100%;
        .transition;
        &.on-focus {
            position: fixed;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 999;
            background-color: rgba(0,0,0,.3);
            .search-warp {
                width: 90%;
            }
            .clear-text {
                right: 0!important;
            }
            .search-history {
                display: block;
            }
        }
    }
    
    .search-main {
        position: relative;
        width: 100%;
        padding: .08rem;
        overflow: hidden;
        background-color: #fff;
    }
    
    .search-warp {
        display: inline-block;
        width: 100%;
        height: .3rem;
        padding: 0 .15rem;
        background-color: @background_gray;
        .borderRadius(.2rem);
        .transition(width);
    }
    
    .goast-input {
        width: 100%;
        height: .28rem;
        background: none;
        outline: none;
    }
    
    .clear-text {
        position: absolute;
        display: inline-block;
        width: .4rem;
        height: .3rem;
        text-align: center;
        line-height: .3rem;
        right: -.4rem;
        top: .07rem;
        .transition(right);
    }
    
    .search-history {
        display: none;
        width: 100%;
        background-color: #fff;
        h3 {
            border-top: 1px solid @line_light_gray;
            border-bottom: 1px solid @line_light_gray;
            text-indent: .1rem;
            line-height: .4rem;
            font-size: .14rem;
            font-weight: bold;
        }
        .history-list {
            width: 100%;
            padding: 0 .1rem;
            .item {
                width: 100%;
                height: .4rem;
                line-height: .4rem;
                .iconfont {
                    vertical-align: top;
                }
            }
        }
    }
</style>
