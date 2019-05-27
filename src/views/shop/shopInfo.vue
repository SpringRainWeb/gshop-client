<template>
  <div class="shop-info" ref="shopInfo">
    <div class="info-wrapper">
      <div class="delivery">
        <h1>配送信息</h1>
        <p>
          <span class="blue-word">{{info.description}}</span>
          <span>由商家提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
        </p>
        <div class="sendPrice">配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <dl class="activity-list">
        <dt>活动与服务</dt>
        <dd v-for="(item,index) in info.supports" :key="index">
          <span
            class="mini-tag"
            :style="{backgroundColor:item.type == 2 ? '#ff922b' :'#1dd3da'}"
          >{{item.name}}</span>
          <span class="activity-content ellipsis">{{item.content}}</span>
        </dd>
      </dl>
      <div class="shop-photo">
        <h1>商家实景</h1>
        <cube-slide ref="slide" :data="info.pics" :autoPlay="false" :showDots="false" :options="{scrollY:false}">
          <cube-slide-item v-for="(item, index) in info.pics" :key="index">
            <img :src="item">
          </cube-slide-item>
        </cube-slide>
      </div>
      <div class="shop-detail">
        <h1>商家信息</h1>
        <ul>
          <li><span>品类</span><span class="gray-word">{{info.category}}</span></li>
          <li><span>商家电话</span><span class="gray-word">{{info.phone}}</span></li>
          <li><span>地址</span><span class="gray-word">{{info.address}}</span></li>
          <li><span>营业时间</span><span class="gray-word">{{info.workTime}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";

export default {
  name: "shop-info",
  data() {
    return {};
  },
  computed: {
    ...mapState(["info"])
  },
  mounted() {
    new BScroll(this.$refs.shopInfo, {
      click: true,
      bounce: false
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.shop-info {
  font-size: 0.14rem;
  overflow: hidden;
  height: calc(100vh - 2.32rem);
  .delivery {
    background-color: #fefefe;
    padding: 0.16rem 0.14rem;
    @include bottom-border-1px(#aaaaaa);
    h1 {
      font-size: 0.18rem;
      font-weight: bold;
      margin-bottom: 0.14rem;
    }
    p {
      color: #aaaaaa;
      .blue-word {
        display: inline-block;
        padding: 0.04rem 0.06rem;
        border-radius: 0.03rem;
        background-color: #5fccff;
        color: #fefefe;
        margin-right: 0.1rem;
      }
    }
    .sendPrice {
      color: #aaaaaa;
      margin-top: 0.1rem;
    }
  }
  .activity-list {
    @include bottom-border-1px(#aaaaaa);
    @include top-border-1px(#aaaaaa);
    margin: 0.2rem 0;
    padding: 0.16rem 0.14rem;
    background-color: #fefefe;
    dt {
      font-size: 0.18rem;
      font-weight: bold;
      margin-bottom: 0.24rem;
    }
    dd {
      height: 0.36rem;
      .mini-tag {
        display: inline-block;
        width: 0.36rem;
        height: 0.18rem;
        line-height: 0.18rem;
        color: #fefefe;
        text-align: center;
        margin-right: 0.1rem;
        border-radius: 0.02rem;
      }
    }
  }
  .shop-photo {
    background-color: #fefefe;
    padding: 0.16rem 0.14rem;
    h1 {
      font-size: 0.18rem;
      font-weight: bold;
      margin-bottom: 0.16rem;
    }
    .cube-slide {
      width: 100%;
      height: 2rem;
      box-shadow: #aaaaaa 0 0 0.03rem;
      img {
        width: 100%;
        height: 2rem;
      }
    }
  }
  .shop-detail{
    margin-top: 0.2rem;
    @include top-border-1px(#aaaaaa);
    padding: 0.16rem 0.14rem 0;
    background-color: #fefefe;
    h1{
      font-size: 0.18rem;
      font-weight: bold;
      margin-bottom: 0.14rem;
    }
    li{
      height: 0.4rem;
      line-height: 0.4rem;
      @include bottom-border-1px(#aaaaaa);
      display: flex;
      justify-content: space-between;
      .gray-word{
        color:#aaaaaa;
      }
    }
  }
}
</style>