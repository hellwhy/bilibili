<template>
  <div class="btn" @click='registerClick'>
    <van-button round type="info" :size="size" :color="color">{{ btn }}</van-button>
  </div>
</template>

<script>
export default {
  name:'LoginBtn',
  props:["btn","size","color"],
  methods:{
    registerClick() {
      this.$emit('registerAjax')
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  margin:2.667vw 5.333vw;
}
</style>