<template>
  <div class="editbanner">
    <!-- 头部 -->
    <nav-bar/>
    
    <!-- 介绍 -->
    <div style="margin:3.2vw 0">
      <div class="uploadfile">
        <van-uploader class="uploadimg" preview-size="100vw" :after-read="afterRead" />
        <edit-banner left="头像">
          <a href="javascript:;" slot="right">
            <img :src="model.user_img" alt />
          </a>
        </edit-banner>
      </div>
      <edit-banner left="昵称" @bannerClick="show = !show;">
        <a href="javascript:;" slot="right">{{ model.name }}</a>
      </edit-banner>
      <edit-banner left="账号">
        <a href="javascript:;" slot="right">{{ model.username }}</a>
      </edit-banner>
      <edit-banner left="性别" @bannerClick="gendershow = !gendershow;">
        <a href="javascript:;" slot="right">{{ model.gender ? '男':'女' }}</a>
      </edit-banner>
      <edit-banner left="个签" @bannerClick="textshow = !textshow;">
        <a href="javascript:;" slot="right">{{ model.user_desc }}</a>
      </edit-banner>
    </div>

    <!-- 弹出框 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @cancle="content=''"
      @confirm="nameClick"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-dialog
      v-model="textshow"
      title="个签"
      show-cancel-button
      @cancle="content=''"
      @confirm="textClick"
    >
      <van-field v-model="content" type="textarea" />
    </van-dialog>

    <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />

    <div class="editback" @click="$router.back()">返回个人中心</div>
  </div>
</template>

<script>
import NavBar from "@/components/content/profile/NavBar";
import EditBanner from "@/components/content/profile/EditBanner";

export default {
  name: "Edit",
  data() {
    return {
      model: {},
      code: "",
      show: false,
      textshow: false,
      gendershow: false,
      content: "",
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 }
      ]
    };
  },
  components: {
    NavBar,
    EditBanner
  },
  created() {
    // 页面加载时渲染页面
    this.selectUser();
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },

    // 上传文件传给后台
    async afterRead(file) {
      const fd = new FormData();
      fd.append("file", file.file);
      const res = await this.$http.post("/upload/", fd);
      // console.log(res);
      this.model.user_img = res.data.url;
    },

    // 上传完文件后 修改后台数据
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      // console.log(res)
      if (res.data.code == 200) {
        this.$msg.fail("修改成功");
      }
    },

    //提示框点击的按钮 修改数据
    nameClick() {
      this.model.name = this.content;
      this.content = "";
      this.UserUpdate();
    },
    textClick() {
      this.model.user_desc = this.content;
      this.content = "";
      this.UserUpdate();
    },

    // 性别选择 select
    onSelect(data) {
      this.model.gender = data.val;
      this.gendershow = !this.gendershow;
      this.UserUpdate();
    }
  }
};
</script>

<style lang='less' scoped>
@c999: #999;
.editbanner {
  .uploadfile {
    position: relative;
    overflow: hidden;
    .uploadimg {
      opacity: 0;
      position: absolute;
    }
  }
  .editback {
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #fff;
    font-size: 3.733vw;
    color: #505050;
    padding: 2.667vw 0;
  }

  a {
    color: @c999;
  }
}
</style>