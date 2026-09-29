// pages/search/search.js —— 搜索
const { SHOP } = require("../../utils/config");
const mock = require("../../utils/mock");
const cart = require("../../utils/cart");

const HISTORY_KEY = "xiangwei_search_history";

// 假数据是同步的，这里留一点时间给「小猫找货」；接真实接口后可删。
const SEARCH_MS = 420;

Page({
  data: {
    shop: SHOP,
    keyword: "",
    history: [],           // 最近搜索
    hot: mock.hotKeywords, // 热门关键词
    results: [],
    searched: false,
    searching: false,      // 搜索中：小猫在货架间找

    // ---------- 小猫加载（整屏，留给以后的网络等待） ----------
    catShow: false,
    catText: "小猫正在找货…",
    catSub: "",
  },

  onLoad() {
    this.loadHistory();
  },

  onShow() {
    cart.refreshBadge();
  },

  loadHistory() {
    let history = [];
    try {
      history = wx.getStorageSync(HISTORY_KEY) || [];
    } catch (e) {
      history = [];
    }
    this.setData({ history });
  },

  saveHistory(keyword) {
    const list = [keyword]
      .concat(this.data.history.filter((k) => k !== keyword))
      .slice(0, 10);
    try {
      wx.setStorageSync(HISTORY_KEY, list);
    } catch (e) {
      // 忽略
    }
    this.setData({ history: list });
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value });
  },

  onConfirm(e) {
    this.doSearch(e.detail.value);
  },

  onTagTap(e) {
    const kw = e.currentTarget.dataset.kw;
    this.setData({ keyword: kw });
    this.doSearch(kw);
  },

  onClearKeyword() {
    this.setData({ keyword: "", results: [], searched: false, searching: false });
  },

  onClearHistory() {
    wx.showModal({
      title: "清空搜索记录",
      content: "确定要清空最近搜索吗？",
      confirmColor: "#c25a2e",
      success: (res) => {
        if (!res.confirm) return;
        try {
          wx.removeStorageSync(HISTORY_KEY);
        } catch (e) {
          // 忽略
        }
        this.setData({ history: [] });
      },
    });
  },

  /** 搜之前先让小猫在货架间跑一趟 */
  doSearch(rawKeyword) {
    const keyword = String(rawKeyword || "").trim();
    if (!keyword) {
      wx.showToast({ title: "请先输入关键词", icon: "none" });
      return;
    }
    this.saveHistory(keyword);
    this.setData({
      keyword,
      searched: true,
      searching: true,
      results: [],
    });

    setTimeout(() => {
      // 关键词可能在等待期间又被改了，只认最后一次
      if (this.data.keyword !== keyword) return;
      this.setData({
        results: mock.search(keyword),
        searching: false,
      });
    }, SEARCH_MS);
  },

  onAdd(e) {
    cart.addAndToast(e.detail.item);
  },

  onGoods(e) {
    console.log("商品 id:", e.currentTarget.dataset.id);
    wx.showToast({ title: "商品详情页开发中", icon: "none" });
  },

  onGoCategory() {
    wx.switchTab({ url: "/pages/category/category" });
  },
});
