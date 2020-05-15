<template>
  <div class="nav">
    <div class="left" @click="$route.path == '/home' ? '' : $router.push('/home')">
      <img src="@/assets/imgs/bilibili.png" />
    </div>
    <div class="center">
      <p>
        Search
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div class="right">
      <div @click="$route.path == '/profile' ? '' : $router.push('/profile')">
        <img :src="model.user_img" v-if="model.user_img" />
        <img src="@/assets/imgs/headimg.jpg" v-else />
      </div>
      <a
        href="http://d.bilibili.com/download_app.html?preUrl=http%3A%2F%2Fm.bilibili.com%2Findex.html&amp;schema=bilibili%3A%2F%2Fhome%3Ftab_name%3D%E7%83%AD%E9%97%A8&amp;"
      >下载App</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ["userInfo"],
  data() {
    return {
      model : {}
    }
  },
  async created() {
    const res = this.$http.get('/user/' + localStorage.getItem('id'))
    this.model = res
  }
};
</script>

<style lang='less' scoped>
.nav {
  height: 12vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .left {
    width: 21.333vw;
    text-align: center;
    img {
      width: 85%;
      vertical-align: middle;
    }
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    p {
      width: 100%;
      border-radius: 3.467vw;
      line-height: 6.4vw;
      height: 6.4vw;
      font-size: 3.467vw;
      padding-left: 7.467vw;
      color: rgb(170, 170, 170);
      margin: 0 2.667vw;
      background-color: #f4f4f4;
      position: relative;

      .ipt-icon {
        position: absolute;
        font-size: 4.8vw;
        left: 2.667vw;
        top: 50%;
        transform: translate(0, -50%);
        color: #aaa;
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    div>img {
      width: 7.467vw;
      height: 7.467vw;
      vertical-align: middle;
      border-radius: 50%;
    }
    a {
      padding: 1.333vw 2.667vw;
      color: #fff;
      font-size: 3.467vw;
      text-align: center;
      border-radius: 1.067vw;
      margin: 0 2.133vw;
      background-color: #fb7299;
    }
  }
}
</style>