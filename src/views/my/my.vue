<template>
  <div class="my">
    <header-con></header-con>
    <div class="user-info">
      <i class="cubeic-person"></i>
      <p class="name" v-if="userInfo.userName">{{userInfo.userName}}</p>
      <p class="name" v-else>
        <router-link to="login">登录、注册</router-link>
      </p>
      <p class="phone">
        <i class="cubeic-mobile-phone"></i>
        {{userInfo.phone ? userInfo.phone : '暂无绑定手机号'}}
      </p>
    </div>
    <div class="discounts clearfix">
      <div class="balance">
        <span class="number balance-num">0.00</span>元
        <p>我的余额</p>
      </div>
      <div class="discount">
        <span class="number discount-num">0</span>个
        <p>我的优惠</p>
      </div>
      <div class="score">
        <span class="number score-num">0</span>分
        <p>我的积分</p>
      </div>
    </div>
    <ul class="list clearfix">
      <li>
        <i class="cubeic-tag icon"></i> 我的订单
        <i class="cubeic-arrow"></i>
      </li>
      <li>
        <i class="cubeic-hot icon"></i> 积分商城
        <i class="cubeic-arrow"></i>
      </li>
      <li>
        <i class="cubeic-vip icon"></i> 硅谷外卖会员卡
        <i class="cubeic-arrow"></i>
      </li>
      <li class="serve">
        <i class="cubeic-phone icon"></i> 服务中心
        <i class="cubeic-arrow"></i>
      </li>
    </ul>
    <cube-button v-show="userInfo.userName" @click="showBtn">退出登录</cube-button>
  </div>
</template>

<script>
import headerCon from "../../components/header";
import { mapState } from "vuex";
import { setTimeout } from 'timers';
export default {
  name: "my",
  data() {
    return {};
  },
  components: {
    headerCon
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted(){

  },
  methods:{
    showBtn() {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-important',
        title: '确定要退出吗',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          sessionStorage.clear();
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '退出成功'
          }).show()
          this.$store.dispatch('logout');
          let that = this;
          setTimeout(function(){
            that.$router.replace('/home');
          },1000)
          
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '取消退出'
          }).show()
        }
      }).show()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.my {
  font-size: 0.14rem;
  .user-info {
    background-color: #1dd3da;
    @include top-border-1px(#fefefe);
    height: 0.9rem;
    color: #fefefe;
    .cubeic-person {
      float: left;
      font-size: 0.5rem;
      background-color: #d9d9d9;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 0.2rem;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
    }
    .name {
      padding-top: 0.2rem;
      font-size: 0.2rem;
      a {
        font-weight: bolder;
        color: #fefefe;
      }
    }
    .phone {
      margin-top: 0.1rem;
      line-height: 0.2rem;
      i {
        font-size: 0.2rem;
        float: left;
      }
    }
  }
  .discounts {
    display: flex;
    justify-content: space-between;
    div {
      background-color: #fefefe;
      height: 0.6rem;
      width: 33%;
      text-align: center;
      padding: 0.15rem 0 0.05rem;
      .number {
        font-size: 0.28rem;
        font-weight: bolder;
      }
      .balance-num {
        color: #ffa742;
      }
      .discount-num {
        color: #ff5e42;
      }
      .score-num {
        color: #6bdd29;
      }
      p {
        margin-top: 0.1rem;
      }
    }
  }
  .list {
    margin-top: 0.2rem;
    li {
      height: 0.5rem;
      line-height: 0.5rem;
      padding: 0 0.1rem;
      background-color: #fefefe;
      border-bottom: 1px solid #f0f0f0;
      .cubeic-arrow {
        float: right;
        color: #d9d9d9;
      }
      .cubeic-tag {
        color: #4fa71c;
      }
      .cubeic-hot {
        color: #ff5e42;
      }
      .cubeic-vip {
        color: #ffa742;
      }
      .cubeic-phone {
        color: #4fa71c;
      }
      .icon {
        font-size: 0.2rem;
        float: left;
        margin-right: 0.1rem;
      }
    }
    .serve {
      margin-top: 0.2rem;
    }
  }
  button{
    background-color: #ff5e42;
    margin-top: 0.2rem;
    &:active{
      background-color: #db5139;
    }
  }
}
</style>