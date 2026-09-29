// pages/cart/cart.js —— 购物车
const { SHOP } = require("../../utils/config");
const cart = require("../../utils/cart");

Page({
  data: {
    shop: SHOP,
    items: [],
    sum: { count: 0, checkedCount: 0, amount: 0, amountText: "0.00", allChecked: false },

    // ---------- 小猫加载 ----------
    catShow: false,
    catText: "小猫正在清点购物车…",
    catSub: "看看都买齐了没",
  },

  onShow() {
    this.refresh();
    this.loadCart();
  },

  /**
   * 第一次进购物车时让小猫清点一下（本地数据是同步的，
   * 以后换成云端购物车，把这里替换成请求即可）。
   */
  loadCart() {
    if (this._loaded) return;
    this._loaded = true;
    this.setData({ catShow: true });
    setTimeout(() => this.setData({ catShow: false }), 520);
  },

  /** 用最新数据刷新页面 + 角标 */
  apply(items) {
    const list = items || cart.list();
    cart.refreshBadge(list);
    this.setData({ items: list, sum: cart.summary(list) });
  },

  refresh() {
    this.apply(cart.list());
  },

  onToggle(e) {
    this.apply(cart.toggle(e.currentTarget.dataset.id));
  },

  onToggleAll() {
    this.apply(cart.toggleAll(!this.data.sum.allChecked));
  },

  onMinus(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.items.filter((it) => it.id === id)[0];
    if (!item) return;
    if (item.count <= 1) {
      this.confirmRemove(id, item.name);
      return;
    }
    this.apply(cart.setCount(id, item.count - 1));
  },

  onPlus(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.items.filter((it) => it.id === id)[0];
    if (!item) return;
    this.apply(cart.setCount(id, item.count + 1));
  },

  onRemove(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.items.filter((it) => it.id === id)[0];
    this.confirmRemove(id, item ? item.name : "");
  },

  confirmRemove(id, name) {
    wx.showModal({
      title: "移出购物车",
      content: name ? `不再购买「${name}」了吗？` : "确定要移出这件商品吗？",
      confirmColor: "#c25a2e",
      success: (res) => {
        if (res.confirm) this.apply(cart.remove(id));
      },
    });
  },

  onClear() {
    wx.showModal({
      title: "清空购物车",
      content: "确定要清空购物车里的全部商品吗？",
      confirmColor: "#c25a2e",
      success: (res) => {
        if (res.confirm) this.apply(cart.clear());
      },
    });
  },

  onCheckout() {
    if (!this.data.sum.checkedCount) {
      wx.showToast({ title: "请先选择商品", icon: "none" });
      return;
    }
    wx.showModal({
      title: "下单功能开发中",
      content: `已选 ${this.data.sum.checkedCount} 件，合计 ${SHOP.currency}${this.data.sum.amountText}。线上支付尚未开通，敬请期待。`,
      showCancel: false,
      confirmColor: "#c25a2e",
    });
  },

  onGoHome() {
    wx.switchTab({ url: "/pages/home/home" });
  },
});
