<template>
  <header>
    <slot name="detail"></slot>
    <span v-if="title" class="title">{{title}}</span>
  </header>
</template>

<script>
export default {
  name: "headerCon",
  data() {
    return {
      title: ""
    };
  },
  created() {
    switch (this.$route.path) {
      case "/search":
        this.title = "搜索";
        break;
      case "/list":
        this.title = "订单";
        break;
      case "/my":
        this.title = "我的";
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 0.5rem;
  background: #1dd3da;
  text-align: center;
  line-height: 0.5rem;
  color: #f0f0f0;
  font-size: 0.16rem;
  a {
    color: #f0f0f0;
  }
  .title {
    font-size: 0.18rem;
  }
  .detail {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .search {
      font-size: 0.3rem;
      margin: 0 0.1rem;
    }
    .location {
      display: block;
      max-width: 50vw;
    }
    .login {
      margin: 0 0.1rem;
      width: 0.8rem;
    }
  }
}
</style>