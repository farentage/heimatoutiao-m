import request from '../utils/request'

export const login = function (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendMessages = function (modile) {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/' + modile

  })
}
// 获取指定用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'

  })
}

export const getpindao = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
