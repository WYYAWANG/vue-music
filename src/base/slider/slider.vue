<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot> 
        <!-- 插槽，外部引用slider组件的地方就会被插入到此处 -->
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
  name: "slider",
  props: {
    loop: {
      // 循环轮播
      type: Boolean,
      default: true
    },
    autoPlay: {
      // 自动播放
      type: Boolean,
      default: true
    },
    interval: {
      // 轮播时间间隔
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
      
    }, 20) // 延时保障dom渲染完成，浏览器刷新通常是17毫秒一次，这里也可以用this.$nextTick

  },
  methods: {
    _setSliderWidth(isResize) {
      // 设置slider 的宽度
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, "slider-item") // 添加slider-item类

        child.style.width = sliderWidth + "px"
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        // 如果是循环切换并且没有重新改变窗口大小 （在初始化BScroll时会克隆两个dom，故得加上 2 * sliderWidth ）
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + "px"
    },
    _initSlider() {
      // 初始化slider
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true, // 这个配置是为了做 slide 组件用的，默认为 false
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

    //   this.slider.on("scrollEnd", () => {
    //     //滚动结束触发
    //     let pageIndex = this.slider.getCurrentPage().pageX // 获取当前切换到的图片页码
    //     console.log(pageIndex, "scrollEnd-----pageIndex")
    //     if (this.loop) {
    //       // 循环模式下，会往它第一个元素添加一个拷贝
    //       pageIndex -= 1
    //     }

    //     this.currentPageIndex = pageIndex
    //     console.log(this.currentPageIndex, "this.currentPageIndex")
    //     if (this.autoPlay) {
    //       this._play()
    //     }
    //   })

    //   this.slider.on("beforeScrollStart", () => {
    //     //(此事件经测试只有手动切换图片时才会触发)每次自动轮播前清除下定时器，防止手动切换跟自动切换冲突产生bug
    //     if (this.autoPlay) {
    //       clearTimeout(this.timer)
    //     }
    //   })
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slider {
    position: relative
    min-height: 1px

    .slider-group {
        position: relative
        overflow: hidden
        white-space: nowrap

        .slider-item {
            float: left
            box-sizing: border-box
            overflow: hidden
            text-align: center

            a {
                display: block
                width: 100%
                overflow: hidden
                text-decoration: none
            }

            img {
                display: block
                width: 100%
            }
        }
    }

    .dots {
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        text-align: center
        font-size: 0

        .dot {
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l

            &.active {
                width: 20px
                border-radius: 5px
                background: $color-text-ll
            }
        }
    }
}
</style>