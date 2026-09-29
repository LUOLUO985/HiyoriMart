// app.js
const { SHOP } = require("./utils/config");
const cart = require("./utils/cart");

App({
  globalData: {
    // env 参数说明：
    // env 决定小程序发起的云开发调用（wx.cloud.xxx）请求到哪个云环境的资源。
    // 环境 ID 可在微信开发者工具顶部工具栏点击「云开发」按钮打开获取。
    env: "",
    // 门店信息：统一在 utils/config.js 中修改
    shop: SHOP,
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
    // 同步购物车角标
    cart.refreshBadge();
  },
});
