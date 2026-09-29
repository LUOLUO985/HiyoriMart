// pages/home/home.js —— 主页
const { SHOP } = require("../../utils/config");
const mock = require("../../utils/mock");
const cart = require("../../utils/cart");

/**
 * 现在数据是本地假数据（同步返回），这里假装网络要走一会儿，
 * 好让「小猫加载」露个脸。以后接真实接口时，把 setTimeout 换成请求即可，
 * 开 / 关加载的写法完全不用改。
 */
const FAKE_NETWORK_MS = 700;

/** 下拉多少（px）算「拉够了」，要和 home.wxml 里的 refresher-threshold 保持一致 */
const REFRESH_THRESHOLD = 80;

/** 商品区块：想加新区块，在这里复制一段（id 对应 utils/mock.js 里的分类 id） */
function buildSections() {
  return [
    {
      id: "sauce",
      title: "家乡的味道",
      sub: "酱香一开，就是回家的味道",
      list: mock.byIds(["p01", "p02", "p03", "p04"]),
    },
    {
      id: "frozen",
      title: "速冻 · 面点",
      sub: "冰箱里囤着的，是团圆饭的味道",
      list: mock.byIds(["p11", "p12", "p13", "p14"]),
    },
    {
      id: "instant",
      title: "五分钟开饭",
      sub: "加个蛋，就是一顿热乎饭",
      list: mock.byIds(["p15", "p16", "p17", "p18"]),
    },
  ];
}

Page({
  data: {
    shop: SHOP,
    banners: [],              // 轮播图（image 留空 = 占位框）
    navs: [],                 // 分类金刚区
    sections: [],             // 商品区块

    // ---------- 小猫加载 ----------
    catShow: false,                     // 整屏小猫加载
    catText: "小猫正在把货摆上架…",
    catSub: "第一次打开会慢一点点",
    refreshing: false,                  // 下拉刷新中
    refreshText: "下拉，让小猫去进货",
  },

  onLoad() {
    this.loadHome(true);
  },

  onShow() {
    cart.refreshBadge();
  },

  /** 拉首页数据（catShow 关掉时，就是「货已到」） */
  loadHome(withCat) {
    if (withCat) this.setData({ catShow: true });
    setTimeout(() => {
      this.setData({
        banners: mock.banners,
        navs: mock.categories,
        sections: buildSections(),
        catShow: false,
      });
    }, FAKE_NETWORK_MS);
  },

  /** 下拉：手指还没松 */
  onRefresherPulling(e) {
    if (this.data.refreshing) return;
    const dy = (e.detail && e.detail.dy) || 0;
    const text = dy >= REFRESH_THRESHOLD ? "松手，小猫立刻出发" : "下拉，让小猫去进货";
    if (text !== this.data.refreshText) this.setData({ refreshText: text });
  },

  /** 松手后的下拉刷新：小猫去进货 */
  onRefresh() {
    this.setData({ refreshing: true, refreshText: "小猫正在进货…" });
    setTimeout(() => {
      this.setData({
        banners: mock.banners,
        navs: mock.categories,
        sections: buildSections(),
        refreshing: false,
        refreshText: "下拉，让小猫去进货",
      });
      wx.showToast({ title: "货架已经整理好", icon: "none" });
    }, FAKE_NETWORK_MS + 200);
  },

  /** 下拉区域回弹没走完时的兜底 */
  onRefresherRestore() {
    if (this.data.refreshing) this.setData({ refreshing: false });
  },

  /** 去搜索页 */
  onSearch() {
    wx.switchTab({ url: "/pages/search/search" });
  },

  /** 点分类 / 点「全部」→ 跳到分类页并定位 */
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    try {
      wx.setStorageSync("xiangwei_active_cat", id);
    } catch (err) {
      // 忽略
    }
    wx.switchTab({ url: "/pages/category/category" });
  },

  /** 加入购物车 */
  onAdd(e) {
    cart.addAndToast(e.detail.item);
  },

  /** 商品详情：后续接入详情页 */
  onGoods(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: "商品详情页开发中", icon: "none" });
    console.log("商品 id:", id);
  },

  onBannerTap(e) {
    console.log("轮播图:", e.currentTarget.dataset.title);
    wx.showToast({ title: "活动详情开发中", icon: "none" });
  },
});
