const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//根据时间排序

// var compare1 = function (a, b) {
//   return b['createdAt'] < a['createdAt']
// }

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

//formatPrice有问题
const formatPrice = n => {
  n = n.toString()
  return n.substring(0, n.length - 2) + '.' + n.substring(n.length - 2, n.length)
}

const compare = function (prop) {  // 降序排序
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (val1 > val2) {
      return -1;
    } else if (val1 < val2) {
      return 1;
    } else {
      return 0;
    }
  }
}

const transCity = city => {
  // 全国市级城市拼音 - 中文对照表
  const citys = {
    "Beijing": "北京",
    "Tianjin": "天津",
    "Shanghai": "上海",
    "Chongqing": "重庆",
    "Yinchuan": "银川",
    "Shizuishan": "石嘴山",
    "Wuzhong": "吴忠",
    "Guyuan": "固原",
    "Zhongwei": "中卫",
    "Wulumuqi": "乌鲁木齐",
    "Kelamayi": "克拉玛依",
    "Lasa": "拉萨",
    "Huhehaote": "呼和浩特",
    "Baotou": "包头",
    "Wuhai": "乌海",
    "Chifeng": "赤峰",
    "Tongliao": "通辽",
    "Eerduosi": "鄂尔多斯",
    "Hulunbeier": "呼伦贝尔",
    "Bayannaoer": "巴彦淖尔",
    "Wulanchabu": "乌兰察布",
    "Nanning": "南宁",
    "Liuzhou": "柳州",
    "Guilin": "桂林",
    "Wuzhou": "梧州",
    "Beihai": "北海",
    "Chongzuo": "崇左",
    "Laibin": "来宾",
    "Hezhou": "贺州",
    "Yulin": "玉林",
    "Baise": "百色",
    "Hechi": "河池",
    "Qinzhou": "钦州",
    "Fangchenggang": "防城港",
    "Guigang": "贵港",
    "Haerbin": "哈尔滨",
    "Daqing": "大庆",
    "Qiqihaer": "齐齐哈尔",
    "Jiamusi": "佳木斯",
    "Jixi": "鸡西",
    "Hegang": "鹤岗",
    "Shuangyashan": "双鸭山",
    "Mudanjiang": "牡丹江",
    "Yichun": "伊春",
    "Qitaihe": "七台河",
    "Heihe": "黑河",
    "Suihua": "绥化",
    "Changchun": "长春",
    "Jilin": "吉林",
    "Siping": "四平",
    "Liaoyuan": "辽源",
    "Tonghua": "通化",
    "Baishan": "白山",
    "Songyuan": "松原",
    "Baicheng": "白城",
    "Shenyang": "沈阳",
    "Dalian": "大连",
    "Anshan": "鞍山",
    "Fushun": "抚顺",
    "Benxi": "本溪",
    "Dandong": "丹东",
    "Jinzhou": "锦州",
    "Yingkou": "营口",
    "Fuxin": "阜新",
    "Liaoyang": "辽阳",
    "Panjin": "盘锦",
    "Tieling": "铁岭",
    "Chaoyang": "朝阳",
    "Huludao": "葫芦岛",
    "Shijiazhuang": "石家庄",
    "Tangshan": "唐山",
    "Handan": "邯郸",
    "Qinghuangdao": "秦皇岛",
    "Baoding": "保定",
    "Zhangjiakou": "张家口",
    "Chengde": "承德",
    "Langfang": "廊坊",
    "Cangzhou": "沧州",
    "Hengshui": "衡水",
    "Xingtai": "邢台",
    "Jinan": "济南",
    "Qingdao": "青岛",
    "Zibo": "淄博",
    "Zaozhuang": "枣庄",
    "Dongying": "东营",
    "Yantai": "烟台",
    "Weifang": "潍坊",
    "Jining": "济宁",
    "Taian": "泰安",
    "Weihai": "威海",
    "Rizhao": "日照",
    "Laiwu": "莱芜",
    "Linyi": "临沂",
    "Dezhou": "德州",
    "Liaocheng": "聊城",
    "Heze": "菏泽",
    "Binzhou": "滨州",
    "Nanjing": "南京",
    "Zhenjiang": "镇江",
    "Changzhou": "常州",
    "Wuxi": "无锡",
    "Suzhou": "苏州",
    "Xuzhou": "徐州",
    "Lianyungang": "连云港",
    "Huaian": "淮安",
    "Yancheng": "盐城",
    "Yangzhou": "扬州",
    "Taizhou": "泰州",
    "Nantong": "南通",
    "Suqian": "宿迁",
    "Hefei": "合肥",
    "Bengbu": "蚌埠",
    "Wuhu": "芜湖",
    "Huainan": "淮南",
    "Bozhou": "亳州",
    "Fuyang": "阜阳",
    "Huaibei": "淮北",
    "Suzhou": "宿州",
    "Chuzhou": "滁州",
    "Anqing": "安庆",
    "Chaohu": "巢湖",
    "Maanshan": "马鞍山",
    "Xuancheng": "宣城",
    "Huangshan": "黄山",
    "Chizhou": "池州",
    "Tongling": "铜陵",
    "Hangzhou": "杭州",
    "Jiaxing": "嘉兴",
    "Huzhou": "湖州",
    "Ningbo": "宁波",
    "Jinhua": "金华",
    "Wenzhou": "温州",
    "Lishui": "丽水",
    "Shaoxing": "绍兴",
    "Quzhou": "衢州",
    "Zhoushan": "舟山",
    "Taizhou": "台州",
    "Fuzhou": "福州",
    "Xiamen": "厦门",
    "Quanzhou": "泉州",
    "Sanming": "三明",
    "Nanping": "南平",
    "Zhangzhou": "漳州",
    "Putian": "莆田",
    "Ningde": "宁德",
    "Longyan": "龙岩",
    "Guangzhou": "广州",
    "Shenzhen": "深圳",
    "Shantou": "汕头",
    "Huizhou": "惠州",
    "Zhuhai": "珠海",
    "Jieyang": "揭阳",
    "Foshan": "佛山",
    "Heyuan": "河源",
    "Yangjiang": "阳江",
    "Maoming": "茂名",
    "Zhanjiang": "湛江",
    "Meizhou": "梅州",
    "Zhaoqing": "肇庆",
    "Shaoguan": "韶关",
    "Chaozhou": "潮州",
    "Dongguan": "东莞",
    "Zhongshan": "中山",
    "Qingyuan": "清远",
    "Jiangmen": "江门",
    "Shanwei": "汕尾",
    "Yunfu": "云浮",
    "Haikou": "海口",
    "Sanya": "三亚",
    "Kunming": "昆明",
    "Qujing": "曲靖",
    "Yuxi": "玉溪",
    "Baoshan": "保山",
    "Zhaotong": "昭通",
    "Lijiang": "丽江",
    "Puer": "普洱",
    "Lincang": "临沧",
    "Guiyang": "贵阳",
    "Liupanshui": "六盘水",
    "Zunyi": "遵义",
    "Anshun": "安顺",
    "Chengdu": "成都",
    "Mianyang": "绵阳",
    "Deyang": "德阳",
    "Guangyuan": "广元",
    "Zigong": "自贡",
    "Panzhihua": "攀枝花",
    "Leshan": "乐山",
    "Nanchong": "南充",
    "Neijiang": "内江",
    "Suining": "遂宁",
    "Guangan": "广安",
    "Luzhou": "泸州",
    "Dazhou": "达州",
    "Meishan": "眉山",
    "Yibin": "宜宾",
    "Yaan": "雅安",
    "Ziyang": "资阳",
    "Changsha": "长沙",
    "Zhuzhou": "株洲",
    "Xiangtan": "湘潭",
    "Hengyang": "衡阳",
    "Yueyang": "岳阳",
    "Chenzhou": "郴州",
    "Yongzhou": "永州",
    "Shaoyang": "邵阳",
    "Huaihua": "怀化",
    "Changde": "常德",
    "Yiyang": "益阳",
    "Zhangjiajie": "张家界",
    "Loudi": "娄底",
    "Wuhan": "武汉",
    "Xiangfan": "襄樊",
    "Yichang": "宜昌",
    "Huangshi": "黄石",
    "Ezhou": "鄂州",
    "Suizhou": "随州",
    "Jingzhou": "荆州",
    "Jingmen": "荆门",
    "Shiyan": "十堰",
    "Xiaogan": "孝感",
    "Huanggang": "黄冈",
    "Xianning": "咸宁",
    "Zhengzhou": "郑州",
    "Luoyang": "洛阳",
    "Kaifeng": "开封",
    "Luohe": "漯河",
    "Anyang": "安阳",
    "Xinxiang": "新乡",
    "Zhoukou": "周口",
    "Sanmenxia": "三门峡",
    "Jiaozuo": "焦作",
    "Pingdingshan": "平顶山",
    "Xinyang": "信阳",
    "Nanyang": "南阳",
    "Hebi": "鹤壁",
    "Puyang": "濮阳",
    "Xuchang": "许昌",
    "Shangqiu": "商丘",
    "Zhumadian": "驻马店",
    "Taiyuan": "太原",
    "DaTong": "大同",
    "Xinzhou": "忻州",
    "Yangquan": "阳泉",
    "Changzhi": "长治",
    "Jincheng": "晋城",
    "Shuozhou": "朔州",
    "Jinzhong": "晋中",
    "Yuncheng": "运城",
    "Linfen": "临汾",
    "Lvliang": "吕梁",
    "Xian": "西安",
    "Xianyang": "咸阳",
    "Tongchuan": "铜川",
    "Yanan": "延安",
    "Baoji": "宝鸡",
    "Weinan": "渭南",
    "Hanzhoung": "汉中",
    "Ankang": "安康",
    "Shangluo": "商洛",
    "Yulin": "榆林",
    "Lanzhou": "兰州",
    "Tianshui": "天水",
    "Pingliang": "平凉",
    "Jiuquan": "酒泉",
    "Jiayuguan": "嘉峪关",
    "Jinchang": "金昌",
    "baiyiin": "白银",
    "Wuwei": "武威",
    "Zhangye": "张掖",
    "Qingyang": "庆阳",
    "Dingxi": "定西",
    "Longnan": "陇南",
    "Xining": "西宁",
    "Nanchang": "南昌",
    "Jiujiang": "九江",
    "Ganzhou": "赣州",
    "Jian": "吉安",
    "Yingtan": "鹰潭",
    "Shangrao": "上饶",
    "Pingxiang": "萍乡",
    "Jingdezhen": "景德镇",
    "Xinyu": "新余",
    "Yichun": "宜春",
    "Fuzhou": "抚州"
  }
  if (citys[city]) {
    return citys[city]
  } else {
    return city
  }
}

