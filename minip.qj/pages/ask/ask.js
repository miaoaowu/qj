// pages/requestion/requestion.js
const qiniuUploader = require("../../utils/uploader");
const app = getApp();
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {
      image1: '',
      image2: '',
      image3: '',
      imageURL1: '',
      imageURL2: '',
      imageURL3: '',
      video: '',
      videoURL: '',
      confree: '',
      occasion: {
        list: ['不确定', '商务会议', '日常职场', '日常休闲', '情侣约会', '日宴社交', '晚宴社交'],
        selectedIndex: 0
      },
      temperature: {
        list: ['0℃以下', '0-10℃', '10-15℃', '16-20℃', '21-25℃', '25-30℃', '30℃以上'],
        selectedIndex: 0
      },
      consultant: {},
      question_type: '1',
      content: '',
      id: 0,
      showId:'false'
    }
  },

  formSubmit: function(e) {
    if (this.data.question.question_type == 1) {
      this.setData({
        'question.confree': 1
      })
    }
    let that = this;
    console.log("formSubmit e:", e);
    var question = new Object();
    question.image1 = this.data.question.image1;
    question.image2 = this.data.question.image2;
    question.image3 = this.data.question.image3;
    question.video = this.data.question.video;
    question.content = this.data.question.content;
    question.occasion = this.data.question.occasion.list[this.data.question.occasion.selectedIndex];
    question.temperature = this.data.question.temperature.list[this.data.question.temperature.selectedIndex];
    
    question.type = this.data.question.question_type;



    if (question.type == '2') {
      console.log("id:",this.data.question.consultant.id)
      if (this.data.question.consultant.id){
        question.consultant = this.data.question.consultant.id;
      }else{
        
        question.type=1
      }
      
      
    }
    //问题ID为0表示新问题
    question.id = this.data.question.id;
    console.log('queID1是' + question.id);
    console.log("问题:",question);
    if (question.content && question.image1) {
      req({
        url: cfg.qjUrl + 'question/upsert',
        method: 'post',
        data: question,
        success: (res) => {
          if (res.statusCode == 200) {
            console.log('req result', res);
            var question_id = res.data.id;
            console.log('queID2是' + question_id);
            wx.showToast({
              title: "等待结算",
              icon: "success",
              duration: 2000,
              success: function() {
                wx.navigateTo({
                  url: '../payment/payment?id=' + question_id + "&confree=" + that.data.question.confree
                })
              }
            });
          } else {
            console.log("网络访问错误！检查服务器是否正常！")
          }
        },
        fail: function(res) {
          console.log('网络访问失败！')
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写问题内容和至少添加一张图片',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      }) 
    }


  },

  uploadImage1: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var tempFilePath = res.tempFilePaths[0];
        qiniuUploader.init({});
        qiniuUploader.upload(
          tempFilePath,
          (res) => {
            console.log("upload result:", res)
            that.setData({
              'question.image1': res.key,
              'question.imageURL1': res.imageURL,
            });
          
          },
          (error) => {
            console.error('error: ' + JSON.stringify(error));
          }, {
            region: 'SCN', // 华南区
            uptokenURL: 'https://qj.foxcodes.cn/file/init',
            domain: 'http://p70m18mpm.bkt.clouddn.com',
            shouldUseQiniuFileName: false,
            // key: 'testKeyNameLSAKDKASJDHKAS'
          },
          // null,// 可以使用上述参数，或者使用 null 作为参数占位符
          (progress) => {
            console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
          }
        );
      }
    })
  },
  // 删除图片
  deleteImage1(res) {
    let that = this;
    console.log('删除图片', res);
    that.setData({
      'question.image1': '',
      'question.imageURL1': ''
    });
  },
  uploadImage2: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var tempFilePath = res.tempFilePaths[0];
        qiniuUploader.init({});
        qiniuUploader.upload(
          tempFilePath,
          (res) => {
            console.log("upload image result:", res)
            that.setData({
              'question.image2': res.key,
              'question.imageURL2': res.imageURL
            });
          },
          (error) => {
            console.error('error: ' + JSON.stringify(error));
          }, {
            region: 'SCN', // 华南区
            uptokenURL: 'https://qj.foxcodes.cn/file/init',
            domain: 'http://p70m18mpm.bkt.clouddn.com/',
            shouldUseQiniuFileName: false,
            // key: 'testKeyNameLSAKDKASJDHKAS'
          },
          // null,// 可以使用上述参数，或者使用 null 作为参数占位符
          (progress) => {
            console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
          }
        );
      }
    })
  },
  // 删除图片
  deleteImage2(res) {
    let that = this;
    console.log('删除图片', res);
    that.setData({
      'question.image2': '',
      'question.imageURL2': ''
    });
  },
  uploadImage3: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var tempFilePath = res.tempFilePaths[0];
        qiniuUploader.init({});
        qiniuUploader.upload(
          tempFilePath,
          (res) => {
            console.log("upload result:", res)
            that.setData({
              'question.image3': res.key,
              'question.imageURL3': res.imageURL
            });
          },
          (error) => {
            console.error('error: ' + JSON.stringify(error));
          }, {
            region: 'SCN', // 华南区
            uptokenURL: 'https://qj.foxcodes.cn/file/init',
            domain: 'http://p70m18mpm.bkt.clouddn.com/',
            shouldUseQiniuFileName: false,
            // key: 'testKeyNameLSAKDKASJDHKAS'
          },
          // null,// 可以使用上述参数，或者使用 null 作为参数占位符
          (progress) => {
            console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
          }
        );
      }
    })
  },
  // 删除图片
  deleteImage3(res) {
    let that = this;
    console.log('删除图片', res);
    that.setData({
      'question.image3': '',
      'question.imageURL3': ''
    });
  },
  

  bindOccasionChange: function(e) {
    this.setData({
      'question.occasion.selectedIndex': e.detail.value,
      subFlag1: true,
    })
  },

  bindTemperatureChange: function(e) {
    this.setData({
      'question.temperature.selectedIndex': e.detail.value,
      subFlag2: true,
    })
  },

  bindConsultantChange: function(e) {
    this.setData({
      'question.consultant.selectedIndex': e.detail.value
    })
  },

  radioChange: function(e) {

    this.setData({
      'question.question_type': e.detail.value
    })
    if (e.detail.value == 2){
      wx.navigateTo({
        url: '../consultant/consultant',
      })
    }
    console.log("question.question_type", this.data.question.question_type)
  },

  bindContentInput: function(e) {
    this.setData({
      'question.content': e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    console.log('djjq', query)
    if (query.id) {
      this.setData({
        'question.question_type': '2',
        'question.consultant.id': parseInt(query.id),
        'question.consultant.name': query.name,
        'question.confree': query.consultation_fees
      })
    }
    console.log(this.data.question.consultant)
    req({
      url: cfg.qjUrl + 'consultant/list',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('req result', res);
          this.setData({
            'question.consultant.list': res.data
          });
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function(res) {
        console.log('网络访问失败！')
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.questionTmp) {
      var questionTmp = app.globalData.questionTmp;
      console.log("111111")
      console.log(questionTmp)
      this.setData({
        'question.id': questionTmp.id ? questionTmp.id : 0,
        'question.image1': questionTmp.image1,
        'question.image2': questionTmp.image2,
        'question.image3': questionTmp.image3,
        'question.imageURL1': questionTmp.imageURL1,
        'question.imageURL2': questionTmp.imageURL2,
        'question.imageURL3': questionTmp.imageURL3,
        'question.video': questionTmp.video,
        'question.videoURL': questionTmp.videoURL,
        'question.content': questionTmp.content,
        'question.occasion.selectedIndex': questionTmp.occasion_selectedIndex,
        'question.temperature.selectedIndex': questionTmp.temperature_selectedIndex,
        // 'question.price_range.selectedIndex': questionTmp.price_range_selectedIndex,
        'question.qestion_type': questionTmp.type
      })
      console.log("22222");
      console.log(this.data.question);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (app.globalData.questionTmp) {
      var questionTmp = app.globalData.questionTmp;
      questionTmp.image1 = this.data.question.image1;
      questionTmp.image2 = this.data.question.image2;
      questionTmp.image3 = this.data.question.image3;
      questionTmp.imageURL1 = this.data.question.imageURL1;
      questionTmp.imageURL2 = this.data.question.imageURL2;
      questionTmp.imageURL3 = this.data.question.imageURL3;
      questionTmp.video = this.data.question.video;
      questionTmp.videoURL = this.data.question.videoURL;
      questionTmp.content = this.data.question.content;
      questionTmp.occasion_selectedIndex = this.data.question.occasion.selectedIndex;
      questionTmp.temperature_selectedIndex = this.data.question.temperature.selectedIndex;
      // questionTmp.price_range_selectedIndex = this.data.question.price_range.selectedIndex;
      questionTmp.type = this.data.question.question_type;
      if (questionTmp.type == '2') {
        for (let i = 0; i < this.data.question.consultant.list.length; i++) {
          questionTmp.consultation_fees = this.data.question.consultant.list[i].consultation_fees;
        }
        // questionTmp.consultation_fees = this.data.question.consultant.list[this.data.question.consultant.selectedIndex].consultation_fees;
      }
    } else {
      var questionTmp = new Object();
      questionTmp.image1 = this.data.question.image1;
      questionTmp.image2 = this.data.question.image2;
      questionTmp.image3 = this.data.question.image3;
      questionTmp.imageURL1 = this.data.question.imageURL1;
      questionTmp.imageURL2 = this.data.question.imageURL2;
      questionTmp.imageURL3 = this.data.question.imageURL3;
      questionTmp.video = this.data.question.video;
      questionTmp.videoURL = this.data.question.videoURL;
      questionTmp.content = this.data.question.content;
      questionTmp.occasion_selectedIndex = this.data.question.occasion.selectedIndex;
      questionTmp.temperature_selectedIndex = this.data.question.temperature.selectedIndex;
      // questionTmp.price_range_selectedIndex = this.data.question.price_range.selectedIndex;
      questionTmp.type = this.data.question.question_type;
      if (questionTmp.type == '2') {
        for (let i = 0; i < this.data.question.consultant.list.length; i++) {
          questionTmp.consultation_fees = this.data.question.consultant.list[i].consultation_fees;
        }
        // questionTmp.consultation_fees = this.data.question.consultant.list[this.data.question.consultant.selectedIndex].consultation_fees;
      }
      app.globalData.questionTmp = questionTmp;
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.onHide();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})