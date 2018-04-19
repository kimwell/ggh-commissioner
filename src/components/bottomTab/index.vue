<template>
    <div class="bottom-nav">
        <router-link class="item" :to="item.link" v-for="(item,index) in nav" :key="index">
            <span class="iconfont" :class="item.icon"></span>
        </router-link>
    </div>
</template>

<script>
export default {
  data () {
      return {
          nav:[{
              name:'首页',
              icon:'icon-shouye',
              link:'businessList'
          },
          {
              name:'求购列表',
              icon:'icon-keyuanguanli',
              link:'buys'
          },
           {
              name:'代发求购',
              icon:'icon-fuwu',
              link:'help'
          },
          {
              name:'用户中心',
              icon:'icon-gerenzhongxin',
              link:'user'
          }]
      }
  }
}
</script>


<style lang="less" scoped>
    @import '../../style/mixin.less';
    .bottom-nav{
        position: fixed;
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        left: 0;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid @line_light_gray;
        .flex-block;
        .item{
            text-align: center;
            .flex-grow;
        }
        .iconfont{
            font-size: .24rem;
            color: @font_dark;
        }
    }

    .router-link-active.item .iconfont{
        color:@base_blue;
    }
</style>
