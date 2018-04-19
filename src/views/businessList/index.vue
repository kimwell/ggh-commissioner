<template>
  <div class="container">
    <publicHead>商家列表</publicHead>
    <div class="mid-container">
      <search v-model="apiData.queryMessage" ref="search"></search>
      <div class="item-list">
        <scroller ref="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
          <div class="list-column">
            <div class="list" v-for="item in list" :key="item.userId">
              <div class="list-main" @click="$router.push('/businessDetial-'+item.id)">
                <div class="name">{{item.companyName}}</div>
                <div class="address">{{item.address}}</div>
              </div>
              <div class="list-info">
                <span><i class="iconfont icon-yonghu"></i>{{item.contact}}</span>
                <span class="tel"><i class="iconfont icon-dianhua"></i><a :href="'tel:' + item.contactNum">{{item.contactNum}}</a></span>
              </div>
            </div>
          </div>
        </scroller>
      </div>
    </div>
    <bottomTab></bottomTab>
  </div>
</template>

<script>
import publicHead from "@/components/header";
import bottomTab from "@/components/bottomTab";
import search from "@/components/search";
import debounce from 'lodash/debounce'
export default {
  components: {
    bottomTab,
    publicHead,
    search
  },
  data() {
    return {
      text: "",
      list: [],
      apiData: {
        currentPage: 1,
        pageSize: 10,
        queryMessage: ""
      },
      maxCount: 0,
      scrollTop: 0,
      fromDetail: false
    };
  },
  computed: {
    max() {
      return Math.ceil(this.maxCount / this.apiData.pageSize);
    }
  },
  methods: {
    //  刷新
    refresh(done) {
        this.apiData.currentPage = 1;
        this.getList();
        done();
    },
    //  加载更多
    infinite(done) {
        if (this.apiData.currentPage < this.max) {
          this.apiData.currentPage++;
          this.getList();
          done();
        }else{
          done(true);
        }
    },
    //  获取列表
    getList() {
      this.$http.post("/sys/saleman/findBindBuser",this.apiData
        ).then(res => {
          // console.log(res);
          if (res.code === 1000) {
            if (this.apiData.currentPage === 1) {
              this.list = res.data.list;
            } else {
              this.list.push(...res.data.list);
            }
            this.maxCount = res.data.totalCount;
          }
        });
    },
    // 设置滚动条
    setScroll(){
      this.$nextTick(()=> {
        setTimeout(() => {
          this.$refs.scroller.scrollTo(0, this.scrollTop);
        }, 500);
      })
    },
    init() {
       // 如果从详情回来，则不做初始化
      if(this.fromDetail)
        return false
      this.getList();
    },
    // 刷新列表
      reloadList() {
        this.apiData.currentPage = 1;
        this.getList();
        this.$refs.scroller.scrollTo(0, 0);
      }
  },
    watch: {
      'apiData.queryMessage': {
        handler: debounce(function(val, oldVal) {
          this.reloadList();
        }, 500)
      }
    },
  activated () {
    this.init();
  },
  beforeRouteEnter(to, from, next) {
    // 如果是从详情返回，则设置滚动到原来位置
    next(vm => {
      if (from.name == 'businessDetial') {
        vm.setScroll();
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // 如果是进入详情页，则保存滚动位置,如果是其他页面初始化所有数据
    if (to.name == 'businessDetial') {
      this.scrollTop = this.$refs.scroller.getPosition().top;
    }
    this.fromDetail = to.name == 'businessDetial';
    next();
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.mid-container {
  width: 100%;
  height: 100%;
  padding: 0.46rem 0 0.5rem 0;
  .item-list {
    position: relative;
    height: calc(~"100% - .46rem");
    p {
      line-height: 0.3rem;
    }
  }
  .list-column {
    padding: 0.1rem 0.09rem;
    .list {
      background: #fff;
      margin-bottom: 0.04rem;
      .list-main {
        position: relative;
        padding: 0.15rem;
        padding-right: 0.3rem;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 1px;
          border-top: 1px solid @line_light_gray;
          display: block;
          transform: scaleY(0.5);
          transform-origin: 0 100%;
          pointer-events: none;
        }
        &:after {
          content: "";
          position: absolute;
          right: 0.15rem;
          top: calc(50% - 0.05rem);
          width: 0.1rem;
          height: 0.1rem;
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          transform: rotate(45deg);
        }
        .name {
          font-size: 0.17rem;
          color: #333;
          .ellipsis;
        }
        .address {
          font-size: 0.14rem;
          color: #666;
          .ellipsis;
        }
      }
      .list-info {
        padding: 0.15rem;
        font-size: 0.15rem;
        color: #666;
        span {
          display: inline-block;
          margin-right: 0.1rem;
          &.tel {
            color: @base_blue;
            border-left: 1px solid @line_light_gray;
            padding-left: 0.1rem;
          }
          i {
            margin-right: 0.1rem;
          }
        }
        .iconfont {
          color: @base_blue;
          font-size: 0.15rem;
        }
      }
    }
  }
}
</style>

