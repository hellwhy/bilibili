<template>
  <div id="app">
    <keep-alive exclude="Article">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body {
  box-sizing: border-box;
  background-color: #f4f4f4;
  font-size: 3.733vw;
  i {
    font-style: normal;
  }
  a {
    text-decoration: none;
  }
}
</style>
