<template>
  <div class="footerGuide">
    <router-link :to="item.path" class="guide-item" v-for="item in GuideList" :key="item.text">
      <i class="guide-icon" :class="item.icon"></i>
      <span class="guide-text">{{item.text}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "footerGuide",
  data() {
    return {
      GuideList: [
        {
          icon: "cubeic-home",
          text: "首页",
          path: "home"
        },
        {
          icon: "cubeic-search",
          text: "搜索",
          path: "search"
        },
        {
          icon: "cubeic-mall",
          text: "订单",
          path: "list",
        },
        {
          icon: "cubeic-person",
          text: "我的",
          path: "my"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.footerGuide {
  box-sizing: border-box;
  border-top: 2px solid #f0f0f0;
  width: 100vw;
  background-color: #fefefe;
  height: 0.6rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  .guide-item {
    width: 20vw;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    .guide-icon {
      font-size: 0.28rem;
    }
    .guide-text {
      line-height: 20px;
      font-size: 0.12rem;
    }
  }
}

.active {
  color: #1dd3da;
}
.active::after{
    content: '';
    height: 3px;
    width:20vw;
    display: block;
    background-color: #1dd3da;
    position: absolute;
    bottom: 0;
    border-radius: 3px;

}
</style>