<template>
  <div class="loading">
    <img src="./Spinner.gif" class="img">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  //可以从外部传入title
  props: {
    title: {
      type: String,
      default: "正在加载中....."
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.loading {
  width: 100%;
  text-align: center;

  .img {
    width: 80px;
    height: 80px;
  }

  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>


