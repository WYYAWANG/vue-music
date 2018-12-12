import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios';

// 封装的这个方法就是利用jsonp抓取数据
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // Object.assign()用于合并对象，返回一个新的对象
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uni: 1534995542,
    needNewCode: 1
  })
  //返回一个promise
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'


  const data = Object.assign({}, commonParams, {
    platform: 'yqq', // 加引号
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })


  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}