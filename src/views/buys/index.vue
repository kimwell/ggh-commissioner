<template>
  <div class="container">
    <publicHead>商户求购管理
      <span class="iconfont icon-sousuo" slot="right" @click="showSearch"></span>
    </publicHead>
    <search v-model="apiData.userInfo" ref="search"></search>
    <div class="tab-bar-container">
      <div class="item" :class="{'active':statusActive == index}" v-for="(state,index) in status" :key="state.key" @click="screenStatus(index)">{{ `${state.value}(${state.count})` }}</div>
    </div>
    <scroller class="item-list" ref="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
      <div class="item" v-for="(item,index) in list" :key="item.id" @click="$router.push('/buysDetail-'+item.id)">
        <div class="title">
          {{ item.companyName }}
          <span>{{ item.createTime | dateformat('MM/dd hh:mm') }}</span>
        </div>
        <div class="content">
          <h3>{{ `${item.ironTypeName}/${item.surfaceName}/${item.materialName}/${item.proPlacesName}` }}</h3>
          <p>{{ item.specifications != '' ? item.specifications : `${item.height}*${item.width}*${item.length}` }} {{ item.tolerance != '' ? item.tolerance : ''}}</p>
          <p>
            {{ item.numbers != '' ? item.numbers + item.numberUnit + ' ' : '' }}{{ item.weightUnit != '' ? item.weights + item.weightUnit : '' }}
            <span :class="'status-'+item.buyStatus">{{ item.sellNum }}个报价</span>
          </p>

          <span v-show="item.buyStatus == 3" class="dead iconfont icon-jiufuqianbaoicon10"></span>
        </div>
      </div>
    </scroller>
    <bottomTab></bottomTab>
  </div>
</template>

<script>
  import publicHead from '@/components/header'
  import bottomTab from '@/components/bottomTab'
  import search from '@/components/search'
  import debounce from 'lodash/debounce'
  export default {
    components: {
      bottomTab,
      publicHead,
      search
    },
    data() {
      return {
        apiData: {
          userInfo: '',
          currentPage: 1,
          pageSize: 15,
          buyStatus: 1 //1进行中，2成交，3失效
        },
        status: [{
            key: 1,
            value: '进行中',
            count: 0
          },
          {
            key: 2,
            value: '成交',
            count: 0
          },
          {
            key: 3,
            value: '失效',
            count: 0
          }
        ],
        statusActive: 0,
        list: [],
        totalCount: 0,
        scrollTop: 0,
        fromDetail: false //用来控制离开路由前，搜索值清空时不再出发获取数据
      }
    },
    computed: {
      maxPage() {
        return Math.ceil(this.totalCount / this.apiData.pageSize)
      },
      // 是否还能继续翻页
      canPage() {
        return this.apiData.currentPage < this.maxPage
      }
    },
    methods: {
      // 上拉刷新
      refresh(done) {
        this.apiData.currentPage = 1;
        this.getList().then(() => {
          done()
        })
      },
      // 下拉加载
      infinite(done) {
        if (this.canPage) {
          this.apiData.currentPage++;
          this.getList(false).then(() => {
            done()
          })
        } else {
          done(true)
        }
      },
      // 显示搜索
      showSearch() {
        this.$refs.search.isFocus = true
      },
      // 获取列表数据
      getList(isFalsh = true) {
        return this.$http.post('/sys/salemanIronBuy/queryBindIronBuyList', this.apiData).then(res => {
          if (res.code === 1000) {
            if (isFalsh) {
              this.list = res.data.list;
            } else {
              this.list.push(...res.data.list);
            }
            this.status[0].count = res.data.ing;
            this.status[1].count = res.data.get;
            this.status[2].count = res.data.miss;
            this.totalCount = res.data.totalCount;
          }
        })
      },
      // 切换状态
      screenStatus(i){
        this.statusActive = i;
        this.apiData.buyStatus = this.status[this.statusActive].key;
        this.reloadList();
      },
      // 刷新列表
      reloadList() {
        this.apiData.currentPage = 1;
        this.getList();
        this.$refs.scroller.scrollTo(0, 0);
      },
      // 设置滚动条
      setScroll(){
        this.$nextTick(()=> {
          setTimeout(() => {
            this.$refs.scroller.scrollTo(0, this.scrollTop);
          }, 500);
        })
      },
      init(){
        // 如果从详情回来，则不做初始化
        if(this.fromDetail)
          return false
        this.statusActive = 0;
        this.apiData.userInfo = '';
        this.getList();
      }
    },
    watch: {
      'apiData.userInfo': {
        handler: debounce(function(val, oldVal) {
          this.reloadList();
        }, 500)
      }
    },
    activated() {
      this.init();
    },
    beforeRouteEnter(to, from, next) {
      // 如果是从详情返回，则设置滚动到原来位置
      next(vm => {
        if (from.name == 'buysDetail') {
          vm.setScroll();
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      // 如果是进入详情页，则保存滚动位置,如果是其他页面初始化所有数据
      if (to.name == 'buysDetail') {
        this.scrollTop = this.$refs.scroller.getPosition().top;
      }
      this.fromDetail = to.name == 'buysDetail';
      next();
    }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';
  .item-list {
    padding: .98rem 0 .55rem 0;
    .item {
      width: 100%;
      background-color: #fff;
      margin-bottom: .08rem;
      overflow: hidden;
      color: @font_dark;
      .title {
        position: relative;
        width: 100%;
        height: .35rem;
        line-height: .35rem;
        border-bottom: 1px solid @line_light_gray;
        text-indent: .15rem;
        span {
          position: absolute;
          right: .15rem;
          font-size: .12rem;
          color: @font_light;
        }
      }
      .content {
        position: relative;
        width: 100%;
        padding: .1rem .15rem;
        font-size: .14rem;
        line-height: .26rem;
        h3 {
          width: 2.8rem;
          font-size: .14rem;
          font-weight: bold;
          .ellipsis;
        }
        p {
          position: relative;
          width: 100%;
          span {
            position: absolute;
            right: 0;
            font-size: .16rem;
            
            &.status-1{
              color: @status_green;
            }
            &.status-2{
              color: @status_red;
            }
            &.status-3{
              font-size: .12rem;
              color: @font_light;
            }
          }
        }

        .dead{
          position: absolute;
          right: .15rem;
          top: .2rem;
          font-size: .6rem;
          color: @font_light;
        }
      }
    }
  }
  
  .tab-bar-container {
    position: fixed;
    box-sizing: content-box;
    width: 100%;
    height: .44rem;
    background-color: #fff;
    z-index: 998;
    border-bottom: .08rem solid @background_gray;
    .flex-block;
    .item {
      text-align: center;
      height: .44rem;
      line-height: .44rem;
      .flex-grow;
      font-size: .14rem;
      border-right: 1px solid @line_light_gray;
      &:last-child {
        border: 0;
      }
      &.active {
        color: @base_blue;
        font-weight: bold;
      }
    }
  }
</style>

