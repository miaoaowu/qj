//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js');

//获取应用实例
const app = getApp();


let selectedStyle = ""; // 当前选择的风格
let selectedType = ""; // 当前选择的类型
let selectedPriceRange = ""; // 当前选择的价位
let pictures = []; // 商品图片列表

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    commodity: [],
    pageNum: 0,
    style: ['全部', '优雅', '古典', '自然', '前卫', '少女', '少年', '浪漫', '戏剧','罗曼','异域'],
    ctype: ['全部', '外套', '上装', '下装', '连衣裙', '包', '鞋', '饰品'],
    priceRange: ['全部', '200元以下', '200~499元', '500~999元', '1000~1499元', '1500~1999元', '2000元以上']
  },

  dataLeftCompleting: function (bits, identifier, value) {
    value = Array(bits + 1).join(identifier) + value;
    return value.slice(-bits);
  },

  getList: function () { //分页获取商品信息
    var that = this;
    req({
      url: cfg.qjUrl + 'commodity/list',
      method: 'get',
      data: {
        'styles': selectedStyle,
        'type': selectedType,
        'priceRange': selectedPriceRange,
        'pageNum': that.data.pageNum
      },
      success: (res) => {
        console.log("djjsds", res)
        if (res.statusCode == 200) {

          //如果商品返回的数据为空
          if (res.data.msg.length == 0) {
            wx.showToast({
              title: "没有更多的数据了...",
              icon: 'fail',
              duration: 1000
            });
          } else {
            let commodity = res.data.msg;
            //将图片路径转换为全路径
            for (let i in commodity) {
              let detail = encodeURIComponent(commodity[i].detail)
              commodity[i].detail = detail;
              commodity[i].id = "ME" + this.dataLeftCompleting(11, "0", commodity[i].id)
              if (commodity[i].picture) {
                commodity[i].picture = cfg.qiniuDomain + commodity[i].picture
              } else {
                commodity[i].picture = 'https://qj.foxcodes.cn/images/logo.jpg'
              }
              this.data.commodity.push(commodity[i]);
            }

            this.setData({
              commodity: this.data.commodity,
            });
          }
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }

      },
      fail: function (res) {
        console.log('网络访问失败！')
      }

    })
  },

  //上拉分页
  onReachBottom: function () {
    //上拉分页,pageNum+1，然后调用分页函数getLsit()
    var that = this;
    that.setData({
      pageNum: ++that.data.pageNum
    });
    wx.showToast({
      icon: 'loading',
      duration: 500,
    })
    that.getList();
    that.setData({
      title: "数据加载完毕"
    })

  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageNum: 0,
      commodity: [],
    })
    that.getList();
    wx.stopPullDownRefresh();
  },

  onLoad: function (options) {

    this.getList();


  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '商家平台',
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  previewImage: function (e) {
    console.log(e.currentTarget);
    console.log(pictures);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: pictures // 需要预览的图片http链接列表
    })
  },
  showDetail: function (e) {
    app.globalData.costumes = [{
      "url": this.data.commodity[e.currentTarget.id].detail
    }];
    wx.navigateTo({
      url: '../showCostume/showCostume?url=' + this.data.commodity[e.currentTarget.id].detail + "&name=" + this.data.commodity[e.currentTarget.id].name + "&picture=" + this.data.commodity[e.currentTarget.id].picture
    })
  },
  contactHandle: function (e) {

  },

  bindPickerChange: function (e) {
    let column = e.currentTarget.dataset.column;
    let idx = e.detail.value;
    console.log(column, idx);
    console.log('picker发送选择改变，携带值为', idx, this.data[column][idx]);
    let v = this.data[column][idx];
    if (v == "全部") {
      v = "";
    }
    switch (column) {
      case "style":
        selectedStyle = v;
        break;
      case "ctype":
        selectedType = v;
        break;
      case "priceRange":
        selectedPriceRange = v;
        break;
    }
    console.log("selectedStyle:", selectedStyle, "selectedType:", selectedType, "selectedPriceRange:", selectedPriceRange);
    // 取得选定商品信息
    req({
      url: cfg.qjUrl + 'commodity/list',
      method: 'get',
      data: {
        'styles': selectedStyle,
        'type': selectedType,
        'priceRange': selectedPriceRange,
        'pageNum':this.data.pageNum
      },
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('返回商品列表，req result：', res);
          
          let commodity = res.data.msg;
          //将图片路径转换为全路径
          for (let i in commodity) {
            commodity[i].id = "ME" + this.dataLeftCompleting(11, "0", commodity[i].id)
            if (commodity[i].picture) {
              commodity[i].picture = cfg.qiniuDomain + commodity[i].picture
            } else {
              commodity[i].picture = 'https://qj.foxcodes.cn/images/logo.jpg'
            }
            pictures.push(commodity[i].picture); // 将商品图片url保存到pictures数组中
          }
          console.log("comodity排序前: ", commodity);
          commodity.sort(util.compare("priority")); // 将商品按prioriy降序排序
          console.log("comodity排序后: ", commodity);
          this.setData({
            commodity: commodity
          });
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    })

    this.setData({
      index: e.detail.value
    })
  }
})