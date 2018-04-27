<template>
    <div class="container">
        <publicHead>专员信息</publicHead>
        <div class="mid-container">
            <div class="head-logo" :class="dogClass"></div>
            <p>{{ user.realName }}</p>
            <div class="user-menu">
                <ul class="menu">
                    <router-link to="/allBind" tag="li">绑定商户汇总</router-link>
                    <router-link to="/analysis" tag="li">商户使用情况分析</router-link>
                </ul>
            </div>
            <a class="btn" @click="logout">退出登录</a>
        </div>
        <bottomTab></bottomTab>
    </div>
</template>

<script>
import * as types from "@/store/types";
import publicHead from "@/components/header";
import bottomTab from "@/components/bottomTab";
import { mapGetters } from "vuex";
export default {
  components: {
    publicHead,
    bottomTab
  },
  data() {
    return {
      num: 5
    };
  },
  computed: {
    ...mapGetters(["user"]),
    dogClass() {
      return "dog" + this.num;
    }
  },
  methods: {
    logout() {
      this.$store.commit(types.LOGOUT);
      window.location.href = "/zy/login";
    }
  },
  created() {
    this.num = Math.floor(Math.random() * 6 + 1);
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/mixin.less");
.mid-container {
  width: 100%;
  height: 100%;
  padding: 0.46rem 0 0.5rem 0;
  .head-logo {
    width: 1.6rem;
    height: 1.6rem;
    .borderRadius(0.8rem);
    margin: 0.5rem auto 0.2rem;
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
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.16rem;
  }
  .btn {
    display: block;
    width: 3.2rem;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    font-size: 0.14rem;
    margin: 0.1rem auto;
    background-color: @base_blue;
    color: #fff;
    .borderRadius(0.05rem);
  }
  .user-menu {
    padding: 0.6rem 0;
  }
  .user-menu li {
    position: relative;
    line-height: 0.4rem;
    background-color: #fff;
    padding: 0 0.3rem;
    border-bottom: 1px solid #e6e6e6;
    &:last-child {
      border-bottom: 0;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0.15rem;
      right: 0.2rem;
      width: 0.1rem;
      height: 0.1rem;
      border: 1px solid #bdbdbd;
      border-left: 0;
      border-bottom: 0;
      transform: rotate(45deg);
    }
  }
}
</style>

