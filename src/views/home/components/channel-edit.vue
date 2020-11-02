<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
      <van-cell :border="false">
        <template #title>
          <div>我的频道</div>
        </template>
        <van-button class="edit-btn" type="danger" round plain size="mini" @click="channelDelete = !channelDelete">{{channelDelete ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <van-grid class="myChannel" :gutter="10">
        <van-grid-item  v-for="(item,i) in myChannel" :key="i"  @click="cancelChannel(item,i)">
          <template #icon>
            <van-icon v-show='channelDelete && !fixedChannel.includes(item.id)' name="close" />
          </template>
          <template #text>
            <span class="text" :class="{ active : i === active }">{{item.name}}</span>
          </template>
        </van-grid-item>
      </van-grid>

      <!-- 频道推荐 -->
      <van-cell :border="false">
        <template #title>
          <div >频道推荐</div>
        </template>
      </van-cell>
      <van-grid class="rd-Channel" :gutter="10">
        <van-grid-item icon="plus" v-for="(item,i) in channelRecommendation" :key="i" :text='item.name' @click="addChannel(item)"/>
      </van-grid>

  </div>
</template>

<script>
import { getMyChannel } from '../../../api/channel'
export default {
  data () {
    return {
      myChannelList: [], // 我的频道
      rdChannelList: [], // 所有频道
      channelDelete: false,
      fixedChannel: [0, 4, 3]
    }
  },
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getMyChannels()
  },
  computed: {
    channelRecommendation () {
      return this.rdChannelList.filter(item => {
        return !this.myChannel.find(el => {
          return item.id === el.id
        })
      })
    }

  },
  methods: {
    // 添加频道
    addChannel (item) {
      this.myChannel.push(item)
    },
    // 删除频道
    cancelChannel (item, i) {
      if (this.channelDelete) {
        if (this.fixedChannel.includes(item.id)) return
        this.myChannel.splice(i, 1)
      } else {
        // 如果channelDelete是fslse 非编辑状态 点击频道跳转
        this.$emit('channel-jump', i)
      }
    },

    async getMyChannels () {
      try {
        const { data } = await getMyChannel()
        console.log(this.myChannel)
        this.rdChannelList = data.data.channels
        console.log(this.rdChannelList)
      } catch (err) {
        this.$toast.fail('全部频道获取失败')
      }
    }

  }
}
</script>

<style lang="less" scoped>
  .channel-edit{
    padding: 42PX 0;
    .van-cell__title{
      font-size: 32px;
       color: #333333;
    }
    .edit-btn{
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
    /deep/.van-grid{
      .van-grid-item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
           white-space: nowrap;
          background-color: #F3F5F5;
          .van-grid-item__text,.text{
            color: #212121;
            font-size: 27px;
            margin-top: 0 ;
          }
          .active{
      color: red;
    }
    .van-grid-item__icon-wrapper{
      position: unset;
    }

        }
      }
    }
    /deep/ .rd-Channel{
      .van-grid-item__content{
        flex-direction: row;
         .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
    /deep/ .myChannel{
       .van-grid-item__content{
         .van-icon{
           position: absolute;
           top: -10px;
           right: -10px;
           font-size: 30px;
           color: red;
           z-index: 2;
         }
       }
    }

  }
</style>
