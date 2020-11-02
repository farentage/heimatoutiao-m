
<template>
  <div class="home-content">
    <!-- 头部导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
         <template #title>
            <van-button
              class="search-btn"
              type="info"
              size="small"
              round
              icon="search"
              to="/search"
            >搜索</van-button>
         </template>
      </van-nav-bar>
      <!-- tab频道切换 -->
      <van-tabs swipeable v-model="active">
        <!-- 频道 -->
        <van-tab :title="item.name" v-for="item in labelData" :key="item.id">
           <!-- 文章列表 -->
          <article-list :labelData='item'></article-list>
           <!-- {{item.name}} -->
        </van-tab>
        <div slot='nav-right' class="blankplaceholder"></div>
        <div class="hamburg" slot='nav-right' @click="channelEditor">
          <i class="iconfont icongengduo"></i>
        </div>

      </van-tabs>
      <!-- 频道编辑弹出层 -->
      <van-popup
        v-model="showPopup"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <channel-edit :my-channel="labelData" :active="active" @channel-jump="onchannelJump">  </channel-edit>

      </van-popup>
  </div>
</template>
<script>
import { getpindao } from '@/api'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  data () {
    return {
      //  tab切换标签数据
      active: 0,
      labelData: [],
      refreshing: false,
      showPopup: false // 控制编辑弹出层
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.getlabelData()
  },
  methods: {
    onchannelJump (i) {
      this.active = i
      this.showPopup = false
    },
    // 弹出频道编辑
    channelEditor () {
      this.showPopup = true
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    },

    async getlabelData () {
      const { data } = await getpindao()
      this.labelData = data.data.channels
      console.log(data.data.channels)
    }
  }
}
</script>
<style lang="less" scoped>

  .home-content{
    padding-top: 180px;
    .page-nav-bar{
      position: fixed;
    }
  /deep/ .van-nav-bar__title{
     max-width: unset;
   }
    .search-btn {
    height: 64px;
    width: 555px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      }
    }

 /deep/ .van-tabs__wrap{
 position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
}
  /deep/ .van-tabs{

     .van-tab{
     min-width: 200px;
      border-right: 1px solid #eee;
      font-size: 30px;
      color:#777777
    }
    .hamburg{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 66px;
      width: 82px;
      background-color: #fff;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.8;
      i{
        font-size: 34px;
      }
    }
    .hamburg:before{
      content: "";
      position: absolute;
      left:0;
      width: 1px;
      height: 82px;
      background: url('../../assets/gradient-gray-line.png');
      background-size: contain;
    }
    .blankplaceholder{
      flex-shrink: 0;
       width: 66px;
      height: 82px;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      height: 6px;
      width: 30px;
      background-color: #3195F9;
      // margin-bottom: 15px;
    }
  }
  }

</style>
