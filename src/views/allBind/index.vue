<template>
  <div>
    <publicHead>绑定商户汇总</publicHead>
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
        <div class="seach-btn">
          <mt-button size="small" type="primary" @click="searchData">查询</mt-button>
          <mt-button size="small" @click="clearData">清除</mt-button>
        </div>
      </div>
      <div class="list" v-for="item in list">
        <div class="list-item">
          <span class="nums">{{item.newBindBuserNum}}</span> 新绑定商户数
        </div>
        <div class="list-item">
          <span class="nums">{{item.buserLoginCount}}</span> 有效登录数
        </div>
        <div class="list-item">
          <span class="nums">{{item.ironBuyNum}}</span> 用户求购数
        </div>
        <div class="list-item">
          <span class="nums">{{item.ironBuyFinishNum}}</span> 求购成交数
        </div>
        <div class="list-item">
          <span class="nums">{{item.ironBuyPercent}}%</span> 求购成交率
        </div>
        <div class="list-item">
          <span class="nums">{{item.storeOrderNum}}</span> 订单数量
        </div>
        <div class="list-item">
          <span class="nums">{{item.storeOrderFinishNum}}</span> 订单完成数
        </div>
        <div class="list-item">
          <span class="nums">{{item.storeOrderPercent}}%</span> 订单完成率
        </div>
        <div class="list-item">
          <span class="nums">{{item.totalBindUserNum}}</span> 总绑定用户
        </div>
      </div>
    </div>
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
          endTime: ""
        },
        list: [],
        value: null
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
      todayStartTime() {
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        return now.getTime()
      },
      todayEndTime() {
        return this.todayStartTime + 86400000;
      },
      todayStart() {
        return new Date(this.todayStartTime);
      },
      todayEnd() {
        return new Date(this.todayEndTime);
      }
    },
    methods: {
      clearData() {
        this.dataApi = {
          startTime: "",
          endTime: ""
        };
        this.getList();
      },
      searchData() {
        if (this.dataApi.startTime != "" && this.dataApi.endTime != "") {
          this.getList();
        } else {
          this.$Toast({
            message: "请选择日期",
            duration: 2000
          });
        }
      },
      startChange(data) {
        this.dataApi.startTime = data.getTime();
      },
      endChange(data) {
        this.dataApi.endTime = data.getTime();
      },
      getList() {
        this.$http.post("/sys/saleman/saleManData", this.dataApi).then(res => {
          if (res.code === 1000) {
            this.list = res.data;
          }
        });
      },
      open(picker) {
        this.$refs[picker].open();
      }
    },
    created() {
      this.getList();
      this.value = this.getData;
      this.dataApi.startTime = this.todayStartTime;
      this.dataApi.endTime = this.todayEndTime;
    }
  };
</script>

<style lang='less' scoped>
  .main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0.46rem 0 0 0;
    .list-item {
      line-height: 0.4rem;
      padding: 0 0.3rem;
      border-bottom: 1px solid #e6e6e6;
      .nums {
        float: right;
      }
    }
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
  
  .seach-btn {
    padding-top: 0.1rem;
    text-align: right;
    padding-right: 0.3rem;
    .mint-button {
      margin-left: 0.15rem;
    }
  }
</style>