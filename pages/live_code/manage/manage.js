// pages/live_code/manage/manage.js
const util = require('../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    live_code_id: null,
    qrcode: {
      src: '',
      id: '170',
      title: '我是标题',
      maxScan: 120
    },
    imgList: []
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
          // 上传到服务器上
          wx.uploadFile({
            url: app.globalData.host + '/wx/user/img',
            filePath: tempFilePaths[i],
            name: 'img',
            header: {
              'session_id': app.globalData.session_id
            },
            formData: {
              'live_code_id': this.data.live_code_id
            },
            success: res => {
              console.log(res)
              // 成功则添加到列表中
              imgList.push({
                src: app.globalData.host + res.data.data.src[0],
                count: 0,
                date: util.formatTime(new Date())
              })
            },
            fail: res => {
              console.log(res)
              wx.showToast({
                title: '上传图片失败, 稍后再试',
                icon: 'none',
                duration: 2000
              })
            }
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
    let live_code_id = options.live_code_id
    // 判断是否有 live_code_id 参数
    if (!live_code_id) {
      wx.navigateBack({
        url: '/pages/index/index'
      })
    } else {
      // 获取所需的数据
      wx.request({
        url: app.globalData.host + '/wx/user/live_code?id=' + live_code_id,
        method: 'GET',
        header: {
          'session_id': app.globalData.session_id
        },
        success: res => {
          console.log(res.data)
          let one = res.data.data.result[0]
          let img_ids = one['img']
          let imgList = []

          for (let i in img_ids) {
            imgList.push({
              src: app.globalData.host + i,
              scan: img_ids[i],
              date: '2018-08-08'
            })
          }

          this.setData({
            'live_code_id': live_code_id,
            'qrcode': {
              'src': app.globalData.host + one['src'],
              'id': live_code_id,
              'title': one['title'],
              'maxScan': one['max_scan']
            },
            'imgList': imgList
          })
        },
        fail: res => {
          console.log(res.data)
        }
      })
    }
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