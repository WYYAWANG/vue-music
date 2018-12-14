<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- 添加keep-alive,将dom缓存到内存中，不会继续发送请求 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from "components/m-header/m-header";
import Tab from "components/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  }
};
</script>

<style lang="stylus">
</style>
