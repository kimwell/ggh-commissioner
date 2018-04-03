<template>
  <div>
    <div class="login-wrap">
      <div class="login-frm">
        <h1>欢迎登录！</h1>
        <div class="frm-main">
          <div class="input-main">
            <span class="iconfont icon-yonghu"></span>
            <input type="text" v-model="loginData.mobile" placeholder="请输入用户名">
          </div>
          <div class="input-main">
            <span class="iconfont icon-mima"></span>
            <input type="password" v-model="loginData.password" placeholder="请输入密码">
          </div>
          <div class="input-main"><button type="button" @click="login">登陆</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  export default {
    data() {
      return {
        loginData: {
          mobile: '',
          password: ''
        }
      }
    },
    computed: {
      // 是否填写完整登录账号密码？
      valid() {
        return this.loginData.mobile != '' && this.loginData.password != ''
      }
  
    },
    methods: {
      setUser(data) {
        this.$store.commit(types.LOGIN, data);
        let redirect = decodeURIComponent(this.$route.query.redirect || '/businessList');
        this.$router.push({
          path: redirect
        })
      },
      login() {
        if (this.valid) {
          this.$http.post('/login/userLogin', this.loginData).then(res => {
            if (res.code === 1000) {
              this.setUser(res.data);
              this.$Toast({
                message: '登录成功',
                duration: 2000
              });
            } else {
              this.$Toast({
                message: '登录异常，请重新尝试',
                duration: 2000
              });
            }
          }).catch(err => {})
        } else {
          this.$MessageBox('Notice', '请将账号密码填写完整！');
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/mixin.less";
  .login-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/bg.jpg) no-repeat;
    background-size: 100%;
    .login-frm {
      position: absolute;
      width: 70%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h1 {
        font-size: .24rem;
        color: #fff;
        margin-bottom: .93rem;
        text-align: center;
      }
      .frm-main {
        .input-main {
          position: relative;
          border-bottom: 1px solid #fff;
          padding: .1rem 0;
          font-size: .14rem;
          margin-bottom: .15rem;
          &:last-child {
            border: none;
          }
          .iconfont {
            position: absolute;
            top: .05rem;
            left: 0;
            width: .4rem;
            color: #fff;
            font-size: .18rem;
          }
          input {
            border: none;
            background: transparent;
            color: #fff;
            width: 100%;
            padding-left: .3rem;
            font-size: .14rem;
          }
          input::-webkit-input-placeholder {
            color: #fff;
          }
          button {
            width: 100%;
            height: .4rem;
            background: #fff;
            text-align: center;
            font-size: .17rem;
            color: #272B32;
            margin-top: .28rem;
            cursor: pointer;
            .borderRadius(@radius: 1rem);
          }
        }
      }
    }
  }
</style>

