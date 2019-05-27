<template>
  <div class="shop-cart">
    <div class="shopCart-wrapper">
      <i class="cubeic-mall" :class="{active:totalCount}" @click="showList()">
        <span class="count" v-if="totalCount">{{totalCount}}</span>
      </i>
      <div class="price">
        ￥{{totalPrice}}
        <p>配送费 ￥{{info.deliveryPrice}}元</p>
      </div>
      <div class="deliver" :class="{pay : payClass == 'enough'}">{{payText}}</div>
    </div>
    <transition name="move">
      <div class="list-content" v-show="listShow">
        <h2 class="title">
          购物车
          <div @click="clearCart" class="clear">清空</div>
        </h2>
        <div class="scroll-wrapper">
          <ul>
            <li v-for="(food,index) in cartFoods" :key="index">
              <div class="name ellipsis">{{food.name}}</div>
              <div class="food-price">￥{{food.price}}元</div>
              <cart-control :food="food"></cart-control>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="list-mask" @click="showList" v-show="listShow"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import cartControl from "./cartControl";
import BScroll from "better-scroll";

export default {
  name: "shopCart",
  data() {
    return {
      isShow: false
    };
  },
  components: {
    cartControl
  },
  methods: {
    showList() {
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
    },
    clearCart() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-important",
        title: "确认清空购物车？",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          this.$store.dispatch("clearFoodCount");
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "清除成功"
          }).show();
        },
        onCancel: () => {}
      }).show();
    }
  },
  computed: {
    ...mapState(["cartFoods", "info"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice == 0) {
        return `￥${minPrice}起送`;
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    listShow() {
      if (this.totalCount == 0) {
        this.isShow = false;
        return false;
      }

      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(".scroll-wrapper", {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }

      return this.isShow;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/mixin.scss";

.shop-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 0.6rem;
  .shopCart-wrapper {
    position: fixed;
    z-index: 52;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 0.5rem;
    background-color: #434b68;
    font-size: 0.14rem;
    color: #fefefe;
    .cubeic-mall {
      font-size: 0.3rem;
      color: #a5a5a5;
      background: #596077;
      padding: 0.11rem 0.105rem 0.07rem 0.075rem;
      border-radius: 50%;
      position: absolute;
      top: -0.1rem;
      left: 0.2rem;
      border: 5px solid #434b68;
      .count {
        width: 0.24rem;
        height: 0.16rem;
        position: absolute;
        right: -0.02rem;
        top: -0.02rem;
        color: #fefefe;
        background-color: #e02c2c;
        border-radius: 0.08rem;
        font-size: 0.12rem;
        line-height: 0.16rem;
        text-align: center;
        font-weight: bolder;
        box-shadow: #424242 0.015rem 0.02rem 0.03rem;
      }
      &.active {
        color: #f8f8f8;
        background-color: #19b4b9;
      }
    }
    .price {
      height: 100%;
      position: absolute;
      left: 0.9rem;
      width: 1.5rem;
      padding-top: 0.1rem;
      font-size: 0.16rem;
      font-weight: bolder;
      p {
        font-size: 0.14rem;
        margin-top: 0.05rem;
        color: #a5a5a5;
      }
    }
    .deliver {
      position: absolute;
      text-align: center;
      top: 0;
      right: 0;
      width: 1.2rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-weight: bold;
      background-color: #596077;
    }
    .pay {
      background-color: #19b4b9;
    }
  }
  .list-content {
    position: absolute;
    z-index: 51;
    height: 3rem;
    width: 100%;
    top: 0.1rem;
    left: 0;
    background-color: #f3f3f3;
    color: #424242;
    transform: translateY(-100%);
    &.move-enter-active, &.move-leave-active{
      transition:transform 0.3s;
    }
    &.move-enter, &.move-leave-to{
      transform: translateY(0);
    }
    .scroll-wrapper {
      height: 3rem;
      overflow: hidden;
    }
    ul {
      font-size: 0.14rem;
    }
    .title {
      text-indent: 0.2rem;
      font-size: 0.16rem;
      line-height: 0.4rem;
      @include bottom-border-1px(#c0c0c0);
      position: relative;
      .clear {
        position: absolute;
        right: 0.05rem;
        top: 0.05rem;
        background-color: #e02c2c;
        color: #fefefe;
        text-align: center;
        width: 0.8rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-indent: 0;
        border-radius: 0.05rem;
        &:active {
          background-color: #a71414;
        }
      }
    }
    li {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 0 0.2rem;
      height: 0.4rem;
      align-items: center;
      @include bottom-border-1px(#c0c0c0);
      .name {
        width: 1.3rem;
      }
      .food-price {
        width: 0.5rem;
      }
      .cartControl {
        position: inherit;
        right: 0;
        bottom: 0;
      }
    }
  }
  .list-mask {
    position: fixed;
    z-index: 50;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #999999;
    opacity: 0.5;
  }
}
</style>