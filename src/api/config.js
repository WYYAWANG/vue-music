// 对外暴露一些通用参数
export const commonParams = {
  g_tk: 2131048554,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const options1 = {
  // 解决歌单数据获取报错问题另外定义 https://segmentfault.com/q/1010000010051040
  param: 'jsonpCallback',
  prefix: 'playlistinfoCallback'
  // 重定义回调函数名称 https://github.com/webmodules/jsonp
}

export const ERR_OK = 0