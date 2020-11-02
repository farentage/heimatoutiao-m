<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFromFules.mobile"
         type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFromFules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*60" format="ss s" v-if="countdown" @finish="countdown=false" />
          <van-button v-else class="send-sms-btn" round size="small" type="default" native-type="button" @click="verificationCode">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, sendMessages } from '@/api'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFromFules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]

      },
      countdown: false
    }
  },
  methods: {
    async onSubmit () {
      // 1. 展示登陆中 loading
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间 0 表示持续展示不关闭
      })

      // 2. 请求登录
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        // console.log(data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        console.log(err)
        // if (err.response.status === 400) {
        //   this.$toast.fail('手机号或验证码错误')
        // } else {
        //   this.$toast.fail('登录失败，请稍后重试')
        // }
      }
    },
    async verificationCode () {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 显示倒计时
      this.countdown = true
      try {
      // 获取短信验证码
        await sendMessages(this.user.mobile)
        this.$toast.status('验证码发送成功')
      } catch (err) {
        // console.log(err.response)
        // 失败关闭倒计时
        this.countdown = false
        if (err.response.status === 404) return this.$toast.fail('手机号不正确')
        else if (err.response.status === 429) return this.$toast.fail('发送太频繁了，请稍后重试')
        else return this.$toast.fail('发送失败,请稍后尝试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {

  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
