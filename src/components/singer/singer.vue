<template>
  <div class="singer">
  	
  </div>
</template>

<script>
  import { getSingerList } from 'api/singer'
  import { ERR_OK } from 'api/config'
  export default {
  	data() {
  		return {
  			singerList: []
  		}
  	},
  	created() {
  		this._getSingerList();
  	},
  	methods: {
  		_getSingerList() {
  			getSingerList().then((res) => {
  				if (res.code === ERR_OK) {
  					this.singerList = res.data.list;
  				}
  			})
  		}
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