const questions = function () {
  var question = [
    {
      "name": '“奇纪时尚，你穿我搭”是一个什么类型的小程序。',
      "viewid": '0',
      "content_url": "../helpMessage/helpMessage",
      "content": '奇纪时尚，你穿我搭是一款专业的形象设计咨询和服务平台。客户可以“线上测试系统”，对自己的肤色风格体系等特质进行了解。“咨询”“找顾问”提问，解决我们日常的穿搭疑问，并由专业的形象顾问给出专业搭配方案。“私人衣橱”，上传我们的个人服饰，由专业的形象顾问给你把关，它们是否适合你等。平台包含线上测试系统、专业咨询回复、商城商品推荐，专业顾问等功能板块，形成从测试到设计服务到产品推荐三位一体的形象设计平台。'
    },

    {
      "name": '我在“奇纪时尚，你穿我搭”咨询，个人信息是否安全。',
      "viewid": '1',
      "content_url": "../helpMessage/helpMessage",
      "content": '您在平台的注册信息、个人账号都是保密的，请您放心！不过需要提示您，请您在咨询过程中不要将个人手机号码、微信等联系方式告知形象顾问，如您脱离平台与医生私下联络，平台将无法保护您的权益。'
    },

    {
      "name": '如何购买“商家平台”中的服饰？',
      "viewid": '2',
      "content_url": "../helpMessage/helpMessage",
      "content": '“商家平台”的中的服饰，主要是专业顾问在搭配方案时，选用推荐的服饰。如果需要购买。点击相应商品，可以直接与商家联系沟通购买。销售及售后由相应商家负责完成。'
    },
    {
      "name": '什么问题可以在“奇纪时尚，你穿我搭”咨询。',
      "viewid": '3',
      "content_url": "../helpMessage/helpMessage",
      "content": '“奇纪时尚，你穿我搭”平台提供形象设计方面的咨询服务。日常的穿搭，发型，妆面等都可以进行咨询。在进行提问咨询前，需完成形象测试（目前测试免费）。提问问题不要过于广而泛的问题：例如：我适合穿什么衣服/包/鞋？问题要具体，精简。例如：这套衣服适合我约会用吗？/ 这双鞋与我这套衣服搭配是否合理？/这件服饰适合我穿吗？等不要同时文几个问题，否则顾问只会针对提出的第一个问题进行解答。您提出问题的后所满意的方案，会在“个人中心”中的“我的方案”中查看。'
    },
    {
      "name": '提问是否收费？',
      "viewid": '4',
      "content_url": "../helpMessage/helpMessage",
      "content": '形象顾问都是经过专业的学习和培训考核后，才能入住到平台，付出时间和精力理应获得相应报酬，提问可以通过“咨询”或者“找顾问”的方式进行图文提问。“咨询”目前收费为1元/次，随机分配1个专业顾问进行解答。“找顾问”根据选择不同的顾问级别付费。您可以更具实际需求进行选择。'
    },
    {
      "name": '提问后多少时间可以得到回复？',
      "viewid": '5',
      "content_url": "../helpMessage/helpMessage",
      "content": '目前回复时间为24小时内。'
    },
    {
      "name": '形象测试中照片应该怎么拍？',
      "viewid": '6',
      "content_url": "../helpMessage/helpMessage",
      "content": '形象测试系统，是一款智能个人形象识别加人工辅助的系统。所上传照片如果不符合要求，会影响测试，甚至无法测试。照片要求背景简单干净，最好是纯色背景。其中正面照片必须是无美颜PS，素颜照（如每天有化妆习惯，可画淡妆）。形象测试结果，您在24小时内，通过“个人中心”中的“会员档案”中查看。其中肤色测试需另行收费 ，1680元/人，可联系客服进行咨询。'
    },
    {
      "name": '私人衣橱是什么？',
      "viewid": '7',
      "content_url": "../helpMessage/helpMessage",
      "content": ' 私人衣橱就是您个人的线上电子衣橱，可以形成专业的个人服饰数据。您可以通过“私人衣橱”上传自己的服装，包，鞋 ，饰品等。并由专业顾问判断是否适合您？ 目前收费为1元/件。顾问在在进行搭配方案时，顾问首先选择私人衣橱中合适的服饰进行搭配。'
    },
    {
      "name": '为什么我上传在私人衣橱中的服饰无法判断？',
      "viewid": '8',
      "content_url": "../helpMessage/helpMessage",
      "content": '在上传个人服饰应注意：1、上传的服饰背景应简单干净，最好是纯色背景。 2、照片要清晰。 3、要对服饰规格进行描述，如衣服的长短/厚薄，包的长款，饰品的大小等。4、如照片有严重色差，可在服饰尺寸描述中简单说明。'
    },
    {
      "name": '支付方式有哪些？',
      "viewid": '9',
      "content_url": "../helpMessage/helpMessage",
      "content": '首次登陆会送相一定数量的优惠券，优惠券使用完后，可以选择“充值”或者“微信支付”的方式进行支付。'
    }
  ]
  return question;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  transCity: transCity,
  compare: compare,
  formatPrice: formatPrice,
  questions: questions,
  // compare1: compare1
}
