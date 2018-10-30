// jsonp的封装
import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
//resolve和reject两个参数是两个函数，
//resolve将promise对象的状态从pending变成resolved，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
//reject函数是从pending到rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
