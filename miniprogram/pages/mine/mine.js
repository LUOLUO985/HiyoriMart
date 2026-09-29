// pages/mine/mine.js —— 我的
const { SHOP } = require("../../utils/config");
const cart = require("../../utils/cart");
const catLoading = require("../../utils/cat-loading");

Page({
  data: {
    shop: SHOP,
    user: {
      avatar: "",          // 头像图片位：填路径即可显示
      nickname: "Hiyori 的老朋友",
      desc: "登录后可查看订单与收藏",
    },
    orders: [
      { id: "pickup", emoji: "🧺", name: "待自提" },
      { id: "done", emoji: "🍚", name: "已完成" },
      { id: "all", emoji: "📋", name: "全部订单" },
    ],
    services: [
      { id: "address", emoji: "📍", name: "收货地址" },
      { id: "support", emoji: "☎️", name: "联系门店" },
      { id: "about", emoji: "🏪", name: "关于 Hiyori" },
    ],

    // ---------- 小猫加载 ----------
    catShow: false,
    catText: "小猫正在翻你的资料…",
    catSub: "马上就好",
  },

  onShow() {
    cart.refreshBadge();
    this.loadMine();
  },

  /** 第一次进「我的」时让小猫去后台拿资料（本地数据同步，这里只是露个脸） */
  loadMine() {
    if (this._loaded) return;
    this._loaded = true;
    this.setData({ catShow: true });
    setTimeout(() => this.setData({ catShow: false }), 520);
  },

  onLogin() {
    // 以后接微信登录，就把 flash 换成 catLoading.wrap(登录请求, "…")
    catLoading.flash("小猫正在核对身份…", 900);
    setTimeout(() => wx.showToast({ title: "登录功能开发中", icon: "none" }), 900);
  },

  onOrder(e) {
    console.log("订单类型:", e.currentTarget.dataset.id);
    wx.showToast({ title: "订单功能开发中", icon: "none" });
  },

  onService(e) {
    const id = e.currentTarget.dataset.id;
    if (id === "support" || id === "about") {
      wx.showModal({
        title: SHOP.name,
        content: `地址：${SHOP.address}\n营业时间：${SHOP.hours}\n电话：${SHOP.phone}`,
        confirmText: "拨打",
        cancelText: "知道了",
        confirmColor: "#c25a2e",
        success: (res) => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: SHOP.phone.replace(/\s/g, ""),
              fail: () => {},
            });
          }
        },
      });
      return;
    }
    wx.showToast({ title: "功能开发中", icon: "none" });
  },

  onNavStore() {
    wx.showToast({ title: "地图导航开发中", icon: "none" });
  },
});
