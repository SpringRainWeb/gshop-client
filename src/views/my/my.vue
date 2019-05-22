<template>
  <div class="my">
      <header-con></header-con>
      {{userInfo.userName}}
  </div>
</template>

<script>
import headerCon from '../../components/header'
import {mapState} from 'vuex'
export default {
  name: 'my',
  data() { 
    return {

    }
  },
  components: {
    headerCon,
    
  },
  computed:{
    ...mapState(['userInfo'])
  }
 }
</script>

<style lang="scss" scoped>
  .my{

  }
</style>