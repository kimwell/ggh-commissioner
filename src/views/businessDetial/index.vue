<template>
  <div>
    <publicHead>商户详情</publicHead>
    <div class="content">
      <ul class="businessDetail">
        <li class="column"><div class="column-left">公司名称</div><div class="column-right">{{list.companyName}}</div></li>
        <li class="column">
          <div class="column-left">资质认证</div>
          <div class="column-right">
            <template v-if="list.isFaithUser == '1' || list.isGuaranteeUser == '1'">
              <span class="iconfont icon-cheng" v-show="list.isFaithUser == '1'"></span>
              <span class="iconfont icon-bao" v-show="list.isGuaranteeUser == '1'"></span>
            </template>
            <span v-else>暂无</span>
          </div>
        </li>
        <li class="column"><div class="column-left">注册手机</div><div class="column-right">{{tel}}</div></li>
        <li class="column"><div class="column-left">入驻时间</div><div class="column-right">{{list.beBuserTime | dateformat}}</div></li>
        <li class="column"><div class="column-left">注册资金</div><div class="column-right">{{list.regMoney}}{{list.unit}}</div></li>
        <li class="column"><div class="column-left">联系人</div><div class="column-right">{{list.contact}}</div></li>
        <li class="column"><div class="column-left">联系方式</div><div class="column-right">{{list.contactNum}}</div></li>
        <li class="column"><div class="column-left">公司地址</div><div class="column-right">{{list.address}}</div></li>
        <li class="column"><div class="column-left">优惠信息</div><div class="column-right">{{list.proInfo | emptyHlod(payload="暂无")}}</div></li>
        <li class="column"><div class="column-left">仓库信息</div><div class="column-right">{{list.storeHouseName | emptyHlod(payload="暂无")}}</div></li>
      </ul>
    </div>
  </div>
</template>

<script>
import publicHead from "@/components/header";

export default {
  components: {
    publicHead,
  },
  data() {
    return {
      list: [],
      tel: ''
    };
  },
  computed: {
    id() {
        return this.$route.params.id
    }
  },
  methods: {
    getBusinessDetail(){
      this.$http.get('/sys/salesManBuserInfo/findBuserInfo',{
        params:{
          userId: this.id
        }
      }).then(res =>{
        if(res.code === 1000){
          this.list = res.data.buserInfo;
          this.tel = res.data.mobile
        }
      })
    }
  
  },
  created() {
    this.getBusinessDetail();
  }
};
</script>
<style lang="less" scoped>
@import '../../style/mixin.less'; 
.content {
  padding: 0.5rem 0;
}
.businessDetail{
  background-color: #fff;
  .column{
    position: relative;
    font-size: .16rem;
    padding: .12rem 0;
    .flex-block;
    &:before {
      content: '';
        position: absolute;
        left: .16rem;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid @line_light_gray;
        display: block;
        transform: scaleY(0.5);
        transform-origin: 0 100%;
        pointer-events: none;
      }
      &:last-child::before{
        display: none;
      }
      .column-left {
        position: relative;
        padding: 0 .16rem;
        color: #999;
        min-width: 1rem;
        display: -webkit-box;
        box-pack: start;
        box-align: center;
      }
      .column-right {
        position: relative;
        padding-right: .16rem;
        color: #333;
        .iconfont{
          font-size: .16rem;
          &.icon-cheng{
            color: #f5a623;
          }
          &.icon-bao{
            color: #c16bd6;
          }
        }
      }
    }
}
</style>

