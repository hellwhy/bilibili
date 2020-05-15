<template>
  <div class="login">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="center"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginTop"
};
</script>

<style lang="less" scoped>
.login {
  height: 12vw;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  div {
    flex: 1;
  }
}
</style>