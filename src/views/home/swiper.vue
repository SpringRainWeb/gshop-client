<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in shopList" :key="index">
          <div class="shopDetail" v-for="(v,i) in item" :key="i">
              <img :src="v.imgSrc" alt="">
              <span>{{v.title}}</span>
          </div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "swiper",
  data() {
    return {
      shopList: [
        [
          {
            imgSrc: "./img/nav/1.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/4.jpg",
            title: "商超便利"
          },
          {
            imgSrc: "./img/nav/3.jpg",
            title: "美食"
          },
          {
            imgSrc: "./img/nav/2.jpg",
            title: "简餐"
          },
          {
            imgSrc: "./img/nav/12.jpg",
            title: "新店特惠"
          },
          {
            imgSrc: "./img/nav/5.jpg",
            title: "准时达"
          },
          {
            imgSrc: "./img/nav/7.jpg",
            title: "预订早餐"
          },
          {
            imgSrc: "./img/nav/8.jpg",
            title: "土豪推荐"
          }
        ],
        [
          {
            imgSrc: "./img/nav/9.jpg",
            title: "川湘菜"
          },
          {
            imgSrc: "./img/nav/10.jpg",
            title: "麻辣烫"
          },
          {
            imgSrc: "./img/nav/11.jpg",
            title: "包子粥店"
          },
          {
            imgSrc: "./img/nav/6.jpg",
            title: "鲜花蛋糕"
          },
          {
            imgSrc: "./img/nav/13.jpg",
            title: "日韩料理"
          },
          {
            imgSrc: "./img/nav/14.jpg",
            title: "果蔬生鲜"
          }
        ]
      ]
    };
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      direction: "horizontal", // 垂直切换选项
      loop: false, // 循环模式选项
      speed:300,
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 2.3rem;
  background-color: #fefefe;
  .swiper-slide{
      box-sizing: border-box;
      padding: 9.5px;
      .shopDetail{
          float: left;
          width: 79px;
          margin: 5px;
          font-size: 0.12rem;
          text-align: center;
          img{
              width: 90%;
          }
      }

  }
}
</style>