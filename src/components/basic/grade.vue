<template>
  <span class="grade iconfont" :class="grade">
  </span>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default:''
      }
    },
    data() {
      return {}
    },
    computed: {
      grade() {
        if (this.value != '') {
          switch (this.value) {
            case '50万':
              return 'icon-icon-test2'
              break;
            case '100万':
              return 'icon-icon-test1'
              break;
            case '500万':
              return 'icon-icon-test'
              break;
              default:
              break;
          }
        }
      }
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  .grade{
    margin: 0 5px;
    &.icon-icon-test{
      color: red;
    }
    &.icon-icon-test2{
      color: rgb(30, 202, 7);
    }
    &.icon-icon-test1{
      color: #f90;
    }
  }
</style>