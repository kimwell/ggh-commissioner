<template>
    <div class="company-warp">
        <h3>
            {{ company.companyName }}
            <span class="iconfont icon-cheng" v-show="company.isFaithUser == 1"></span>
            <span class="iconfont icon-bao" v-show="company.isGuaranteeUser == 1"></span>
            <crown style="margin-left:.05rem" :level="company.level"></crown>
        </h3>
        <p><span class="iconfont icon-hui"></span>{{ company.proInfo | emptyHlod('暂无') }}</p>
        <p><span class="iconfont icon-ziyuan"></span>{{ company.storeHouseName | emptyHlod('暂无') }}</p>

        <a class="call" :href="'tel:'+company.contactNum"><span class="iconfont icon-dianhua"></span>{{ company.contact }}</a>
    </div>
</template>

<script>
import crown from '@/components/basic/crown/index.vue'
export default {
  props:['company'],
  components: {
      crown
  }
}
</script>


<style lang="less" scoped>
    @import url('../../../style/mixin.less');
    .company-warp {
        position: relative;
        width: 100%;
        padding: .1rem;
        background-color: @background_gray;
        line-height: .24rem;
        .icon-cheng{
            color:green;
        }
        .icon-bao{
            color:#c16bd6;
        }
        .icon-hui{
            color: red;
        }
        .icon-ziyuan{
            color: #3c3cd8;
        }
        p .iconfont {
            margin-right:.05rem;
        }

        .call{
            position: absolute;
            right: .1rem;
            bottom: .1rem;
            color: @base_blue;
            .iconfont{
                color: @base_blue;
            }
        }
    }
</style>
