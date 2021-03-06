// pages/live_code/create/create.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveCodeType: ['微信活码'],
    index: 0
  },
  submitHandler: function(e) {
    let data = e.detail.value
    data.max = Number(data.max)

    console.log(data)

    if (data.title.length == 0) {
      return wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 3000
      })
    }
    if (data.max < 10) {
      return wx.showToast({
        title: '扫描次数不能小于 10',
        icon: 'none',
        duration: 3000
      })
    }

    wx.request({
      url: app.globalData.host + '/wx/user/live_code',
      method: 'PUT',
      data: data,
      header: {
        'session_id': app.globalData.session_id
      },
      success: function(res) {
        console.log(res.data)

        let live_code_id = res.data.data.id

        // 跳转到编辑页面, 注意获取数据
        wx.navigateTo({
          url: '/pages/live_code/manage/manage?live_code_id='+live_code_id,
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'none'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})