const util = require('../../utils/util.js');
const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAnswered: null,
    question: null,
    map: { 
      "dresses": { name: "连衣裙", image:"../../../image/dress2.png"}, 
      "coats": { name: "外套", image: "../../../image/dress2.png"} , 
      "jackets": { name: "上装", image: "../../../image/dress2.png"}, 
      "handbags": { name: "包", image: "../../../image/dress2.png"}, 
      "shoe": { name: "鞋", image: "../../../image/dress2.png"}, 
      "decorations": { name: "饰品", image: "../../../image/dress2.png"},  
      "pants": { name: "下装", image: "../../../image/dress2.png" },  
    },
    design: {},
    consultant_name: "",
    costumes: [],    //所有服饰
    a:[],
    b:{
      shops:[],
      type:''
    }
  },
  tz(e){
    console.log(e)
    this.data.b.type = e.currentTarget.dataset.type;
    
    this.setData({
      b:this.data.b
    })
    wx.navigateTo({
      url: '../showCostume/showCostume?commodity='+JSON.stringify(this.data.b)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    console.log(options) //获取上一页传递过来的参数
    // 根据参数判断当前问题是否已回答

    this.setData({
      isAnswered: options.isAnswered == "true" ? true : false
    });
    console.log(options.isAnswered, this.data.isAnswered);
    // 根据参数index在全局数据中取得当前问题
    if (this.data.isAnswered) {
      this.data.question = app.globalData.answered[options.index];
    } else {
      this.data.question = app.globalData.unanswered[options.index];
    }
    console.log("question：", this.data.question)
    this.setData({
      question: this.data.question
    });

    // 根据question_id取得已答问题的active搭配方案
    // 问题的status值。1:新问题，未回答；2: 第一轮回答；3: 第一轮回答被否定；4:第二回答；5: 第二轮回答被否定；6:第三轮回答；7:否定后第一轮为最终方案，肯定即为最后方案；
    if (this.data.question.status == 2 || this.data.question.status == 4 || this.data.question.status == 6 || this.data.question.status == 7) {
      req({
        // basicUrl: cfg.qjUrl,
        url: cfg.qjUrl + 'design/list',
        method: 'get',
        data: {
          'question_id': this.data.question.id,
        },
        success: (res) => {
          if (res.statusCode == 200) {
            console.log('返回搭配方案，req result：', res);
            res.data.design.result = cfg.qiniuDomain + res.data.design.result;
            res.data.design.updatedAt = util.formatTime(new Date(res.data.design.updatedAt));
            console.log("costumes:", res.data)

            for (let i = 0; i < res.data.commoditys.length; i++) {
              
              for (let j = 0; j < res.data.commoditys[i].commodity.length; j++) {
                let detail = encodeURIComponent(res.data.commoditys[i].commodity[j].detail);
                let picture = cfg.qiniuDomain + res.data.commoditys[i].commodity[j].picture;
                res.data.commoditys[i].commodity[j].detail = detail;
                res.data.commoditys[i].commodity[j].picture = picture;
                this.data.b.shops.push(res.data.commoditys[i].commodity[j])
              }
              res.data.commoditys[i].name=this.data.map[res.data.commoditys[i].name];
              this.data.costumes.push(res.data.commoditys[i]);
            }
            console.log("costumes:", this.data.costumes)

            this.setData({
              design: res.data.design,
              consultant_name: res.data.consultantName,
              costumes: this.data.costumes,
              b: this.data.b

            })
            console.log("djj", this.data.b)
          } else {
            console.log("网络访问错误！检查服务器是否正常！")
          }
        },
        fail: function (res) {
          console.log('网络访问失败！')
        }
      })
    };

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
    app.globalData.costumes = [];
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
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  previewImage: function (e) {

    console.log('333333' + e.currentTarget.id);
    console.log(this.data.clothes);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: [this.data.design.result] // 需要预览的图片http链接列表
    })
  },

  satisfied: function (e) {
    console.log(e)
    // let satisfied = e.currentTarget.dataset.satisfied;
    wx.request({
      url: cfg.qjUrl + 'design/satisfied',
      method: 'post',
      data: {
        'id': this.data.design.id,
        // 'satisfied':satisfied
      },
      success: (res) => {
        if (res.statusCode == 200) {
          //       console.log('req result：', res);
          wx.navigateBack({
            delta: 1
          })
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      }
    })
  },
  unsatisfied: function (e) {
    console.log(e);
    // let unsatisfied = e.currentTarget.dataset.unsatisfied;
    wx.request({
      url: cfg.qjUrl + 'design/unsatisfied',
      method: "post",
      data: {
        'id': this.data.question.id,
      },
      success: (res) => {
        if (res.statusCode == 200) {
          //       console.log('req result：', res);
          wx.navigateBack({
            delta: 1
          })
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      }

    })
  }
})