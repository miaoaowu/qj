// pages/imageTest/imageTest.js
//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;

//获取应用实例
const app = getApp();

const qiniuUploader = require("../../utils/uploader");

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    //   region: 'SCN', // 华南区
    //   uptokenURL: 'https://[yourserver.com]/api/uptoken',
    //   // uptoken: 'xxxx',
    //   domain: 'http://[yourBucketId].bkt.clouddn.com',
    //   shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    basic_url: cfg.imageTestUrl,
    question_data: app.globalData.test_data
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      question_data: app.globalData.test_data
    });
    // console.log(app.globalData.test_data)
    // console.log(this.data.question_data)
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
    app.globalData.test_data = this.data.question_data;
    // console.log(app.globalData.test_data)
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

  },

  testSubmit: function () {
    let answer = [];  // 测试答案集合
    let finished = true;  // 是否已完成测试
    let unanswered = "";  // 未答题号集合
    for (var i = 0; i < this.data.question_data.length; ++i) {
      if (!this.data.question_data[i].answered) {
        unanswered = unanswered + (i) + '、';
        console.log(`第${i + 1}题未作答！`);
        finished = false;
        // break;
      }
      answer[i] = this.data.question_data[i].question_model;
    }
    unanswered = unanswered.substring(0, unanswered.length - 1);
    console.log(finished, answer);
    if (!finished) {
      wx.showModal({
        title: "有测试题未完成",
        content: `请将${unanswered}题完成后再提交！`,
        showCancel: false,
        confirmText: "确定"
      })
    } else {
      let name = answer[5];
      let mobile = answer[6];
      let age_scope = answer[7];
      let profession = answer[8];
      let req_data = {
        "test_answer": JSON.stringify(answer),
        "mobile": mobile,
        "name": name,
        "age_scope": age_scope,
        "profession": profession,
      };
      console.log("提交测试答案", req_data);
     
      req({
        url: cfg.qjUrl + 'user/test_answer',
        // url: 'http://localhost/b2/test/submit',
        method: 'post',
        data: req_data,
        success: (res) => {
          if (res.statusCode == 200) {
            console.log('形象测试答案提交成功，req result：', res);
            app.globalData.isTested = app.globalData.user.tested = true;
            wx.setStorageSync("user", app.globalData.user);
            console.log("user：", app.globalData.user);
            wx.showModal({
              title: "您已使用风格体型专用券!",
              content: "感谢您进行形象测试！24小时内您的形象定位资料将显示在“个人中心”-->“会员档案”中，您现在可以在“咨询”栏目中提出问题。",
              showCancel: false,
              confirmText: "确定",
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/consult/consult',
                  })
                }
              }
            })
          } else {
            console.log("网络访问错误！检查服务器是否正常！res.statusCode: ", res.statusCode)
          }
        },
        fail: function (res) {
          console.log('网络访问失败！')
        }
      })


      
    }
  },

  testReset: function () {
    console.log("Question Data Reset！")
    this.setData({
      question_data: app.globalData.original_test_data
    });
    // console.log(this.data.question_data);
  },

  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let idx = e.currentTarget.dataset.i;
    this.data.question_data[idx].question_model = e.detail.value;
    if (this.data.question_data[idx].question_model.length == 0) {
      this.data.question_data[idx].answered = false;
    } else {
      this.data.question_data[idx].answered = true;
    }
    var items = this.data.question_data[idx].question_options;
    var values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }
    // console.log(this.data.question_data);
  },

  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    let idx = e.currentTarget.dataset.i;
    this.data.question_data[idx].question_model = e.detail.value;
    this.data.question_data[idx].answered = true;
    var items = this.data.question_data[idx].question_options;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }
    this.data.question_data[idx].question_options = items;
    // console.log(this.data.question_data);
  },

  bindKeyInput: function (e) {
    console.log(e)
    let idx = e.currentTarget.dataset.i;
    this.data.question_data[idx].question_model = e.detail.value;
    if (this.data.question_data[idx].question_model) {
      this.data.question_data[idx].answered = true;
    } else {
      this.data.question_data[idx].answered = false;
    }
    // console.log(this.data.question_data);
  },

  didPressChooesImage: function (e) {
    var that = this;
    didPressChooesImage(that, e.currentTarget.dataset.i);
    // console.log(e)
  }
})

function didPressChooesImage(that, idx) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(
        filePath,
        (res) => {
          // 保存上传文件的信息
          that.data.question_data[idx].question_model = res.imageURL
          that.data.question_data[idx].answered = true
          that.setData({
            question_data: that.data.question_data
          });
          // console.log(that.data.question_data)
        },
        (error) => {
          console.error('error: ' + JSON.stringify(error));
        },
        {
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
}