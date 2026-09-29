// pages/category/category.js —— 分类
const { SHOP } = require("../../utils/config");
const mock = require("../../utils/mock");
const cart = require("../../utils/cart");

const CATS = mock.categories;

// 假数据是同步的，这里留一点时间让「小猫去另一排货架」露个脸；接真实接口后可删。
const SWITCH_MS = 340;
const FIRST_LOAD_MS = 560;

Page({
  data: {
    shop: SHOP,
    cats: CATS,
    activeId: CATS[0].id,
    activeCat: CATS[0],
    goods: [],
    switching: false,     // 切分类：页面内嵌小猫

    // ---------- 小猫加载 ----------
    catShow: false,       // 整屏小猫加载
    catText: "小猫正在开门…",
    catSub: "分门别类，一样样摆好",
  },

  onLoad() {
    this.setData({ catShow: true });
    this.switchCat(this.data.activeId);
    setTimeout(() => this.setData({ catShow: false }), FIRST_LOAD_MS);
  },

  onShow() {
    cart.refreshBadge();
    // 首页点分类进来的定位
    let id = "";
    try {
      id = wx.getStorageSync("xiangwei_active_cat");
    } catch (e) {
      id = "";
    }
    if (id && id !== this.data.activeId) {
      this.switchCat(id);
    }
  },

  /** 切换左侧分类：先让小猫跑去另一排货架，再把商品摆出来 */
  switchCat(id) {
    let cat = this.data.cats[0];
    this.data.cats.forEach((c) => {
      if (c.id === id) cat = c;
    });

    const needWait = cat.id !== this.data.activeId || !this.data.goods.length;
    this.setData({
      activeId: cat.id,
      activeCat: cat,
      switching: needWait,
    });
    wx.setNavigationBarTitle({ title: cat.name });

    if (!needWait) return;
    setTimeout(() => {
      this.setData({
        goods: mock.byCat(cat.id),
        switching: false,
      });
    }, SWITCH_MS);
  },

  onCatTap(e) {
    const id = e.currentTarget.dataset.id;
    if (id === this.data.activeId) return;
    this.switchCat(id);
  },

  onSearch() {
    wx.switchTab({ url: "/pages/search/search" });
  },

  onAdd(e) {
    cart.addAndToast(e.detail.item);
  },

  onGoods(e) {
    console.log("商品 id:", e.currentTarget.dataset.id);
    wx.showToast({ title: "商品详情页开发中", icon: "none" });
  },
});
