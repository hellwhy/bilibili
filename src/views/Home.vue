<template>
  <div class="home">
    <nav-bar />

    <van-tabs v-model="active" swipeable sticky>
      <van-tab class="tabs" v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list
          v-model="item.loading"
          :immediate-check="false"
          :finished="item.finished"
          finished-text="没有更多啦"
          @load="onLoad"
        >
          <div class="detailparent">
            <detail
              class="detailitem"
              :detailitem="categoryitem"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/content/profile/NavBar";
import Detail from "./Detail";

export default {
  name: "Home",
  data() {
    return {
      active: 0,
      category: []
    };
  },
  components: {
    NavBar,
    Detail
  },
  created() {
    this.selectCategory();
  },
  methods: {
    // 导航数据获取
    async selectCategory() {
      const res = await this.$http.get("/category/");
      this.changeCategory(res.data);
    },

    // 追加数据
    changeCategory(data) {
      console.log(data);
      this.category = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = false;
        item.pagesize = 10;
        return item;
      });
      this.selectArticle();
    },

    //获取当前数据
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    },

    //获取文章
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      // console.log(res.data);
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if(res.data.length < 10) {
        categoryitem.finished = true;
      }
    },

    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 100);
    }
  },
  watch: {
    active() {
      this.selectArticle();
    }
  }
};
</script>

<style lang="less" scoped>
.detailparent {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .detailitem {
    width: 45%;
  }
}
</style>