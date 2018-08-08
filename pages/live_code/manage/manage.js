// pages/live_code/manage/manage.js
const util = require('../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode: {
      src: '',
      id: '170',
      title: '我是标题',
      max: 120
    },
    img_list: [
      {
        src: '1',
        count: 10,
        date: '2018-08-08'
      },
      {
        src: '2',
        count: 11,
        date: '2018-08-08'
      }
    ]
  },

  changeTitle: function(e) {
    let value = e.detail.value
    if (value.length == 0) {
      return wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 3000
      })
    }
    this.setData({
      'qrcode.title': value
    })
  },
  changeMax: function(e) {
    let value = e.detail.value
    value = Number(value)
    if (value < 10) {
      return wx.showToast({
        title: '扫描次数不能小于 10',
        icon: 'none',
        duration: 3000
      })
    }
    this.setData({
      'qrcode.max': value
    })
  },
  deleteImg: function(e) {
    console.log(e)
    let index = e.target.id
    let img_list = this.data.img_list
    img_list.splice(index, 1)
    this.setData({
      'img_list': img_list
    })
  },
  addImg: function(e) {
    wx.chooseImage({
      count: 9,
      success: res => {
        let img_list = this.data.img_list
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        for (let i in tempFilePaths) {
          img_list.push({
            src: tempFilePaths[i],
            count: 0,
            date: util.formatTime(new Date())
          })
        }
        this.setData({
          'img_list': img_list
        })
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