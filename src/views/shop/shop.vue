<template>
  <div class="shop">
      <shop-header></shop-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      
  </div>
</template>

<script>
import shopHeader from './shopHeader'
export default {
  name: 'shop',
  data() { 
    return {

    }
  },
  components:{
      shopHeader
  },
  mounted(){
      this.$store.dispatch('receiveInfo');
  }
 }
</script>

<style lang="scss" scoped>
  .shop{

  }
</style>