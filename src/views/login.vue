<template>
  <div class="login">
    <i class="cubeic-back" @click="goBack"></i>
    <h1>硅谷外卖</h1>
    <p>
      <span :class="{active:isMessage}" @click="changeLogin(true)">短信登录</span>
      <span :class="{active:!isMessage}" @click="changeLogin(false)">密码登录</span>
    </p>
    <div v-show="isMessage">
      <cube-input v-model="user" type="phone" placeholder="手机号"></cube-input>
      <cube-input v-model="randomNumber" placeholder="验证码"></cube-input>
      <div class="tips">
        温馨提示：未注册硅谷外卖账号的手机号，登录时将自动注册，且代表已同意
        <span>《用户服务协议》</span>
      </div>
    </div>
    <div v-show="!isMessage">
      <cube-input v-model="user" placeholder="手机/邮箱/用户名"></cube-input>
      <cube-input v-model="pwd" type="password" placeholder="密码" :eye="eye"></cube-input>
      <div class="captcha">
        <cube-input v-model="code" placeholder="验证码" class="captcha-input"></cube-input>
        <span v-html="vcode" @click="getCaptcha"></span>
      </div>
    </div>

    <cube-button @click="login">登录</cube-button>
  </div>
</template>

<script>
import { reqPwdLogin, queryCaptcha } from "../api/index";

export default {
  name: "login",
  mounted() {
    this.getCaptcha();
  },
  data() {
    return {
      user: "",
      pwd: "",
      code: "",
      vcode: "",
      rightCode:"",
      randomNumber: "",
      eye: true,
      isMessage: false
    };
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.user);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeLogin(type) {
      this.user = "";
      this.pwd = "";
      this.code = "";
      this.randomNumber = "";
      if (type) {
        this.isMessage = true;
      } else {
        this.isMessage = false;
      }
    },
    async getCaptcha() {
      let result = await queryCaptcha();
      this.vcode = result.data.data;
      this.rightCode = result.data.text;
    },
    async login() {
      if (this.isMessage) {
        const { user, randomNumber, rightPhone } = this;
        if (!rightPhone) {
          this.$createDialog({
            type: "alert",
            title: "请输入正确电话号码",
            icon: "cubeic-important"
          }).show();
          return;
        } else if (!/^\d{6}$/.test(randomNumber)) {
          this.$createDialog({
            type: "alert",
            title: "请输入正确验证码",
            icon: "cubeic-important"
          }).show();
          return;
        }
      } else {
        let { user, code, pwd, rightCode, rightPhone,getCaptcha } = this;
        if (!rightPhone) {
          this.$createDialog({
            type: "alert",
            title: "请输入正确电话号码",
            icon: "cubeic-important"
          }).show();
          return;
        }
        if (code.toLowerCase() != rightCode.toLowerCase()) {
          this.$createDialog({
            type: "alert",
            title: "请输入正确验证码",
            icon: "cubeic-important"
          }).show();
          getCaptcha()
          return;
        }
        console.log(code,rightCode);
        //发送密码登录请求
        let result = await reqPwdLogin({user,pwd});
        if (result.status == "success") {
            let userInfo = {
               userName: result.data.user
            };
            //保存到vuex中
            this.$store.dispatch('recordUser',userInfo);
            console.log(this.$store.state.userInfo.userName);
            this.$router.replace('/my');
        } else {
            let msg = result;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #fefefe;
  position: relative;
  .cubeic-back {
    position: absolute;
    font-size: 0.25rem;
    padding: 0.1rem 0.05rem;
    color: #7e8c8d;
  }
  h1 {
    font-size: 0.4rem;
    font-weight: bolder;
    color: #19b4b9;
    text-align: center;
    padding-top: 1rem;
    margin-bottom: 0.2rem;
  }
  p {
    text-align: center;
    margin: 0 0.1rem;
    span {
      margin: 0 0.1rem;
      display: inline-block;
      line-height: 0.2rem;
      &.active {
        border-bottom: 2px solid #1dd3da;
        color: #1dd3da;
      }
    }
  }
  .cube-input {
    width: 80%;
    margin: 0.15rem auto;
  }
  .cube-input_active::after {
    border-color: #1dd3da;
  }
  .captcha {
    position: relative;
    width: 80%;
    margin: 0 auto;
    .captcha-input{
        width: 65%;
        margin-left: 0;
    }
    span {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
  button {
    width: 80%;
    margin: 0 auto;
    height: 0.4rem;
    background-color: #1dd3da;
    color: #fefefe;
    font-size: 0.14rem;
    padding: 0;
    &:active {
      background-color: #19b4b9;
    }
  }
  .tips {
    font-size: 0.12rem;
    width: 80%;
    color: #7e8c8d;
    margin: 0 auto 0.1rem;
    span {
      color: #1dd3da;
    }
  }
}
</style>