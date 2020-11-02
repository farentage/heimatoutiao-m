<template>
  <div id="my-content">

        <!-- 已登录 -->
      <div v-if="user" class="header y-deader">
        <div class="user-info">
          <div class="left">
            <van-image  :src="personalInformationList.photo" round fit="cover" />
            <span class="name">{{personalInformationList.name}}</span>
          </div>
          <div class="right">
            <van-button size="mini" round >编辑资料</van-button>
          </div>
        </div>
        <div class="stati-tics">
           <div class="item">
             <span class="count">{{personalInformationList.art_count}}</span>
             <span class="text">头条</span>
           </div>
           <div class="item">
             <span class="count">{{personalInformationList.follow_count}}</span>
             <span class="text">关注</span>
           </div>
           <div class="item">
             <span class="count">{{personalInformationList.fans_count}}</span>
             <span class="text">粉丝</span>
           </div>
           <div class="item">
             <span class="count">{{personalInformationList.like_count}}</span>
             <span class="text">获赞</span>
           </div>

        </div>

      </div>
    <!-- 未登录 -->
      <div v-else class="header no-header">
        <div class="login-btn" @click="$router.push('/login')">
          <img src="~@/assets/mobile.png" alt="">
          <span>登录 / 注册</span>
        </div>
      </div>
      <!-- Grid宫格  -->
      <van-grid  :column-num="2" clickable  >
        <van-grid-item >
          <i slot="icon" class="iconfont iconshoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item >
          <i slot="icon" class="iconfont iconlishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- Cell 单元格 -->

        <van-cell  class="notice" value="消息通知" is-link/>
        <van-cell  value="小智同学"   class="xiaozhi" is-link />
         <van-cell v-if="user" title="退出登录" @click="onquit" class="logout-cell"/>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api'
export default {
  data () {
    return {
      personalInformationList: {}
    }
  },
  created () {
    if (this.user) {
      this.personalInformation()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onquit () {
      this.$dialog.confirm({
        title: '确定退出么?',
        message: '确定退出么?'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch((err) => {
          // on cancel
          console.log(err)
        })
    },
    async personalInformation () {
      try {
        const { data } = await getUserInfo()
        this.personalInformationList = data.data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
#my-content{

   > .header {
     height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;

  }
   .no-header{
       display: flex;
    justify-content: center;
    align-items: center;
     .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      span{
      font-size: 28px;
      color: #fff;
      }
     }
    }
    .y-deader{
      .user-info{
        height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

        .left{
             display: flex;
           align-items: center;
          .van-image{
            height: 133px;
             width: 133px;
             margin-right: 23px;
             border: 3px solid #fff;
          }
          span.name{
            font-size: 30px;
          }

        }

      }
      .stati-tics{
            display: flex;
         .item{
           height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
         align-items: center;
           color: #fff;
           .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
         }
      }
    }
    .van-grid{
      .van-grid-item{
        i.iconfont{font-size: 45px;}
        .text{font-size: 28px; color: #333333;}
        .iconshoucang{color: #EB5253;}
        .iconlishi{color: #FF9D1D;}

      }
    }
    .van-cell-group{
      margin: 9px 0 ;
    }
    .logout-cell{
      margin-top: 9px;
      text-align: center;
    color: #d86262;
    }
    .notice{
      margin-top: 9px;
    }
    .xiaozhi{
      margin-bottom: 9px;
    }

}

</style>
