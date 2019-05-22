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
            imgSrc: "./img/nav/2.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/3.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/4.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/5.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/6.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/7.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/8.jpg",
            title: "甜品饮品"
          }
        ],
        [
          {
            imgSrc: "./img/nav/9.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/10.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/11.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/12.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/13.jpg",
            title: "甜品饮品"
          },
          {
            imgSrc: "./img/nav/14.jpg",
            title: "甜品饮品"
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