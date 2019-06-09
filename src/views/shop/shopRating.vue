<template>
  <div class="shop-rating" ref="ratings">
    <div class="shop-rating-wrapper">
      <div class="rating-wrapper">
        <div class="rating-left">
          <div class="big-rating">{{info.score}}</div>
          <p class="base-rating">综合评分</p>
          <p class="gray-word">高于周边商家{{info.rankRate}}%</p>
        </div>
        <div class="rating-right">
          <div class="star-rating">
            <cube-rate v-model="info.serviceScore" :disabled="true"></cube-rate>
            <span class="star-detail">
              服务态度
              <span class="star-num">{{info.serviceScore}}</span>
            </span>
          </div>
          <div class="star-rating">
            <cube-rate v-model="info.score" :disabled="true"></cube-rate>
            <span class="star-detail">
              商品评分
              <span class="star-num">{{info.score}}</span>
            </span>
          </div>
          <div class="delivery">
            送达时间：
            <span class="gray-word">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="message-wrapper">
        <div class="msg-title">
          <div class="msg-btn">
            <div :class="{'active':selectType == 2}" @click="selectType = 2">全部({{ratings.length}})</div>
            <div :class="{'active':selectType == 0}" @click="selectType = 0">满意({{satisfiedRate}})</div>
            <div
              :class="{'active':selectType == 1}"
              @click="selectType = 1"
            >不满意({{ratings.length - satisfiedRate}})</div>
          </div>
          <cube-checkbox v-model="onlyShowText">只看有内容的评价</cube-checkbox>
        </div>
        <ul class="msg-list">
          <li v-for="(rating,index) in showList" :key="index">
            <div class="content-wrapper clearfix">
              <img v-lazy="rating.avatar" alt>
              <div class="rating-content">
                <h1 class="username">
                  {{rating.username}}
                  <span class="rate-time">{{rating.rateTime | dateFormat}}</span>
                </h1>
                <p class="rate-star">
                  <cube-rate v-model="rating.score" :disabled="true"></cube-rate>
                  <span>
                    {{rating.deliveryTime}}
                    <span v-if="rating.deliveryTime">min</span>
                  </span>
                </p>
                <p class="rate-text">{{rating.text}}</p>
                <div class="rate-tags">
                  <i
                    :class="{
                  'cubeic-good':rating.rateType == 0 ? true : false,
                  'cubeic-bad' :rating.rateType == 1 ? true : false,
                  
                  }"
                  ></i>
                  <span v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  name: "shop-rating",
  data() {
    return {
      selectType: 2, // 0满意  1 不满意   2 全部
      onlyShowText: false,
      list: true
    };
  },
  methods: {
    _initScroll() {
      this.listScroll = new BScroll(this.$refs.ratings, {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
        //          pullDownRefresh: false, //关闭下拉
        //          pullUpLoad: false, // 关闭上拉
        click: true,
        probeType: 3,
        startY: 0,
        scrollbar: false
      });
      this.listScroll.on("pullingDown", () => {
        const toast = this.$createToast({
          txt: "Loading...",
          mask: true
        });
        toast.show();
        this.$store.dispatch("receiveRatings");
        this.listScroll.finishPullDown();
        this.listScroll.refresh();
        setTimeout(() =>{
          toast.hide();
        },1000)
        
      });
      this.listScroll.on("pullingUp", () => {
        const toast = this.$createToast({
          txt: "Loading...",
          mask: true
        });
        toast.show();
        setTimeout(() => {
          this.$store.dispatch("addRatings");
          this.listScroll.finishPullUp();
          this.listScroll.refresh();
          setTimeout(() => {
            toast.hide();
            this.listScroll.scrollTo(0, this.listScroll.maxScrollY, 500);
          },150);
        }, 1000);
      });
    }
  },
  computed: {
    ...mapState(["info", "ratings"]),
    ...mapGetters(["satisfiedRate"]),
    showList() {
      const { selectType, onlyShowText, ratings } = this;
      return ratings.filter(rating => {
        const { rateType, text } = rating;

        //selectType == 2  或 rateType == selectType  还要满足  onlyShowText ==true
        //
        return (
          (selectType == 2 || rateType == selectType) &&
          (!onlyShowText || text.length > 0)
        );
      });
    }
  },
  mounted() {
    this.$store.dispatch("receiveRatings", () => {
      this.$nextTick(() => {
        this._initScroll();
      });
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.shop-rating {
  font-size: 0.12rem;
  height: calc(100vh - 2.32rem);
  width: 100%;
  position: relative;
  overflow: hidden;
  .rating-wrapper {
    height: 1.2rem;
    background-color: #fefefe;
    @include bottom-border-1px(#aaaaaa);
    overflow: hidden;
    .rating-left {
      float: left;
      height: 0.8rem;
      text-align: center;
      width: 36vw;
      box-sizing: border-box;
      margin: 0.2rem 0;
      border-right: 2px solid #dadada;
      padding-top: 0.1rem;
      .big-rating {
        font-size: 0.28rem;
        font-weight: bold;
        color: #fcbf3a;
      }
      .base-rating {
        line-height: 0.3rem;
      }
      .gray-word {
        color: #aaaaaa;
      }
    }
    .rating-right {
      float: left;
      width: 64vw;
      height: 0.8rem;
      margin: 0.2rem 0;
      padding-top: 0.1rem;
      .star-rating {
        text-align: center;
        margin-bottom: 0.1rem;
        .cube-rate {
          width: 1rem;
          vertical-align: bottom;
        }
        .star-detail {
          display: inline-block;
          width: 1rem;
          .star-num {
            color: #fcbf3a;
          }
        }
      }
      .delivery {
        margin-left: 0.2rem;
        .gray-word {
          color: #aaaaaa;
        }
      }
    }
  }
  .message-wrapper {
    @include top-border-1px(#aaaaaa);
    margin-top: 0.2rem;
    background-color: #fefefe;
    .msg-title {
      padding: 0.15rem 0.15rem 0;
      font-size: 0.14rem;
      .msg-btn {
        display: flex;
        width: 75vw;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        div {
          padding: 0.1rem 0.15rem;
          background-color: #dbdbdb;
          color: #424242;
        }
        .active {
          background-color: #1dd3da;
          color: #fefefe;
        }
      }
      .cube-checkbox {
        padding: 0;
      }
    }
    .msg-list {
      @include top-border-1px(#aaaaaa);
      li {
        padding: 0.15rem 0.15rem;
        @include bottom-border-1px(#aaaaaa);
        .content-wrapper {
          img {
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            float: left;
          }
          .rating-content {
            float: left;
            width: calc(100% - 0.4rem);
            box-sizing: border-box;
            padding-left: 0.1rem;
            .username {
              color: #575757;
              .rate-time {
                float: right;
                color: #aaaaaa;
              }
            }
            .rate-star {
              margin: 0.05rem 0 0.1rem;
              .cube-rate {
                width: 1rem;
                vertical-align: bottom;
                margin-right: 0.1rem;
              }
              span {
                color: #aaaaaa;
              }
            }
            .rate-tags {
              margin-top: 0.1rem;
              i {
                float: left;
                font-size: 0.2rem;
                margin-right: 0.1rem;
                &.cubeic-good {
                  color: #fcbf3a;
                }
                &.cubeic-bad {
                  color: #aaaaaa;
                }
              }
              span {
                float: left;
                padding: 0.05rem 0.1rem;
                color: #aaaaaa;
                border: 1px solid #aaaaaa;
                margin: 0 0.1rem 0.1rem 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>