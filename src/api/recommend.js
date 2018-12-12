import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

// 封装的这个方法就是利用jsonp抓取数据
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // Object.assign()用于合并对象，返回一个新的对象
  const data = Object.assign(commonParams, {
    platform: 'h5',
    uni: 1534995542,
    needNewCode: 1
  })
  //返回一个promise
  return jsonp(url, data, options)
}
