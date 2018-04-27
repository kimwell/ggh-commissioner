<template>
  <div>
    <publicHead>商户使用情况分析</publicHead>
    <scroller ref="scroller"  :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
      <div class="main">
        <div class="searchBar">
          <div class="search-wrap">
            <div class="cell">
              <div class="data" @click="open('pickerStart')">
                <span v-if="dataApi.startTime  != ''">{{dataApi.startTime | dateformat('yyyy-MM-dd')}}</span>
                <span v-else>起始日期</span>
              </div>
            </div>
            <div class="cell">
              <div class="data" @click="open('pickerEnd')">
                <span v-if="dataApi.endTime  != ''">{{dataApi.endTime | dateformat('yyyy-MM-dd')}}</span>
                <span v-else>终止日期</span>
              </div>
            </div>
          </div>
          <div class="search-main">
            <div class="cells">
              <span class="right"><span v-for="(item,index) in tf" @click="loginHandle(index)" :class="loginStatus == index ? 'active':''">{{item.name}}</span></span>
              是否登录过
            </div>
            <div class="cells">
              <span class="right"><span v-for="(item,index) in tf" @click="ironHandle(index)" :class="ironStatus == index ? 'active':''">{{item.name}}</span></span>
              是否求购过
            </div>
            <div class="company">
              <input type="text" v-model="dataApi.companyName" placeholder="请输入商家模糊查询">
            </div>
          </div>
          <div class="seach-btn">
            <mt-button size="small" type="primary" @click="searchData">查询</mt-button>
            <mt-button size="small" @click="clearData">清除</mt-button>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-item" v-for="item in list">
          <div class="item-header list-cell">
            <span class="time">{{item.beBuserTime | dateformat}}</span> {{item.companyName}}
          </div>
          <div class="list-cell saleMan"><span>{{item.saleName}}</span><span>{{item.saleMobile}}</span></div>
          <div class="item-cell list-cell">
            <div class="item-cell-row">登录<span class="day">{{item.signNum}}</span>天</div>
            <div class="item-cell-row">登录使用率：{{item.signRate}}%</div>
          </div>
          <div class="item-cell list-cell">
            <div class="item-cell-row">求购<span class="day">{{item.ironNum}}</span>天</div>
            <div class="item-cell-row">求购使用率：{{item.ironRate}}%</div>
          </div>
        </div>
      </div>
    </scroller>
    <mt-datetime-picker ref="pickerStart" type="date" v-model="value" @confirm="startChange">
    </mt-datetime-picker>
    <mt-datetime-picker ref="pickerEnd" type="date" v-model="value" @confirm="endChange">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import publicHead from "@/components/header";
  
  export default {
    components: {
      publicHead
    },
    data() {
      return {
        dataApi: {
          startTime: "",
          endTime: "",
          login: "",
          ironBuy: "",
          companyName: "",
          currentPage: 1,
          pageSize: 10
        },
        list: [],
        value: null,
        tf: [{
            name: "否",
            id: 0
          },
          {
            name: "是",
            id: 1
          }
        ],
        loginStatus: null,
        ironStatus: null,
        maxCount: 0
      };
    },
    computed: {
      getData() {
        let data = new Date();
        let year = data.getFullYear();
        let mouth = data.getMonth() + 1;
        let day = data.getDate();
        return year + "-" + mouth + "-" + day;
      },
      max() {
        return Math.ceil(this.maxCount / this.dataApi.pageSize);
      }
    },
    methods: {
      getList() {
        this.$http.post("/sys/saleman/buserData", this.dataApi).then(res => {
          console.log(res);
          this.list = res.data.list;
        });
      },
      clearData() {
        this.dataApi = {
          startTime: "",
          endTime: "",
          login: "",
          ironBuy: "",
          companyName: "",
          currentPage: 1,
          pageSize: 10
        };
        this.getList();
      },
      searchData() {
        this.getList();
      },
      startChange(data) {
        this.dataApi.startTime = data.getTime();
      },
      endChange(data) {
        this.dataApi.endTime = data.getTime();
      },
      loginHandle(e) {
        this.dataApi.login = e;
        this.loginStatus = e;
      },
      ironHandle(e) {
        this.dataApi.ironBuy = e;
        this.ironStatus = e;
      },
      infinite(done) {
        if (this.dataApi.currentPage < this.max) {
          this.dataApi.currentPage++;
          this.getList();
          done();
        }else{
          done(true);
        }
      },
      // refresh(done) {
      //   if (this.dataApi.currentPage < this.max) {
      //     this.dataApi.currentPage++;
      //     this.getList();
      //     done();
      //   } else {
      //     done(true);
      //   }
      // },
    },
    created() {
      this.getList();
      this.value = this.getData;
    }
  };
</script>

<style lang='less' scoped>
  .main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0.46rem 0 0 0;
  }
  
  .searchBar {
    padding: 0.1rem 0;
  }
  
  .search-wrap {
    position: relative;
    display: flex;
    &::before {
      content: "-";
      position: absolute;
      top: 50%;
      left: 50%;
      color: #ddd;
      transform: translate(-50%, -50%);
    }
    .cell {
      flex: 1;
      padding: 0 0.3rem;
      .data {
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: #eee;
        text-align: center;
      }
    }
  }
  
  .search-main {
    padding: 0.1rem 0.3rem;
    .company {
      input {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.1rem;
        border: 1px solid #ddd;
      }
    }
    .cells {
      padding: 0.1rem 0;
    }
    .right {
      float: right;
      span {
        display: inline-block;
        margin-left: 0.2rem;
        &.active {
          color: #116cd6;
        }
      }
    }
  }
  
  .seach-btn {
    padding-top: 0.1rem;
    text-align: right;
    padding-right: 0.3rem;
    .mint-button {
      margin-left: 0.15rem;
    }
  }
  
  .list {
    padding: 0.1rem;
    .list-item {
      background-color: #fff;
      margin-bottom: 0.2rem;
      padding: 0.1rem;
    }
    .item-header {
      .time {
        float: right;
      }
    }
    .item-cell {
      display: flex;
      .item-cell-row {
        flex: 1;
      }
    }
    .list-cell {
      margin: 0.1rem 0;
    }
    .saleMan {
      span {
        display: inline-block;
        margin-right: 0.2rem;
      }
    }
    .day {
      color: red;
    }
  }
  
  .noData {
    text-align: center;
    padding-top: 0.2rem;
  }
</style>