<template>
  <div class="article" v-if="Object.keys(model).length">
    <!-- 导航 -->
    <nav-bar class="nav" />

    <div class="detailinfo">
      <!-- 视频 -->
      <div class="video">
        <video :src="model.content" controls poster="@/assets/imgs/video.jpg"></video>
      </div>

      <!-- App内打开 高清更流畅 (。・∀・)ノ -->
      <div class="app">
        <a
          href="http://d.bilibili.com/download_app.html?preUrl=http%3A%2F%2Fm.bilibili.com%2Fvideo%2Fav625739549.html&amp;schema=bilibili%3A%2F%2Fvideo%2F625739549%3Fpage%3D0&h5awaken=cHZpZD0yM0YwMUY3NC1BNkMxLTQ1NEQtOTFGNi1EQzEyRjcxMDgzNDE0NzE1NmluZm9jXzYyNTczOTU0OV8xNTg5NTQ2ODgxNTkxJnVhPU1vemlsbGElMkY1LjAlMjAoaVBob25lJTNCJTIwQ1BVJTIwaVBob25lJTIwT1MlMjAxM18yXzMlMjBsaWtlJTIwTWFjJTIwT1MlMjBYKSUyMEFwcGxlV2ViS2l0JTJGNjA1LjEuMTUlMjAoS0hUTUwlMkMlMjBsaWtlJTIwR2Vja28pJTIwVmVyc2lvbiUyRjEzLjAuMyUyME1vYmlsZSUyRjE1RTE0OCUyMFNhZmFyaSUyRjYwNC4xJmlzQXV0b09wZW49ZmFsc2UmYnNvdXJjZT11bmRlZmluZWQmJm9wZW5fYXBwX2Zyb21fdHlwZT1oNSZvcGVuX2FwcF91dWlkPUFDNTAzNzUwLTMyNUItOTQ1OS04NkIxLTkzNTJBNjM4MDcxQzg1ODAwaW5mb2Mmb3Blbl9hcHBfZ3JvdXBpZD04MjImb3Blbl9hcHBfdXJsPWh0dHBzJTNBJTJGJTJGbS5iaWxpYmlsaS5jb20lMkZ2aWRlbyUyRkJWMUh0NHkxQzdydiZvcGVuX2FwcF9hZGRpdGlvbj0lN0IlMjJzcG1pZCUyMiUzQSUyMjMzMy40MDEuY2xpY2sucGxheWVyJTIyJTdE"
        >
          <span>App内打开 高清更流畅 (。・∀・)ノ</span>
        </a>
      </div>

      <!-- 介绍 -->
      <div class="detailtext">
        <div>
          <span>{{ model.category.title }}</span>
          <span class="name">{{model.name}}</span>
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
          <span @click="scClick" :class="{'sc':this.shoucang}">
            <img src="@/assets/icons/shoucangtrue.png" v-if="this.shoucang"/>
            <img src="@/assets/icons/shoucangfalse.png" v-else/>
            收藏
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
    <comment-title @textList="textPost" />
    <comment />
  </div>
</template>

<script>
import NavBar from "@/components/content/profile/NavBar";
import Detail from "./Detail";
import CommentTitle from "@/components/content/article/CommentTitle";
import Comment from "@/components/content/article/Comment";

export default {
  name: "Article",
  data() {
    return {
      model: {},
      commendList: {},
      postcom: {
        article_id: 0,
        comment_content: "",
        parent_id: null,
        comment_date: null
      },
      shoucang:false
    };
  },
  components: {
    NavBar,
    Detail,
    CommentTitle,
    Comment
  },
  created() {
    this.ArticleData();
    this.commendData();
    this.scInit();
  },
  methods: {
    // 视频数据渲染
    async ArticleData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      // console.log(res);
      this.model = res.data[0];
    },

    // 推荐数据获取
    async commendData() {
      const res = await this.$http.get("/commend/");  
      // console.log(res);  
      this.commendList = res.data;
    },

    // 发表评论提交到后台
    async textPost(res) {
      const date = new Date();
      let m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const str = `${m}-${d}`;
      this.postcom.article_id = this.$route.params.id;
      this.postcom.comment_date = str;
      this.postcom.comment_content = res;
      // 追加的评论发送至服务器
      await this.$http.post('/comment_post/'+localStorage.getItem('id'),this.postcom);
    },

    // 收藏视频
    async scClick() {
      if(localStorage.getItem('token')) {
        const res = await this.$http.post('/collection/'+localStorage.getItem('id'),{article_id:this.$route.params.id})
        console.log(res)
        if(res.data.msg === "收藏成功") {
          this.shoucang = true
        }else {
          this.shoucang = false
        }
      }
    },
    // 页面加载时判断是否收藏文章 切换状态
    async scInit() {
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/collection/'+localStorage.getItem('id'),{
        params: {
          article_id: this.$route.params.id
        }
      })
      this.shoucang = res.data.success;
      }    
    },
    // 路由跳转之后回到顶部
    scrolltops() {
      window.scrollTo(0,0);
    }
  },
  watch: {
    $route() {
      this.ArticleData();
      this.commendData();
      this.scInit();
     this.scrolltops();
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

  .app {
    margin: 2.667vw;
    border-radius: 6.667vw;
    padding: 2.133vw 2.667vw;
    background-color: #fb7299;
    width: scal(100% - 2.667vw);
    text-align: center;
    span {
      font-size: 3.733vw;
      color: #fff;
    }
  }

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
    padding: 4vw;
    div:nth-child(1) {
      span:nth-child(1) {
        padding: 1.333vw 2.133vw;
        margin-right: 2.667vw;
        border-radius: 3.2vw;
        color: #fb7299;
        background-color: #f4f5f6;
        font-size: 3.2vw;
      }
      .name {
        font-size: 4.267vw;
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
  .sc {
    color:#fb7299 !important;
  }
}

</style>