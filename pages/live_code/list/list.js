// pages/live_code/list/list.js
const util = require('../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveCodeList: []
  },
  // 事件函数
  saveLiveCode: function(e) {
    let index = e.target.dataset.index
    let src = this.data.liveCodeList[index].src

    wx.downloadFile({
      url: src,
      success: res => {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: res => {
              console.log('hello save')
              console.log(res)
            },
            fail: util.fail
          })
        } else {
          return util.fail(res, '下载失败')
        }
      },
      fail: util.fail
    })
  },
  editLiveCode: function(e) {
    // 需要识别跳转的是什么
    let id = e.target.dataset.id
    wx.navigateTo({
      url: '/pages/live_code/manage/manage?live_code_id='+id,
    })
  },
  deleteLiveCode: function(e) {
    let index = e.target.dataset.index
    let liveCodeList = this.data.liveCodeList
    let id = e.target.dataset.id

    wx.request({
      url: app.globalData.host + '/wx/user/live_code',
      method: 'DELETE',
      data: {
        'ids': [id]
      },
      header: {
        'session_id': app.globalData.session_id
      },
      success: res => {
        if (res.data.errcode != 0) {
          return util.fail(res, res.data.msg)
        }

        // 成功则更新视图
        liveCodeList.splice(index, 1)
        this.setData({
          'liveCodeList': liveCodeList
        })
      },
      fail: util.fail
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
    // 初始化数据
    wx.request({
      url: app.globalData.host + '/wx/user/live_code',
      method: 'GET',
      header: {
        'session_id': app.globalData.session_id
      },
      success: res => {
        // 似乎是每个请求必备
        if (res.data.errcode != 0) {
          return util.fail(res, res.data.msg)
        }

        let result = res.data.data.result
        let liveCodeList = []
        for (let i in result) {
          liveCodeList.push({
            'id': result[i]['id'],
            'title': result[i]['title'],
            'date': result[i]['date'],
            'src': app.globalData.host + result[i]['src'],
            'imgCount': Object.keys(result[i]['img']).length,
            'maxScan': result[i]['max_scan'],
            'allScan': result[i]['all_scan']
          })
        }
        this.setData({
          'liveCodeList': liveCodeList
        })
      },
      fail: util.fail
    })
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
  
  }
})