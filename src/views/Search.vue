<template>
  <div class="searchbody">
    <div class="search">
      <div>
        <input type="text" placeholder="请输入感兴趣的内容" />
        <van-icon class="ipt-icon" name="search" />
      </div>
      <span @click="$router.back()">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style lang='less' scoped>
.searchbody {
  background-color: #fff;
  height: 100vh;
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px 3.2vw;
    span {
      font-size: 4.267vw;
      color: #fb7299;
      margin-left: 4vw;
    }
    div {
      position: relative;
      input {
        font-size: 4vw;
        padding: 1.6vw 8vw 1.6vw 7.2vw;
        border-radius: 4vw;
        background-color: #ccc;
        width: 64vw;
      }
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
}
</style>