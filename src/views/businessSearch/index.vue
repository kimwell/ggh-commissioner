<template>
  <div>
    <puhlishHeader>查询商户是否注册</puhlishHeader>
    <div class="mid-container">
      <div class="search-wrap">
        <span class="iconfont icon-sousuo"></span>
        <input type="text" v-model="searchApi.companyName" class="search-txt" placeholder="请输入商户公司抬头查询">
      </div>
      <div>
        <div v-for="item in list" class="companyName">
          {{item.companyName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import puhlishHeader from "@/components/header/index";
import debounce from 'lodash/debounce'
export default {
  components: {
    puhlishHeader
  },
  data() {
    return {
      searchApi: {
        companyName: ""
      },
      list: []
    };
  },
  watch: {
    "searchApi.companyName": {
      handler: debounce(function(val, oldVal) {
        this.getSearch();
      }, 500)
    }
  },
  methods: {
    getSearch() {
      this.$http.post("/sys/saleman/findCompany", this.searchApi).then(res => {
        if (res.code === 1000) {
          this.list = res.data;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.mid-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0.46rem 0 0 0;
  .search-wrap {
    position: relative;
    .iconfont {
      position: absolute;
      left: 0;
      top: 0;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      width: 0.3rem;
      color: #ddd;
    }
    .search-txt {
      width: 100%;
      height: 0.4rem;
      padding: 0 0.3rem;
    }
  }
  .companyName {
    line-height: 0.36rem;
    padding: 0 0.2rem;
  }
}
</style>