<template>
  <div class="shop-goods">
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="menuUl">
          <li
            v-for="(good,index) in goods"
            :key="index"
            @click="clickMenuItem(index)"
            :class="{current:index == currentIndex}"
          >
            <span class="goods-name">
              <img v-lazy="good.icon" v-if="good.icon" alt>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li v-for="(good,index) in goods" :key="index" class="food-list-hock">
            <p class="title">{{good.name}}</p>
            <ul class="goods-list">
              <li v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <img v-lazy="food.icon" alt>
                <div class="content">
                  <h2 class="name ellipsis">{{food.name}}</h2>
                  <p class="desc ellipsis" v-if="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <cart-ctrl :food="food"></cart-ctrl>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <food-content :food="food" ref="food"></food-content>
    <shop-cart></shop-cart>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import cartCtrl from "../../components/cartControl";
import foodContent from "../../components/foodContent";
import shopCart from "../../components/shopCart";




export default {
  name: "shop-goods",
  data() {
    return {
      scrollY: 0,
      tops: [],
      food: {} //需要显示的food
    };
  },
  components: {
    cartCtrl,
    foodContent,
    shopCart
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(".menu-wrapper", {
        click: true
      });
      this.foodScroll = new BScroll(".foods-wrapper", {
        probeType: 2,
        click: true,
        swipeTime: 1000
      });

      this.foodScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
      this.foodScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
        const { scrollY, tops } = this;
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1];
        });
        const list = this.$refs.menuUl.children;
        this.menuScroll.scrollToElement(list[index], 300);
      });
    },
    _initTops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      const list = this.$refs.foodsUl.children;

      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    },
    clickMenuItem(index) {
      const scrollY = this.tops[index];
      this.scrollY = scrollY;
      this.foodScroll.scrollTo(0, -scrollY, 300);
    },
    showFood(food) {
      this.food = food;
      this.$refs.food.toggleShow();
    }
  },
  computed: {
    ...mapState(["goods"]),
    currentIndex() {
      const { scrollY, tops } = this;
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      return index;
    }
  },
  mounted() {
    this.$store.dispatch("receiveGoods", () => {
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.goods {
  width: 100vw;
  font-size: 0.14rem;
  position: absolute;
  top: 2.32rem;
  bottom: 0.4rem;
  overflow: hidden;
  display: flex;
  .menu-wrapper {
    width: 26vw;
    li {
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0 0.1rem;
      text-align: center;
      .goods-name {
        display: inline-block;
        width: 100%;
        @include bottom-border-1px(#b8b8b8);
      }

      img {
        width: 0.14rem;
        height: 0.14rem;
        vertical-align: middle;
      }
    }
    .current {
      background-color: #fefefe;
    }
  }
  .foods-wrapper {
    width: 74vw;

    .title {
      background-color: #e9e9e9;
      color: #8f8f8f;
      padding-left: 0.2rem;
      line-height: 0.3rem;
    }
    .goods-list {
      background-color: #fefefe;
      li {
        padding: 0.2rem 0.1rem;
        margin: 0 0.1rem;
        overflow: hidden;
        @include bottom-border-1px(#e9e9e9);
        img {
          width: 0.6rem;
          height: 0.6rem;
          float: left;
          margin-right: 0.1rem;
        }
        .content {
          float: left;
          width: calc(100% - 0.7rem);
          .name {
            font-size: 0.16rem;
          }
          .desc {
            color: #8f8f8f;
            margin: 0.08rem 0;
          }
          .extra {
            color: #8f8f8f;
            margin: 0.06rem 0;
          }
          .price {
            .now {
              color: rgb(228, 35, 35);
              font-size: 0.16rem;
            }
            .old {
              color: #8f8f8f;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>