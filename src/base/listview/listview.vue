<template>
  <!-- @scroll="scroll" 接收从scroll组件里派发出来的滚动事件 -->
  <scroll
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li v-for="(group, index) in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" class="list-group-item" @click="selectedItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          class="item"
          :data-index="index"
          :class="{'current':currentIndex===index}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!data.length" class="loading-container"> <!-- 加载中 -->
      <loading :title="title"></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import { getData } from "common/js/dom";
import Loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18; //右侧每个字母锚点的高度(A,B,C,D,E)
const TITLE_HEIGHT = 30 // 　title高度

export default {
  created() {
    // 为什么不把这些放在data中？因为这里不需要观测这些数据的变化
    this.touch = {};
    this.listenScroll = true; //监听滚动事件，从而获取pos
    this.listHeight = [];
    this.probeType = 3;
    this.title = "正在加载歌手页面..."
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    };
  },
  //可以从外部传入title
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    // 通过计算属性，运用map方法得到通讯录右侧字母列表［‘热’，A,B,C,D...］
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if(this.scrollY > 0){
        return ''
      }
      return this.data[this.currentIndex]?this.data[this.currentIndex].title: ''
    }
  },
  methods: {
    selectedItem(item){
      //将事件派发出去，不需要写业务逻辑
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      //console.log("anchorIndex: "+anchorIndex)
      this.touch.y1 = e.touches[0].pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0; // 滑动后所到的锚点位置（|0向下取整)
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      // scroll.vue组件会派发一个scroll事件出来，用于接收滚动的位置，在此做接收( @scroll="scroll" )
      this.scrollY = pos.y; // 通过scroll事件得到scrollY
    },
    _calculateHeight() {
      // 计算高度（计算出每个字母类别下对应高度并生成数组）[0, 760, 1030, 1370...]
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _scrollTo(index) {
      // 解决onShortcutTouchStart点击［‘热’，A,B,C...Z］最上端及底部存在bug(此时返回的index的值是null,需要过滤掉)
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        // 滑动到最顶部（超出了字母“热”）
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        // 滑动到最底部 index > 24 - 2 (超出了字母“Z”)
        index = this.listHeight.length - 2;
      }
      console.log(index)
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      // 通过监听scrollY值的变化, 计算出 currentIndex 索引值
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      //console.log(newY+"newY")
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限 (24-2), currentIndex=[0,1,2,3....22]
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>


