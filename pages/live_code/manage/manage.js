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
      maxScan: 120
    },
    imgList: [
      {
        src: '1',
        scan: 10,
        date: '2018-08-08'
      },
      {
        src: '2',
        scan: 11,
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
      'qrcode.maxScan': value
    })
  },
  deleteImg: function(e) {
    console.log(e)
    let index = e.target.dataset.index
    let imgList = this.data.imgList
    imgList.splice(index, 1)
    this.setData({
      'imgList': imgList
    })
  },
  addImg: function(e) {
    wx.chooseImage({
      count: 9,
      success: res => {
        let imgList = this.data.imgList
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        for (let i in tempFilePaths) {
          imgList.push({
            src: tempFilePaths[i],
            count: 0,
            date: util.formatTime(new Date())
          })
        }
        this.setData({
          'imgList': imgList
        })
      }
    })
  },
  saveAll: function(e) {
    let data = this.data
    // 交互的结构还是需要设计
    // 保存基本信息
    wx.request({
      url: '',
      method: 'POST',
      data: data.qrcode,
      header: {},
      success: res => {

      },
      fail: res => {
        console.log(res)
      }
    })
    // 上传图片, 每次只能传一张
    wx.uploadFile({
      url: '',
      filePath: '',
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: res => {
        let data = res.data
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
    // todo, 需要接受一个参数, 表示编辑什么
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