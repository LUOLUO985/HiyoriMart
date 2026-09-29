/**
 * 商品卡片
 * 用法：
 *   <goods-card item="{{item}}" currency="{{shop.currency}}" bind:add="onAdd" bindtap="onGoods" data-id="{{item.id}}"/>
 *   <goods-card layout="row" .../>   // 横向列表排版
 * item 里 image 为空时，自动显示图片占位框。
 */
Component({
  options: {
    // 允许页面 / app.wxss 的样式作用到组件内部，方便统一微调
    styleIsolation: "apply-shared",
  },

  properties: {
    item: {
      type: Object,
      value: {},
    },
    layout: {
      type: String,
      value: "grid", // grid | row
    },
    currency: {
      type: String,
      value: "€",
    },
  },

  data: {
    imgLoaded: false,
    imgError: false,
  },

  observers: {
    // 换了一件商品，图片要重新等一次
    item() {
      if (this.data.imgLoaded || this.data.imgError) {
        this.setData({ imgLoaded: false, imgError: false });
      }
    },
  },

  methods: {
    onImgLoad() {
      if (!this.data.imgLoaded) this.setData({ imgLoaded: true });
    },

    // 图裂了就回到占位框，不要一直等
    onImgError() {
      if (!this.data.imgError) this.setData({ imgError: true, imgLoaded: true });
    },

    onAdd() {
      this.triggerEvent("add", { item: this.data.item });
    },
  },
});
