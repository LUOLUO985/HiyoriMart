/**
 * 橙黄小猫加载动画
 *
 * 用法一：写在页面 wxml 里，用数据控制
 *   cat-loading id="cat-loading" mode="page" show="{{catShow}}" text="小猫正在找货…"
 *
 * 用法二：js 里随时调用（见 utils/cat-loading.js）
 *   const catLoading = require("../../utils/cat-loading");
 *   catLoading.show("小猫正在找货…"); catLoading.hide();
 *
 * mode: page 整屏遮罩 | inline 页面内嵌 | mini 小图标 | refresher 下拉刷新
 */
Component({
  options: {
    styleIsolation: "isolated",
  },

  properties: {
    /** 是否显示（也支持 js 直接调用组件方法 show / hide） */
    show: {
      type: Boolean,
      value: false,
      observer(v) {
        if (v !== this.data.shown) this.setData({ shown: !!v });
      },
    },
    /** page | inline | mini | refresher */
    mode: {
      type: String,
      value: "page",
    },
    /** 主文字 */
    text: {
      type: String,
      value: "",
    },
    /** 副文字（可留空） */
    sub: {
      type: String,
      value: "",
    },
    /** 是否显示三个跳动的小圆点 */
    dots: {
      type: Boolean,
      value: true,
    },
    /** 大于 0 时，显示这么多毫秒后自动收起 */
    duration: {
      type: Number,
      value: 0,
    },
  },

  data: {
    shown: false,
  },

  lifetimes: {
    attached() {
      this._token = 0;
    },
    detached() {
      if (this._timer) clearTimeout(this._timer);
    },
  },

  methods: {
    /** 显示，返回 token（配合 hide(token)，避免后来的加载被早先的收尾关掉） */
    show(text) {
      this._token = (this._token || 0) + 1;
      const patch = { shown: true };
      if (typeof text === "string" && text) patch.text = text;
      this.setData(patch);

      if (this._timer) clearTimeout(this._timer);
      if (this.data.duration > 0) {
        const token = this._token;
        this._timer = setTimeout(() => this.hide(token), this.data.duration);
      }
      return this._token;
    },

    /** 收起；传 token 时，只有没被新的加载覆盖才会真的收起 */
    hide(token) {
      if (token && token !== this._token) return;
      if (this._timer) clearTimeout(this._timer);
      this._token = (this._token || 0) + 1;
      if (this.data.shown) this.setData({ shown: false });
    },

    /** 只换文字 */
    setText(text) {
      this.setData({ text: text || "" });
    },

    /** 空方法：整屏模式用来吃掉滑动手势 */
    noop() {},
  },
});
