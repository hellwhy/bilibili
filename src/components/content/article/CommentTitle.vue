<template>
  <div class="comment">
    <p class="comment_title">
      <span>评论</span>
      <span>(233333)</span>
    </p>
    <div class="comment_info" v-if="myuser">
      <img :src="myuser.user_img" />
      <input ref="text" type="text" placeholder="说点什么吧" />
      <button @click="commit">龙门粗口</button>
    </div>
    <div class="infofalse" v-else>
      <p>舰长大人 登陆后才能评论哦 ヾ(≧▽≦*)o</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      myuser:[]
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.myUserinfo();
    }
  },
  methods: {
    async myUserinfo() {
      const res = await this.$http.get(`/user/${localStorage.getItem("id")}`);
      this.myuser = res.data[0];
    },
    commit() {
      if (this.$refs.text.value.trim()) {
        console.log(this.$refs.text.value);
      } else {
        console.log("请先输入");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.comment {
  padding: 5.333vw 2.667vw;
  .comment_title {
    margin-bottom: 3.2vw;
    span:nth-child(2) {
      color: #aaa;
      margin-left: 2.133vw;
    }
  }
  .comment_info {
    display: flex;
    align-content: center;
    img {
      width: 7.667vw;
      height: 7.667vw;
      border-radius: 50%;
      vertical-align: middle;
    }
    input {
      padding: 0 30px 0 18px;
      background-color: #f4f4f4;
      border-radius: 4vw;
      margin: 0 4vw;
      font-size: 3.2vw;
    }
    button {
      border: 0;
      padding: 0 2.667vw;
      border-radius: 4vw;
      color: #fff;
      background-color: #fb7299;
      font-size: 3.2vw;
    }
  }
  .infofalse {
    padding: 5.333vw;
    color: #fb7299;
    text-align: center;
    font-size: 3.733vw;
  }
}
</style>