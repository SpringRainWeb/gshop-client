<template>
  <div class="shopList">
    <div class="title">
      <span><i class="cubeic-more"></i></span><span> 附近商家</span>
    </div>
    <ul>
      <li v-for="(item,index) in shopList" :key="index" class="shops clearfix">
        <img :src="item.imgSrc" alt="">
        <div class="shop-detail">
          <h1><span class="tips">品牌</span> {{item.title}}</h1>
          <p class="rating"><span class="score">  {{item.score}}</span> 月售{{item.number}}单</p>
          <p class="send"><span>￥{{item.miniPrice}}</span> / 配送费约￥{{item.sendPrice}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'shopList',
  data() { 
    return {
      shopList:[
        {
          imgSrc: './img/shop/1.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/2.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/3.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/4.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/4.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/4.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/4.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
        {
          imgSrc: './img/shop/4.jpg',
          title: '闪电哥哥',
          score: 4.7,
          number: 106,
          miniPrice:20,
          sendPrice:5
        },
      ]
    }
  }
 }
</script>

<style lang="scss" scoped>
  .shopList{
    margin-top: 0.2rem;
    background-color: #fefefe;
    .title{
      padding-left: 0.1rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.16rem;
      color: #858585;
      border-bottom: 1px solid #dadada;
      background-color: #fefefe;
      position: sticky;
      top:0px;
      i{
        font-size: 0.18rem;
        vertical-align: baseline;
      }
      span{
        vertical-align: baseline;
      }
    }
    li.shops{
        height: 0.9rem;
        border-bottom: 1px solid #f9f9f9;
        padding: 0.05rem;
        img{
          width: 0.9rem;
          height: 0.9rem;
          float: left;
        }
        .shop-detail{
          float: right;
          width: calc(100% - 0.9rem);
          box-sizing: border-box;
          padding: 0.1rem;
          h1{
            font-size: 0.18rem;
            font-weight: bold;
            span{
              font-size: 0.12rem;
              background-color: #e7ff5e;
              display: inline-block;
              padding: 0.02rem;

            }
          }
          p.rating{
            margin-top: 0.2rem;
            font-size: 0.14rem;
            span.score{
              color: #fc8d26;
            }
          }
          p.send{
            margin-top: 0.1rem;
            font-size: 0.12rem;
          }
        }
      }
  }
</style>