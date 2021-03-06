const formatTime = date => {
  // 难道没有格式化的字符串吗?
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  // 为前面添加0
  n = n.toString()
  return n[1] ? n : '0' + n
}

function fail(res, msg) {
  // 方便是方便, 不写第二个参数也行
  console.log(res)
  wx.showToast({
    title: msg || res.errMsg,
    icon: 'none',
    duration: 3000
  })
}


module.exports = {
  formatTime: formatTime,
  fail: fail
}
