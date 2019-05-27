<template>
  <div class="shopList">
    <div class="title">
      <span class="icon-wrapper">
        <svg class="icon-icon-" aria-hidden="true">
          <use xlink:href="#icon-icon-"></use>
        </svg>
      </span>
      <span class="shop-title">附近商家</span>
    </div>
    <ul>
      <router-link to="/shop" tag="li" v-for="(item,index) in shopList" :key="index" class="shops clearfix">
        <img :src="item.imgSrc" alt>
        <div class="shop-detail">
          <h1>
            <span class="tips">品牌</span>
            {{item.title}}
          </h1>
          <p class="rating">
            <span class="score">{{item.score}}</span>
            月售{{item.number}}单
          </p>
          <p class="send">
            <span>￥{{item.miniPrice}}</span>
            / 配送费约￥{{item.sendPrice}}
          </p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "shopList",
  data() {
    return {
      shopList: [
        {
          imgSrc: "https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg",
          title: "嘉和一品",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/2.jpg",
          title: "jaz奶茶",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/3.jpg",
          title: "考拉蛋糕",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/4.jpg",
          title: "闪电哥哥",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/4.jpg",
          title: "闪电哥哥",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/4.jpg",
          title: "闪电哥哥",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/4.jpg",
          title: "闪电哥哥",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        },
        {
          imgSrc: "./img/shop/4.jpg",
          title: "闪电哥哥",
          score: 4.7,
          number: 106,
          miniPrice: 20,
          sendPrice: 5
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.shopList {
  margin-top: 0.2rem;
  background-color: #fefefe;
  .title {
    padding-left: 0.1rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.16rem;
    color: #858585;
    border-bottom: 1px solid #dadada;
    background-color: #fefefe;
    position: sticky;
    top: 0px;
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .icon-icon- {
      width: 0.22rem;
      height: 0.22rem;
      vertical-align: middle;
    }
    .shop-title {
      vertical-align: middle;
    }
  }
  li.shops {
    height: 0.9rem;
    border-bottom: 1px solid #f9f9f9;
    padding: 0.05rem;
    img {
      width: 0.9rem;
      height: 0.9rem;
      float: left;
    }
    .shop-detail {
      float: right;
      width: calc(100% - 0.9rem);
      box-sizing: border-box;
      padding: 0.1rem;
      h1 {
        font-size: 0.18rem;
        font-weight: bold;
        span {
          font-size: 0.12rem;
          background-color: #e7ff5e;
          display: inline-block;
          padding: 0.02rem;
        }
      }
      p.rating {
        margin-top: 0.2rem;
        font-size: 0.14rem;
        span.score {
          color: #fc8d26;
        }
      }
      p.send {
        margin-top: 0.1rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>