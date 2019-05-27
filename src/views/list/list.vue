<template>
  <div class="list">
    <header-con></header-con>
    <div class="is-login" v-if="!userInfo.userName">
      <img src="../../../public/img/order/person.png" alt="">
      <p>登陆后查看外卖订单</p>
      <cube-button :inline='true' @click="goLogin">立即登录</cube-button>
    </div>
  </div>
</template>

<script>
import headerCon from '../../components/header'
import { mapState } from "vuex";

export default {
  name: 'list',
  data() { 
    return {
      
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  components: {
    headerCon
  },
  methods: {
    goLogin(){
      this.$router.push('login')
    }
  }
 }
</script>

<style lang="scss" scoped>
  .list{
    .is-login{
      text-align: center;
      margin-top: 10vh;
      img{
        width: 70vw;
      }
      p{
        margin-top: 5vh;
      }
      button{
        margin-top: 0.2rem;
        width: 1rem;
        height: 0.3rem;
        background-color: #1dd3da;
        color: #fefefe;
        &:active{
          background-color: #19b4b9;
        }
      }
    }
  }
</style>