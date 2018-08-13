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
  saveLiveCode: function(e) {
    wx.downloadFile({
      url: this.data.qrcode.src,
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
  deleteImg: function(e) {
    console.log(e)
    let index = e.target.dataset.index
    let imgList = this.data.imgList
    
    wx.request({
      url: app.globalData.host + '/wx/user/img',
      method: 'DELETE',
      header: {
        'session_id': app.globalData.session_id
      },
      data: {
        'ids': [imgList[index]['id']],
        'live_code_id': this.data.live_code_id
      },
      success: res => {
        if (res.data.errcode != 0) {
          return util.fail(res, res.data.msg)
        }

        imgList.splice(index, 1)
        this.setData({
          'imgList': imgList
        })
      },
      fail: util.fail
    })

    
  },
  addImg: function(e) {
    wx.chooseImage({
      count: 9,
      success: res => {
        let imgList = this.data.imgList
        let tempFilePaths = res.tempFilePaths
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
              if (res.data.errcode != 0) {
                return util.fail(res, res.data.msg)
              }

              // uploadFile 不会自动调用 JSON.parse
              let data = JSON.parse(res.data).data.img[0]
              // 成功则添加到列表中
              imgList.push({
                src: app.globalData.host + data['src'],
                count: data['scan'],
                date: data['date']
              })
              this.setData({
                'imgList': imgList
              })
            },
            fail: util.fail
          })
        }
      },
      fail: util.fail
    })
  },
  saveAll: function(e) {
    // 这边只是单纯的跳转, 不会其他处理, 包括修改标题
    wx.redirectTo({
      'url': '/pages/live_code/list/list'
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
              id: img_ids[i]['id'],
              src: app.globalData.host + img_ids[i]['src'],
              scan: img_ids[i]['scan'],
              date: img_ids[i]['date']
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
          console.log(res)
          wx.showToast({
            title: '载入失败',
            icon: 'none',
            duration: 3000
          })
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