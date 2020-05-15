<template>
  <div>
    <!-- 登录顶部 -->
    <login-top class="top">
      <div slot="center">登录bilibili</div>
      <div @click="$router.push('./register')" slot="right" style="font-size:3.733vw">注册</div>
    </login-top>

    <login-text
      lable="账号"
      placeholder="请输入账号"
      type="number"
      @TextClick="res=> model.username = res"
    />
    <login-text
      lable="密码"
      placeholder="请输入密码"
      type="password"
      @TextClick="res=> model.password = res"
    />

    <!-- 按钮 -->
    <login-btn btn="登录" color="#ff9db5" size="large" @registerAjax="registerAjax" />
  </div>
</template>

<script>
import LoginTop from "@/components/common/login/LoginTop";
import LoginText from "@/components/common/login/LoginText";
import LoginBtn from "@/components/common/login/LoginBtn";

export default {
  name: "Login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerAjax() {
      let rulg = /^.{6,16}$/;

      let username = rulg.test(this.model.username);
      let password = rulg.test(this.model.password);

      if (username && password) {
        const res = await this.$http.post("/login", this.model);

        if (res.data.code === 200) {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.token);

          setTimeout(() => {
            this.$router.push("/profile");
          }, 1000);
        }
        this.$msg.fail(res.data.msg);
      }else {
        this.$msg.fail('格式错误,请重新输入');
      }
    }
  }
};
</script>

<style lang='less' scoped>
.top {
  font-size: 4.267vw;
  background-color: #fff;
}
</style>