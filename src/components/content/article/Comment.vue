<template>
  <div class="comment">
    <div class="contentbox" v-if="content.length">
      <div class="commentitem" v-for="(item,index) in content" :key="index">
        <div class="userimg">
          <img :src="item.userinfo.user_img" v-if="item.userinfo.user_img" />
          <img src="@/assets/imgs/headimg.jpg" v-else />
        </div>
        <div class="content">
          <p>
            <span>{{ item.userinfo.name }}</span>
            <span>{{ item.comment_date }}</span>
          </p>
          <div class="ctext">{{ item.comment_content }}</div>
        </div>
      </div>
    </div>
    <div class="contentnull" v-else>暂时没有评论，快来抢沙发吧</div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      content: []
    };
  },
  created() {
    this.commentData();
  },
  methods: {
    // 评论数据改造后渲染页面
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      // console.log(res);
      this.content = res.data.filter((item, index) => {
        return item.parent_id == null;
      });
      this.$bus.$emit('contentLength',this.content.length)
    }
  },
  watch:{
    content() {
      this.commentData()
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 2.667vw 2.667vw;
  .contentbox {
    .commentitem {
      display: flex;
      padding: 2.667vw 0;
      border-bottom: 0.267vw solid #e7e7e7;
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
          font-size: 3.2vw;
        }
      }
    }
  }
  .contentnull {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 16px;
    padding: 5.333vw;
    color: #fb7299;
  }
}
</style>