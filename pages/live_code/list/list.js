// pages/live_code/list/list.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveCodeList: [
      {
        id: '10',  // 独一无二的id, 标识用户的活码
        title: '标题',
        date: '2018-08-08',
        src: '',
        imgCount: 1000,
        maxScan: 2000,
        allScan: 1000
      },
      {
        id: '11',
        title: '标题二',
        date: '2018-08-08',
        src: '',
        imgCount: 10,
        maxScan: 100,
        allScan: 20
      }
    ]
  },
  // 事件函数
  saveLiveCode: function(e) {
    let index = e.target.dataset.index
    console.log(index)
    let src = this.data.liveCodeList[index].src
    console.log(src)
    wx.saveImageToPhotosAlbum({
      filePath: src,
      success: res => {
        console.log('成功')
      },
      fail: res => {
        console.log('失败')
      }
    })
  },
  editLiveCode: function(e) {
    // 需要识别跳转的是什么
    let id = e.target.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/live_code/manage/manage',
    })
  },
  deleteLiveCode: function(e) {
    let index = e.target.dataset.index
    let liveCodeList = this.data.liveCodeList
    let id = e.target.dataset.id

    liveCodeList.splice(index, 1)
    this.setData({
      'liveCodeList': liveCodeList
    })

    // 发送请求, 真的删掉
    wx.request({
      url: '',
      method: 'POST',
      data: {},
      success: res => {
        console.log(res)
      },
      fail: res => {
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
  
  }
})