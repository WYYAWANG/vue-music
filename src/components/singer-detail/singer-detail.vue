<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex"; // 取数据提供的语法糖
import { getSingerDetail} from "api/singer";
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      // 标题
      return this.singer.name;
    },
    bgImage() {
      // 背景图
      return this.singer.avatar;
    },
    ...mapGetters([
      "singer" // 对应到store/getters.js 里的singer (获取到列表页点击的歌手对应详细数据)
    ])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {  // 这里的this.singer数据 是通过vuex获取的，所以在歌手详情页刷新的话会获取不到数据，在此做判断做回退操作(边距数据的处理)
          this.$router.push('/singer')
          return
        }
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK){
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach(element => {
        let {musicData} = element
        if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

