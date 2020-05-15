<template>
  <div @click="banner">
    <table class="editbanner">
      <tr>
        <td>{{left}}</td>
        <td>
          <slot name="right"></slot>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "EditBanner",
  props: ["left"],
  methods:{
    banner() {
      this.$emit('bannerClick')
    }
  }
};
</script>

<style lang='less' scoped>
.editbanner {
  background-color: #fff;
  border-collapse: collapse;
  width: 100vw;
  font-size: 4vw;

  tr td {
    padding: 2.667vw 3.2vw;
    border-bottom: 1px solid #eee;
    img {
      border-radius: 50%;
      width: 12.267vw;
      height: 12.267vw;
      vertical-align: middle;
    }
  }
  tr td:nth-child(odd) {
    text-align: left;
  }
  tr td:nth-child(even) {
    text-align: right;
  }
}
</style>