<template>
    <div class="container">
        <publicHead>专员信息</publicHead>
        <div class="mid-container">
            <div class="head-logo" :class="dogClass"></div>
            <p>{{ user.realName }}</p>
            <a class="btn" @click="logout">退出登录</a>
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
                num: 5
            }
        },
        computed: {
            ...mapGetters(['user']),
            dogClass() {
                return 'dog' + this.num
            }
        },
        methods: {
            logout() {
                this.$store.commit(types.LOGOUT);
                window.location.href = '/zy/login';
            }
        },
        created() {
            this.num = Math.floor(Math.random() * 6 + 1);
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../style/mixin.less");
    .mid-container {
        width: 100%;
        height: 100%;
        padding: .46rem 0 .5rem 0;
        .head-logo {
            width: 1.6rem;
            height: 1.6rem;
            .borderRadius(.8rem);
            margin: .5rem auto .2rem;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
        .dog1 {
            background-image: url(../../assets/logo1.jpg);
        }
        .dog2 {
            background-image: url(../../assets/logo2.jpg);
        }
        .dog3 {
            background-image: url(../../assets/logo3.jpg);
        }
        .dog4 {
            background-image: url(../../assets/logo4.jpg);
        }
        .dog5 {
            background-image: url(../../assets/logo5.jpg);
        }
        .dog6 {
            background-image: url(../../assets/logo6.jpg);
        }
        p {
            text-align: center;
            height: .4rem;
            line-height: .4rem;
            font-size: .16rem;
        }
        .btn {
            display: block;
            width: 3.2rem;
            height: .44rem;
            line-height: .44rem;
            text-align: center;
            font-size: .14rem;
            margin: .1rem auto;
            background-color: @base_blue;
            color: #fff;
            .borderRadius(.05rem);
        }
    }
</style>

