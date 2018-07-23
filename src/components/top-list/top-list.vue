<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex'
  import { getMusicList } from 'api/rank'
  import { ERR_OK } from 'api/config'
  import { createSong, getSongUrl } from 'common/js/song'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    components: {
      MusicList
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
            getSongUrl(musicData.songmid).then((res) => {
              if (res.code === ERR_OK) {
                let vkey = res.data.items[0].vkey
                let linkUrl = 'http://dl.stream.qqmusic.qq.com/C400'+musicData.songmid+'.m4a?vkey='+vkey+'&guid=6935341414&uin=0&fromtag=66'
                if (ret[index]) {
                  ret[index].url = linkUrl
                }
              }
            })
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>