

//openId封装化
const req = function (opt) {
  if (!opt.data) opt.data = {};
  opt.data.openid = wx.getStorageSync('openId');
  wx.request({
    url: opt.url,
    data: opt.data,
    method: opt.method,
    success: function (res) {
      opt.success(res)
    },
    fail: function (res) {
      opt.fail(res)
    }
  })
}
module.exports = {
  req: req
}