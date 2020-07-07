<template>
  <div class="detial">
    <div class="heads">
      <!-- 头像 -->
      <div class="left">
        <img :src="userInfo.user_img" v-if="userInfo.user_img" />
        <img src="@/assets/imgs/headimg.jpg" v-else />
      </div>

      <!-- 编辑资料 -->
      <div class="right">
        <div class="top">
          <p>
            <span>0</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>0</span>
            <span>关注</span>
          </p>
          <p>
            <span>0</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="bottom" @click="$router.push('/edit')">编辑资料</div>
      </div>
    </div>

    <!-- 个人介绍 -->
    <div class="user">
      <span>{{ userInfo.name }}</span>
      <p v-if="userInfo.user_desc">{{ userInfo.user_desc }}</p>
      <p v-else>bilibili干杯</p>
    </div>

    <!-- 动态,视频 -->
    <div class="viewdata">
      <span class="active">动态</span>
      <span>视频</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["userInfo"]
};
</script>

<style lang='less' scoped>
.detial {
  background-color: #fff;

  .heads {
    display: flex;
    align-items: center;
    padding: 0 3.2vw;

    .left {
      img {
        width: 22.667vw;
        height: 22.667vw;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 4vw;
      flex: 1;
      .top {
        padding: 1.333vw 2.667vw;
        display: flex;
        p {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 3.467vw;
          span:nth-child(even) {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 1px solid #ccc;
        }
      }
      .bottom {
        margin: 0 2.667vw;
        padding: 1.6vw 0;
        border-radius: 1.6vw;
        font-size: 3.733vw;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.267vw solid #fb7a9f;
        text-align: center;
        color: #fb7a9f;
      }
    }
  }
  .user {
    padding: 3.2vw;
    span {
      margin: 10px 0 3px 0;
      font-weight: 400;
      font-size: 4.8vw;
    }
    p {
      font-size: 3.467vw;
      padding: 0;
      margin: 10px 0;
      color: #999;
    }
  }

  .viewdata {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 3.2vw;

    span {
      margin-right: 8.53333vw;
      font-size: 3.467vw;
      color: #999;
    }
  }
  .active {
    color: #fb7299 !important;
  }
}
</style>