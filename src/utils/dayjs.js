import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'// 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用

dayjs.extend(relativeTime)// 配置使用处理相对时间的插件
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
