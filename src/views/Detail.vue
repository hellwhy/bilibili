<template>
  <div class="detail" @click="$router.push(`/article/${detailitem.id}`)">
    <div class="pic">
      <img :src="'https://images.weserv.nl/?url='+detailitem.img" />
      <div class="view">
        <span>
          <img src="@/assets/icons/play.png" /> 2333
        </span>

        <span>
          <img src="@/assets/icons/txt.png" /> 233
        </span>
      </div>
    </div>

    <p>{{ detailitem.name }}</p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["detailitem"]
};
</script>

<style scoped lang='less'>
.detail {
  margin: 1.333vw 0;
  p {
    padding: 1.6vw 0;
    font-size: 3.2vw;
  }
  .pic {
    position: relative;
    overflow: hidden;
    width: 44.533vw;
    height: 28.267vw;
    img {
      width: 100%;
      height: 100%;
    }
    .view {
      position: absolute;
      bottom: 0.533vw;
      display: flex;
      justify-content: space-between;
      width: 92%;
      padding: 1.333vw 1.6vw;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      font-size: 3.733vw;
      img {
        width: 4vw;
        height: 4vw;
        vertical-align: middle;
      }
      span {
        display: flex;
        align-items: center;
        color: #fff;
      }
    }
  }
}
</style>