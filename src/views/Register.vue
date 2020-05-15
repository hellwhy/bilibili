<template>
  <div class="register">
    <!-- 注册头部 -->
    <login-top class="top">
      <div slot="center">注册bilibili</div>
      <div @click="$router.push('./login')" slot="left" style="font-size:3.733vw">返回</div>
    </login-top>

    <!-- 注册表单 -->
    <login-text lable="昵称" placeholder="请输入昵称" type="text" @TextClick="res=> model.name = res" />
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

    <!-- 注册按钮 -->
    <login-btn btn="注册" color="#ff9db5" size="large" @registerAjax="registerAjax" />
  </div>
</template>

<script>
import LoginTop from "@/components/common/login/LoginTop";
import LoginText from "@/components/common/login/LoginText";
import LoginBtn from "@/components/common/login/LoginBtn";

export default {
  name: "Register",
  data() {
    return {
      model: {
        name: "",
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

      let name = rulg.test(this.model.name);
      let username = rulg.test(this.model.username);
      let password = rulg.test(this.model.password);

      if (name && username && password) {
        const res = await this.$http.post("/register", this.model);

        if (res.data.code === 200) {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.objtoken);

          setTimeout(() => {
            this.$router.push("/profile");
          }, 1000);
        }
        this.$msg.fail(res.data.msg);
      } else {
        this.$msg.fail("格式错误,请重新输入");
      }
    }
  }
};
</script>

<style lange='less' scoped>
.top {
  font-size: 4.267vw;
  background-color: #fff;
}
</style>