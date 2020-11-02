<template>
  <div class="list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="errorContent" :success-duration="1000">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad">
           <article-item v-for="(item,i) in list" :key="i" :item="item" ></article-item>
          <van-cell >

          </van-cell>
        </van-list>
      </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from './article-item'
export default {
  data () {
    return {
      list: [], // 文章列表
      loading: false, // loading为false，此时会根据列表滚动位置判断是否触发load事件
      finished: false, // finished为true，此时不会触发load事件
      refreshing: false, // 为false加载完成
      timestamp: null,
      error: false, // 控制错误
      errorContent: '刷新成功'

    }
  },
  components: {
    ArticleItem
  },
  props: {
    labelData: {
      type: Object,
      required: true
    }
  },
  created () {
    // this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.labelData.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }
        const { results } = data.data
        this.list.push(...results)
        console.log(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = results.pubdate
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.labelData.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }
        const { results } = data.data
        this.list.unshift(...results)

        this.refreshing = false
        this.errorContent = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.errorContent = '刷新失败'
        this.refreshing = false
      }

      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    }
  }

}

</script>
<style lang="less" scoped>
.list-content{
  padding-bottom:100px;
  height: 79vh;
  overflow-y: auto;

}
</style>
