<template>
    <div class="container">
        <publicHead>代商户发布求购</publicHead>
        <div class="mid-container">
            <div class="search">
                <div class="warp">
                    <i class="iconfont icon-sousuo"></i>
                    <input type="text" class="goast" v-model="queryMessage" placeholder="请输入商户名称">
                    <div class="btn" @click="queryShops">查询</div>
                </div>
            </div>
    
            <div class="picker-list">
                <div class="item" v-for="(item,i) in list" :key="i">
                    {{ item.companyName }}
                    <i class="iconfont" :class="item.check ? 'icon-check-circle': 'icon-checknormal' " @click="check(i)"></i>
                </div>
            </div>

            <div class="next" v-show="canGo" @click="goPub">下一步</div>
        </div>
        <bottomTab></bottomTab>
    </div>
</template>

<script>
    import * as types from '@/store/types'
    import publicHead from '@/components/header'
    import bottomTab from '@/components/bottomTab'
    import {
        mapGetters
    } from 'vuex'
    export default {
        components: {
            publicHead,
            bottomTab
        },
        data() {
            return {
                queryMessage: '',
                list: [],
                active: null
            }
        },
        computed: {
            // 是否可以继续前往发布
            canGo(){
                return this.list.findIndex(item => item.check) >= 0
            }
        },
        methods: {
            // 查询商户
            queryShops() {
                // if (this.queryMessage == '') return
                this.$http.post('/sys/saleman/findBindBuser', {
                    queryMessage: this.queryMessage,
                    currentPage: 1,
                    pageSize: 100
                }).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list.map(item => {
                            item.check = false;
                            return item
                        })
                    }
                })
            },
            check(i) {
                this.list.forEach(item => item.check = false);
                this.list[i].check = true;
                this.active = i;
            },
            goPub(){
                if(this.canGo)
                    this.$router.push({name:'pbs',params: {id: this.list[this.active].id}})
            }
        },
        created() {
    
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../style/mixin.less");
    .mid-container {
        width: 100%;
        height: 100%;
        padding: .46rem 0 .5rem 0;
        background-color: #fff;
        .search {
            margin-top: .1rem;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            padding: 0 .15rem;
            .warp {
                position: relative;
                width: 100%;
                height: 100%;
                border: .01rem solid #ccc;
                padding: 0 .1rem;
                .borderRadius;
                overflow: hidden;
                .iconfont {
                    position: absolute;
                    left: .1rem;
                }
                .goast {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    outline: none;
                    margin: 0;
                    padding: 0 .6rem 0 .3rem;
                    background: none;
                }
                .btn {
                    position: absolute;
                    width: .6rem;
                    height: 100%;
                    background-color: @base_blue;
                    right: 0;
                    top: 0;
                    text-align: center;
                    color: #fff;
                }
            }
        }
        .picker-list {
            width: 100%;
            padding: 0 .15rem;
            margin-top: .2rem;
            font-size: .14rem;
            .item {
                position: relative;
                width: 100%;
                height: .4rem;
                line-height: .4rem;
                padding: 0 .1rem;
                background-color: @background_gray;
                margin-bottom: .05rem;
                .borderRadius;
                .iconfont {
                    position: absolute;
                    right: .1rem;
                    font-size: .2rem;
                    &.icon-check-circle{
                        color: @base_blue;
                    }
                }
            }
        }

        .next{
            position: fixed;
            width: 3.25rem;
            height: .44rem;
            line-height: .44rem;
            background-color: @base_blue;
            color: #fff;
            font-size: .14rem;
            color: #fff;
            text-align: center;
            bottom: .6rem;
            left: .25rem;
            .borderRadius;
        }
    }
</style>

