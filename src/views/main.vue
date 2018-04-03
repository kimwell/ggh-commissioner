<template>
  <div class="hello">
    {{ msg }}
    <bottomTab></bottomTab>
  </div>
</template>

<script>
import bottomTab from '@/components/bottomTab'
export default {
  components: {
    bottomTab
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>
<style>
.hello{
  font-size: .14rem;
}
</style>
