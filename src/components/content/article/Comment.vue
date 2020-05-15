<template>
  <div class="comment">
    <div class="contentbox">
      <div class="commentitem">
        <div class="userimg">
          <img src="@/assets/imgs/headimg.jpg" alt srcset />
        </div>
        <div class="content">
          <p>
            <span>蜡笔</span>
            <span>4-21</span>
          </p>
          <div class="ctext"></div>
        </div>
      </div>
    </div>
    <div>11111111111111</div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {};
  },
  created() {
    this.commentData();
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 2.667vw 2.667vw;
  .contentbox {
    border-bottom: 0.267vw solid #e7e7e7;
    .commentitem {
      display: flex;
      padding: 2.667vw 0;
      .userimg {
        margin-right: 2.667vw;
        img {
          width: 9.333vw;
          height: 9.333vw;
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        p {
          font-size: 4vw;
          color: #555;
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .ctext {
          font-size: 13px;
        }
      }
    }
  }
}
</style>