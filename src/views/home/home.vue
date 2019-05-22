<template>
  <div class="home">
    <header-con>
      <div slot="detail" class="detail">
        <router-link to="search" class="search">
          <i class="cubeic-search"></i>
        </router-link>
        <span class="location ellipsis">陕西省西安市未央区xx路xx小区</span>
        <router-link class="login" to="login" tag='div'>
          登录|注册
        </router-link>
      </div>
    </header-con>
    <swiper></swiper>
    <shop-list></shop-list>
  </div>
</template>

<script>
import headerCon from "../../components/header";
import shopList from "./shopList/shopList"
import swiper from "./swiper"
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    headerCon,
    swiper,
    shopList
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 0.6rem;
}
</style>