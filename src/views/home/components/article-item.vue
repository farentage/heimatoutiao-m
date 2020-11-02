<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell>
       <template #title>
          <div slot="title" class="title">{{item.title}}</div>

       </template>
       <template #label>
         <div class="bottom-imgs" v-if="item.cover.type===3" >
            <div v-for="(imgs,i) in item.cover.images" :key="i" class="imgs-item">
              <van-image :src="imgs" class="imgs"/>
            </div>
          </div>
          <div>
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate | relativeTime }}</span>
          </div>
       </template>

        <van-image slot="default" fit="cover" class="right-imgs"  v-if="item.cover.type===1" :src="item.cover.images[0]" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.article-item{

  .title{
  font-size: 32px;
  color:#3A3A3A ;
  }
  .van-cell__title{
    display: flex;
    flex-direction: column;
    justify-content:space-between ;
  }
  .van-cell__value{
    flex: unset;
     width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-imgs{
    flex: unset;
    width: 100%;
    height: 146px;
  }
  span{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

}

.bottom-imgs{
  display: flex;
  padding: 30px 0;
  .imgs-item{
    flex: 1;
    height: 146px ;
    .imgs{
      width: 100%;
      height: 146px ;
    }
  }
}
</style>
