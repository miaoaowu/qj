const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['商品', '文章', '顾问'], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    value: '',
    resultList: [],
    pageNum: 0,
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  lower(){
    this.search()
  },
  search() {
    console.log(this.data.value)
    if (this.data.value) {
      var that = this
      req({
        url: cfg.qjUrl + 'search/list?pageNum='+that.data.pageNum,
        method: 'get',
        data: {
          type: that.data.selectData[that.data.index],
          value: that.data.value
        },
        success: (res) => {
          var d = res.data.c
          console.log(d)
          var arr = that.data.resultList
          d.forEach((ele, i) => {
            var obj = {}
            if (that.data.index == 0) {
              obj.title = ele.name
              obj.img = cfg.qiniuDomain + ele.picture
              obj.desc = ele.priceRange
              obj.id = ele.id
              obj.selectType = '0'
              obj.type = ele.type
              obj.detail = ele.detail
              obj.retailId = ele.retailId
            } else if (that.data.index == 1) {
              console.log(ele)
              obj.title = ele.title
              obj.img = ele.image
              obj.desc = ele.updatedAt.slice(0, 10)
              obj.id = ele.id
              obj.selectType = '1'
              obj.content_url = ele.content_url
            } else if (that.data.index == 2) {
              console.log(ele)
              obj.title = ele.name
              obj.img = cfg.qiniuDomain + ele.avata
              obj.desc = ele.qualifications
              obj.id = ele.id
              obj.selectType = '2'
            }
            arr.push(obj)
          })
          that.setData({
            resultList: arr,
            pageNum: ++ that.data.pageNum 
          })
          console.log(this.data.pageNum)
        },
        fail: function(res) {
          console.log('网络访问失败！')
        }
      })
    }
  },
  searchBtn() {

    this.search()

  },
  changeInput(e) {
    this.setData({
      value: e.detail.value,
      resultList: [],
      pageNum: 0,
    })
  },
  tapTarget(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    if (e.currentTarget.dataset.data == 0) {
      app.globalData.search_data = this.data.resultList[index]
      wx.navigateTo({
        url: '../showGoods/showGoods'
      })
    } else if (e.currentTarget.dataset.data == 1) {
      app.globalData.aticle_data = this.data.resultList[index].content_url
      console.log(app.globalData.aticle_data)
      wx.navigateTo({
        url: '../showArticles/showArticles'
      })

    } else if (e.currentTarget.dataset.data == 2) {
      wx.navigateTo({
        url: "../consultantDetail/consultantDetail?id=" + e.currentTarget.dataset.id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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
// 防抖
function debounce(fn, delay) {
  // 维护一个 timer
  let timer = null;

  return function() {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}

function handle(_type, value) {
  req({
    url: cfg.qjUrl + 'search/list',
    method: 'get',
    data: {
      type: _type,
      value
    },
    success: (res) => {},
    fail: function(res) {
      console.log('网络访问失败！')
    }
  })
}