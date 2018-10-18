// pages/orderFood/orderFood.js
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    tabs: ["风格一", "风格二", "风格三"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    //scrollview 高度
    windowHeight: 0,    //高度

    //风格一数据
    currentTab1: 0,	 	//导航栏指向
    goodsList1: [            // 分类
      {
        id: 0,
        name: '上装'
      },
      {
        id: 1,
        name: '下装'
      },
      {
        id: 2,
        name: '套装/裙装'
      },
      {
        id: 3,
        name: '鞋子'
      },
      {
        id: 4,
        name: '帽子/饰品'
      },
      {
        id: 5,
        name: '其他'
      }
    ],
    classifyList1:    //所有商品信息
    [
      [
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 1,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 2,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 3,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 4,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 5,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 6,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 7,
          "num": 1
        }
      ],
      [
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 8,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 9,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 10,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 11,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 12,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 13,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 14,
          "num": 1
        }
      ],
      [
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 15,
          "num": 1
        },
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 16,
          "num": 1
        },
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 17,
          "num": 1
        }
      ],
      [
        {
          "name": "红蜻蜓女鞋",
          "price": 18,
          "url": "../../image/shop/shoes.jpg",
          "introduce": "2018春季新款单鞋女真皮鞋",

          "id": 18,
          "num": 1
        },
        {
          "name": "红蜻蜓女鞋",
          "price": 18,
          "url": "../../image/shop/shoes.jpg",
          "introduce": "2018春季新款单鞋女真皮鞋",

          "id": 19,
          "num": 1
        }
      ],
      [
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 20,
          "num": 1
        },
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 21,
          "num": 1
        },
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 22,
          "num": 1
        },
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 23,
          "num": 1
        }
      ],
      [
        {
          "name": "人气女包",
          "price": 18,
          "url": "../../image/shop/bag.jpg",
          "introduce": "2018春季新款女真皮包",

          "id": 24,
          "num": 1
        }
      ]
    ],

    //风格二数据
    currentTab2: 2,	 	//导航栏指向
    goodsList2: [            // 分类
      {
        id: 0,
        name: '上装'
      },
      {
        id: 1,
        name: '下装'
      },
      {
        id: 2,
        name: '套装/裙装'
      },
      {
        id: 3,
        name: '鞋子'
      },
      {
        id: 4,
        name: '帽子/饰品'
      },
      {
        id: 5,
        name: '其他'
      }
    ],
    classifyList2:    //所有商品信息
    [
      [
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 1,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 2,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 3,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 4,
          "num": 1
        }
      ],
      [
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 8,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 9,
          "num": 1
        },
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 10,
          "num": 1
        }
      ],
      [
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 15,
          "num": 1
        },
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 16,
          "num": 1
        },
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 17,
          "num": 1
        }
      ],
      [
        {
          "name": "红蜻蜓女鞋",
          "price": 18,
          "url": "../../image/shop/shoes.jpg",
          "introduce": "2018春季新款单鞋女真皮鞋",

          "id": 18,
          "num": 1
        },
        {
          "name": "红蜻蜓女鞋",
          "price": 18,
          "url": "../../image/shop/shoes.jpg",
          "introduce": "2018春季新款单鞋女真皮鞋",

          "id": 19,
          "num": 1
        }
      ],
      [
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 20,
          "num": 1
        },
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 21,
          "num": 1
        }
      ],
      [
        {
          "name": "人气女包",
          "price": 18,
          "url": "../../image/shop/bag.jpg",
          "introduce": "2018春季新款女真皮包",

          "id": 24,
          "num": 1
        }
      ]
    ],


    //风格三数据
    currentTab3: 3,	 	//导航栏指向
    goodsList3: [            // 分类
      {
        id: 0,
        name: '上装'
      },
      {
        id: 1,
        name: '下装'
      },
      {
        id: 2,
        name: '套装/裙装'
      },
      {
        id: 3,
        name: '鞋子'
      },
      {
        id: 4,
        name: '帽子/饰品'
      },
      {
        id: 5,
        name: '其他'
      }
    ],
    classifyList3:    //所有商品信息
    [
      [
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 1,
          "num": 1
        },
        {
          "name": "雪纺衬衫女长袖",
          "price": 99,
          "url": "../../image/shop/shirt.jpg",
          "introduce": "2018新款中长款韩版宽松",

          "id": 2,
          "num": 1
        }
      ],
      [
        {
          "name": "茵曼新款磨白牛仔裤",
          "price": 188,
          "url": "../../image/shop/trousers.jpg",
          "introduce": "宽松大码高腰裤子",

          "id": 8,
          "num": 1
        }
      ],
      [
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 15,
          "num": 1
        },
        {
          "name": "艾妮女装连衣裙",
          "price": 88,
          "url": "../../image/shop/tracksuit.jpg",
          "introduce": "套装裙2018",

          "id": 16,
          "num": 1
        }
      ],
      [
        {
          "name": "红蜻蜓女鞋",
          "price": 18,
          "url": "../../image/shop/shoes.jpg",
          "introduce": "2018春季新款单鞋女真皮鞋",

          "id": 18,
          "num": 1
        }
      ],
      [
        {
          "name": "上海故事真丝丝巾",
          "price": 18,
          "url": "../../image/shop/accessories.jpg",
          "introduce": "女春夏季高档桑蚕丝防晒纱巾",

          "id": 20,
          "num": 1
        }
      ],
      [
        {
          "name": "人气女包",
          "price": 18,
          "url": "../../image/shop/bag.jpg",
          "introduce": "2018春季新款女真皮包",

          "id": 24,
          "num": 1
        }
      ]
    ],
  },



	/**
	 * 生命周期函数--监听页面加载
	 */

  //改变左侧导航
  changeNav1: function (event) {
    this.setData({
      currentTab1: event.target.dataset.currentab,
    })
  },
  changeNav2: function (event) {
    this.setData({
      currentTab2: event.target.dataset.currentab,
    })
  },
  changeNav3: function (event) {
    this.setData({
      currentTab3: event.target.dataset.currentab,
    })
  },
  onLoad: function (options) {
    console.log(options);
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.setData({
          windowHeight: res.windowHeight
        })
        console.log(`屏幕高度：${res.windowHeight}`);
      }
    })
    console.log(app.globalData);

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  //改变顶部标签
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
    // 展示的时候刷新全局信息
    this.setData({
      // cart: app.globalData.carts,
      // cartTotal: app.globalData.cartTotal,
      // cartTotalPrice: app.globalData.cartTotalPrice,
      // classifyList: app.globalData.classifyList.myFruits,
    });
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