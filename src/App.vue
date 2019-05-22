<template>
  <div id="app">
    <router-view/>
    <footer-guide v-show="this.$route.meta.showFooter"></footer-guide>
  </div>
</template>
<script>
import footerGuide from './components/footerGuide'
export default {
  components:{
    footerGuide
  }
}
</script>

<style lang="scss">
html{
  font-size: calc(10000vw / 375)
}
body{
  font-size: 0.16rem;
  color: #424242;
}
#app{
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
body::-webkit-scrollbar{
  display: none;
}

.cube-dialog-btn_highlight {
    color: #1dd3da;
}
</style>
