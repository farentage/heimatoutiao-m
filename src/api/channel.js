// 频道编辑模块
import request from '../utils/request'

// 获取全部频道
export const getMyChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
