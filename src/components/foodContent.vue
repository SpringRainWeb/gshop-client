<template>
  <transition name="fade">
    <div class="food" v-if="isShow">
      <div class="mask"></div>
      <div class="food-detail">
        <i class="cubeic-back" @click="isShow = !isShow"></i>
        <img v-lazy="food.image" alt>
        <div class="food-content">
          <p class="info ellipsis">{{food.info}}</p>
          <h2 class="name">{{food.name}}</h2>
          <p class="desc">月销{{food.sellCount}} 好评率{{food.rating}}%</p>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <cart-control :food="food"></cart-control>
      </div>
    </div>
  </transition>
</template>

<script>
import cartControl from "./cartControl";

export default {
  name: "foodContent",
  data() {
    return {
      isShow: false
    };
  },
  components: {
    cartControl
  },
  props: ["food"],
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="scss" scoped>
.food {
  z-index: 103;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  .mask {
    height: 100%;
    width: 100%;
    background-color: #999999;
    opacity: 0.5;
  }
  .food-detail {
    border-radius: 0.08rem;
    box-shadow: #7e7e7e 0 0 0.05rem;
    background-color: #fefefe;
    position: absolute;
    width: 3rem;
    height: 4rem;
    top: 50%;
    left: 50%;
    margin-top: -2rem;
    margin-left: -1.5rem;
    color: #999999;
    overflow: hidden;
    .cubeic-back {
      z-index: 1;
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
      font-size: 0.25rem;
      color: #fefefe;
    }
    img {
      width: 3rem;
      height: 3rem;
      position: absolute;
      top: 0;
      left: 0;
    }
    .food-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      font-size: 0.14rem;
      box-sizing: border-box;
      padding-left: 0.2rem;
      .info {
        position: absolute;
        top: -0.2rem;
        left: 0.1rem;
        color: #fefefe;
      }
      .name {
        margin: 0.1rem 0 0.05rem;
        font-size: 0.18rem;
        color: #424242;
      }
      .price {
        margin-top: 0.2rem;
        .now {
          color: rgb(228, 35, 35);
          font-size: 0.16rem;
        }
        .old {
          text-decoration: line-through;
        }
      }
    }
  }
}

.food.fade-enter-active,
.food.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.food.fade-enter,
.food.fade-leave-to {
  opacity: 0;
}
</style>