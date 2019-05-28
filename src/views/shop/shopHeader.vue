<template>
  <div class="shopHeader">
    <nav :style="{backgroundImage:`url(${info.bgImg})`}">
      <i class="cubeic-back" @click="goBack"></i>
    </nav>
    <div class="headerContent">
      <img v-lazy="info.avatar" alt>
      <p class="title" @click="showModel('model')">
        <span class="tip">品牌</span>
        <span class="name">
          {{info.name}}
          <i class="cubeic-pulldown"></i>
        </span>
      </p>
      <div class="shop-message">
        <span class="score">{{info.score}}</span>
        <span>月售{{info.sellCount}}单</span>
        <span>{{info.description}}</span>
        <span>约{{info.deliveryTime}}分钟</span>
        <span>距离{{info.distance}}</span>
      </div>
      <div class="discount" v-if="info.supports" @click="showModel('discount')">
        <span class="mini-tag">{{info.supports[0].name}}</span>
        <span class="activity-content ellipsis">{{info.supports[0].content}}</span>
        <span class="discount-right">
          {{info.supports.length}}个优惠
          <i class="cubeic-pulldown"></i>
        </span>
      </div>
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler"
        :showSlider="true"
      ></cube-tab-bar>
      <transition name="fade">
        <div class="model-wrapper" v-show="isShowModel">
          <div class="mask"></div>
          <div class="info-detail">
            <p class="detail-title">
              <span class="tip">品牌</span>
              <span class="name">{{info.name}}</span>
            </p>
            <div class="shop-detail">
              <div class="score">
                <p class="bolder">{{info.score}}</p>
                <p>评分</p>
              </div>
              <div>
                <p class="bolder">{{info.sellCount}}单</p>
                <p>月售</p>
              </div>
              <div>
                <p class="bolder">{{info.description}}</p>
                <p>约{{info.deliveryTime}}分钟</p>
              </div>
              <div>
                <p class="bolder">{{info.deliveryPrice}}元</p>
                <p>配送费用</p>
              </div>
              <div>
                <p class="bolder">{{info.distance}}</p>
                <p>距离</p>
              </div>
            </div>
            <div class="small-title">-- 公告 --</div>
            <div class="info-content">{{info.bulletin}}</div>
          </div>
          <div class="close" @click="closeModel">
            <i class="cubeic-close"></i>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="discount-wrapper" v-show="isDiscount">
          <div class="mask"></div>
          <div class="discount-detail">
            <i class="cubeic-close" @click="closeModel('discount')"></i>
            <p class="detail-title">优惠活动</p>
            <div class="discount-swiper">
              <ul class="discount-content">
                <li v-for="(item,index) in info.supports" :key="index">
                  <span
                    class="mini-tag"
                    :style="{backgroundColor:item.type == 2 ? '#ff922b' :'#1dd3da'}"
                  >{{item.name}}</span>
                  <span class="activity-content ellipsis">{{item.content}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";

export default {
  name: "shopHeader",
  data() {
    return {
      selectedLabelDefault: "点餐",
      tabs: [
        {
          label: "点餐"
        },
        {
          label: "评价"
        },
        {
          label: "商家"
        }
      ],
      isShowModel: false,
      isDiscount: false
    };
  },
  computed: {
    ...mapState(["info"])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$store.dispatch("clearFoodCount");
    },
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      if (label == "点餐") {
        this.$router.replace("/shop/goods");
        return;
      }
      if (label == "评价") {
        this.$router.replace("/shop/rating");
        return;
      }
      if (label == "商家") {
        this.$router.replace("/shop/info");
        return;
      }
    },
    changeHandler(label) {
      // if you clicked different tab, this methods can be emitted
    },
    chooseTag(label) {
      if (label == "/shop/goods") {
        this.selectedLabelDefault = "点餐";
        return;
      }
      if (label == "/shop/rating") {
        this.selectedLabelDefault = "评价";
        return;
      }
      if (label == "/shop/info") {
        this.selectedLabelDefault = "商家";
        return;
      }
    },
    closeModel(type) {
      if (type == "discount") {
        this.isDiscount = false;
      } else {
        this.isShowModel = false;
      }
    },
    showModel(type) {
      if (type == "discount") {
        this.isDiscount = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(".discount-swiper", {
              stopPropagation: true
            });
          }else {
            this.scroll.refresh();
          }
        });
      } else {
        this.isShowModel = true;
      }
    }
  },
  mounted() {
    let path = this.$route.path;
    this.chooseTag(path);
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.shopHeader {
  background-color: #fefefe;
  position: relative;
  nav {
    height: 0.6rem;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.6;
    i {
      position: absolute;
      top: 0.15rem;
      left: 0.1rem;
      font-size: 0.25rem;
      color: #fefefe;
    }
  }
  .headerContent {
    img {
      width: 0.8rem;
      height: 0.8rem;
      position: absolute;
      top: 0.2rem;
      left: 50%;
      margin-left: -0.4rem;
      box-shadow: #999999 0 0 0.03rem;
    }
    .title {
      font-size: 0.22rem;
      text-align: center;
      padding-top: 0.5rem;
      .tip {
        font-size: 0.12rem;
        display: inline-block;
        background-color: #fff12b;
        padding: 0.03rem;
        vertical-align: top;
      }
      .name {
        font-weight: 900;
      }
    }
    .shop-message {
      text-align: center;
      margin: 0.08rem 0;
      font-size: 0.14rem;
      span {
        display: inline-block;
        margin: 0 0.02rem;
      }
      .score {
        color: #ff922b;
        font-weight: 900;
      }
    }
    .discount {
      box-sizing: border-box;
      display: flex;
      margin: 0 auto;
      height: 0.3rem;
      border: 1px solid #d9d9d9;
      width: 80vw;
      font-size: 0.12rem;
      line-height: 0.3rem;
      padding: 0 0.05rem;
      justify-content: space-between;
      align-items: center;
      flex-flow: row nowrap;
      color: #999999;
      .mini-tag {
        display: inline-block;
        background: #ff922b;
        width: 0.3rem;
        line-height: 0.18rem;
        color: #fefefe;
        text-align: center;
      }
      .activity-content {
        width: 1.8rem;
        overflow: hidden;
      }
    }
    .cube-tab-bar {
      height: 0.4rem;
      @include bottom-border-1px(#aaaaaa);
    }
  }
}

.model-wrapper {
  z-index: 101;
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
  .info-detail {
    border-radius: 0.08rem;
    box-shadow: #7e7e7e 0 0 0.05rem;
    background-color: #fefefe;
    position: absolute;
    box-sizing: border-box;
    padding: 0.2rem 0.08rem;
    width: 3rem;
    height: 2rem;
    top: 50%;
    left: 50%;
    margin-top: -1rem;
    margin-left: -1.5rem;
    color: #999999;
    .detail-title {
      font-size: 0.18rem;
      text-align: center;
      color: #424242;
      .tip {
        font-size: 0.12rem;
        display: inline-block;
        background-color: #fff12b;
        padding: 0.02rem;
        vertical-align: top;
      }
      .name {
        font-weight: 900;
      }
    }
    .shop-detail {
      margin: 0.15rem 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      font-size: 0.12rem;
      text-align: center;

      .bolder {
        font-size: 0.16rem;
        font-weight: bolder;
        color: #424242;
        margin-bottom: 0.05rem;
      }
    }
    .small-title {
      font-size: 0.12rem;
      text-align: center;
      margin-bottom: 0.05rem;
    }
    .info-content {
      font-size: 0.12rem;
      line-height: 0.2rem;
      color: #424242;
    }
  }
  .close {
    position: absolute;
    top: calc(50% + 1.2rem);
    left: 50%;
    margin-left: -0.15rem;
    width: 0.3rem;
    height: 0.3rem;
    font-size: 0.2rem;
    text-align: center;
    line-height: 0.3rem;
    background-color: #424242;
    border-radius: 50%;
    border: 1px solid #fefefe;
    box-sizing: border-box;
    color: #fefefe;
    box-shadow: #fefefe 0 0 0.05rem;
    opacity: 0.5;
  }
}

.discount-wrapper {
  z-index: 100;
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
  .discount-detail {
    background-color: #f1f1f1;
    position: absolute;
    box-sizing: border-box;
    padding: 0.2rem 0.2rem;
    width: 100%;
    height: 2.6rem;
    bottom: 0;
    left: 0;
    color: #424242;
    .discount-swiper {
      width: 100%;
      height: 1.8rem;
      overflow: hidden;
      margin-top: 0.2rem;
    }
    i {
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      font-size: 0.2rem;
    }
    .detail-title {
      font-size: 0.2rem;
      text-align: center;
      color: #424242;
      font-weight: bold;
    }
    .discount-content {
      background-color: #fefefe;
      li {
        padding-left: 0.1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.12rem;
        .mini-tag {
          display: inline-block;
          width: 0.3rem;
          height: 0.15rem;
          line-height: 0.15rem;
          color: #fefefe;
          text-align: center;
          margin-right: 0.1rem;
        }
        .activity-content {
          width: 1.8rem;
          overflow: hidden;
        }
      }
    }
  }
}

.model-wrapper.fade-enter-active,
.model-wrapper.fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.model-wrapper.fade-enter,
.model-wrapper.fade-leave-to {
  opacity: 0;
}

.discount-wrapper.fade-enter-active,
.discount-wrapper.fade-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.discount-wrapper.fade-enter,
.discount-wrapper.fade-leave-to {
  opacity: 0;
}
</style>