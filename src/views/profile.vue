<template>
  <div class="profile">
    <!-- 头部 -->
    <nav-bar />

    <!-- banner -->
    <img class="bannerimg" src="@/assets/imgs/bannerTop.png" alt />

    <!-- 信息部分 -->
    <detail :userInfo="model" />
  </div>
</template>

<script>
import NavBar from "@/components/content/profile/NavBar";
import Detail from "@/components/content/profile/Detail";

export default {
  name: "Profile",
  data() {
    return {
      model: {}
    };
  },
  components: {
    NavBar,
    Detail
  },
  created() {
    this.ProfileData();
  },
  methods: {
    async ProfileData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      // console.log(res);
      this.$bus.$emit("models", this.model);
    }
  }
};
</script>

<style lang='less' scoped>
.profile {
  .bannerimg {
    height: 34.667vw;
    width: 100vw;
  }
}
</style>