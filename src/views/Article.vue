<template>
  <div class="article" v-if="Object.keys(model).length">
    <!-- 导航 -->
    <nav-bar class="nav" />
    <div class="detailinfo">
      <!-- 视频 -->
      <div class="video">
        <video :src="model.content" controls poster="@/assets/imgs/video.jpg"></video>
      </div>

      <!-- 介绍 -->
      <div class="detailtext">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <a href="javascript:;">
            <span>
              <img src="@/assets/icons/up.png" />
              {{model.userinfo.name}}
            </span>
          </a>
          <span>144.6万次观看</span>
          <span>2333弹幕</span>
          <span>{{ model.date }}</span>
        </div>

        <!-- 点赞 投币 三连 -->
        <div>
          <span>
            <img src="@/assets/icons/dianzan.png" /> 点赞
          </span>
          <span>
            <img src="@/assets/icons/shoucang.png" />收藏
          </span>
          <span>
            <img src="@/assets/icons/download.png" />缓存
          </span>
        </div>
      </div>
    </div>
    <!-- 推荐视频 -->
    <div class="detailparent">
      <detail
        class="detailitem"
        :detailitem="item"
        v-for="(item,index) in commendList"
        :key="index"
      />
    </div>

    <!-- 评论 -->
    <comment-title />
  </div>
</template>

<script>
import NavBar from "@/components/content/profile/NavBar";
import Detail from "./Detail";
import CommentTitle from "@/components/content/article/CommentTitle";

export default {
  name: "Article",
  data() {
    return {
      model: {},
      commendList: {}
    };
  },
  components: {
    NavBar,
    Detail,
    CommentTitle
  },
  created() {
    this.ArticleData();
    this.commendData();
  },
  methods: {
    async ArticleData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    },
    async commendData() {
      const res = await this.$http.get("/commend/");
      this.commendList = res.data;
    }
  },
  watch: {
    $route() {
      this.ArticleData();
      this.commendData();
    }
  }
};
</script>

<style lang='less' scoped>
.nav {
  position: sticky;
  top: 0 !important;
  z-index: 9999;
}
.article {
  background-color: #fff;

  .detailparent {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .detailitem {
      width: 45%;
    }
  }
}
.detailinfo {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .detailtext {
    vertical-align: middle;
    padding: 4vw;
    div:nth-child(1) {
      span:nth-child(1) {
        padding: 1.333vw 2.133vw;
        margin-right: 2.667vw;
        border-radius: 3.2vw;
        color: #fb7299;
        background-color: #f4f4f4;
        font-size: 3.2vw;
      }
    }
    div:nth-child(2) {
      padding: 2.667vw 0;
      span {
        padding-right: 4vw;
        color: #999;
        vertical-align: middle;
      }
      a span:nth-child(1) {
        margin-right: 2.667vw;
        color: #212121;
        img {
          width: 4.8vw;
          height: 4.8vw;
          vertical-align: middle;
        }
      }
    }
    div:nth-child(3) {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        color: #999;
      }
      img {
        margin-right: 1.067vw;
        width: 5.867vw;
        height: 5.867vw;
        vertical-align: middle;
      }
    }
  }
}
</style>