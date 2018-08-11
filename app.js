//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 保存用户信息
    var userInfo = wx.getStorageSync('userInfo') || null
    this.globalData.userInfo = userInfo

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.host + '/wx/login',
          method: 'POST',
          data: {
            'code': res.code
          },
          success: res => {
            let body = res.data
            if (body.errcode === 0) {
              this.globalData.session_id = body.data.session_id
            } else {
              console.log(body)
            }
          },
          fail: res => {
            console.log('error')
            console.log(res)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'http://192.168.1.111:8080',
    session_id: 'oS_iQ0dQxRiTKPomeBvD7wH7-x0k'
  }
})