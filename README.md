# Hiyori亚超 · 小程序框架

面向 Lahti 当地亚洲超市的商品展示小程序。整体走「温馨 · 家乡感」的暖色调：
宣纸米色底 + 陶土橘主色 + 暖金点缀，圆角、柔和阴影、虚线图片位。

## 页面结构（底部五个 tab）

| 顺序 | 页面 | 路径 | 说明 |
| --- | --- | --- | --- |
| 1 | 首页 | `miniprogram/pages/home/home` | 品牌头、搜索入口、轮播图、分类金刚区、商品区块 |
| 2 | 分类 | `miniprogram/pages/category/category` | 左侧分类导航 + 右侧商品列表 |
| 3 | 搜索 | `miniprogram/pages/search/search` | 搜索框、最近搜索、热门词、搜索结果 |
| 4 | 购物车 | `miniprogram/pages/cart/cart` | 商品行、数量增减、全选、合计、结算栏 |
| 5 | 我的 | `miniprogram/pages/mine/mine` | 用户卡、我的订单、常用服务、门店信息 |

## 目录约定

```
miniprogram/
├── app.json                 # 页面注册 + tabBar（颜色、图标）
├── app.wxss                 # 全局设计变量与通用样式（改主题色只改这里）
├── components/goods-card/   # 商品卡片组件（网格 / 横向列表两种排版）
├── components/cat-loading/  # 🐱 橙黄小猫加载动画（全站统一的等待样式）
├── utils/
│   ├── config.js            # 门店名、slogan、地址、电话、货币符号
│   ├── mock.js              # 分类、轮播图、商品、热搜词（占位数据）
│   ├── cart.js              # 购物车数据层（本地缓存）
│   └── cat-loading.js       # js 里随时开关「小猫加载」
├── images/
│   ├── tabbar/              # 底部五个图标（普通态 + 选中态）
│   └── goods/               # 建议：商品图片放这里（目前为空）
└── pages/                   # 五个 tab 页面
```

## 🐱 加载动画：橙黄小猫

全站只要「等」，出现的都是这只橘黄小猫——它是纯 CSS 画出来的，**不需要任何图片文件**。
动画：小猫站着轻轻晃、尾巴一直摇、耳朵偶尔抖一下、眼睛定期眨一下，
身前还有一颗来回滚的蓝色毛线球。

四种用法（都在 `components/cat-loading/` 里，改文案/颜色只改这一个文件）：

| mode | 长什么样 | 用在哪 |
| --- | --- | --- |
| `page` | 整屏米色遮罩 + 中间一张奶油小卡片，小猫 + 文字 + 跳动的三个点 | 页面第一次打开、要等比较久的时候 |
| `inline` | 页面里内嵌一块，小猫 + 文字 | 切分类、搜索这类「局部等一下」 |
| `mini` | 只有小小一只当图标 | 商品图片还在下载时 |
| `refresher` | 趴在顶部一小条里 | 首页下拉刷新 |

### 写法一：页面里放着，用数据控制

```xml
<cat-loading
  id="cat-loading"
  mode="page"
  show="{{catShow}}"
  text="小猫正在把货摆上架…"
  sub="第一次打开会慢一点点"
/>
```

### 写法二：js 里随时开关（推荐用在以后的网络请求上）

```js
const catLoading = require("../../utils/cat-loading");

const token = catLoading.show("小猫正在找货…");   // 开
catLoading.hide(token);                            // 关

catLoading.flash("小猫正在核对身份…", 900);          // 显示一下就自己收
catLoading.wrap(请求, "小猫正在结账…");              // 请求结束自动收（成功失败都会收）
```

页面里没放这个组件时，它会自动退回微信自带的 `wx.showLoading`，不会报错。

### 现在已经接好的地方

- **首页**：第一次进去是整屏小猫；**下拉刷新换成了小猫**（自己画的，不是微信默认那三个点）
  —— 手指下拉时提示「下拉，让小猫去进货」，拉够了变成「松手，小猫立刻出发」。
- **分类页**：切左边分类时，右边显示「小猫去另一排货架看看…」。
- **搜索页**：点搜索后显示「小猫正在货架间找…」。
- **购物车 / 我的**：第一次进去让小猫清点、翻资料。
- **商品卡片**：商品图还在下载时，图位上是小小一只猫 + 「小猫搬图中…」。

> 现在数据都是本地假数据，所以页面上写了一个 `FAKE_NETWORK_MS`（几百毫秒）假装网络耗时，
> 好让动画露个脸。以后接真实接口时，把 `setTimeout` 换成请求即可，
> 开 / 关加载的写法完全不用改。

## 怎么加商品图片

1. 把图片放进 `miniprogram/images/goods/`，例如 `laoganma.png`。
2. 打开 `miniprogram/utils/mock.js`，给对应商品补上 `image` 字段：

   ```js
   { id: "p01", cat: "sauce", name: "老干妈风味豆豉油制辣椒", spec: "280g / 瓶",
     price: 3.9, origin: "贵州", badge: "招牌", image: "/images/goods/laoganma.png" }
   ```

3. 保存即可，页面里的虚线占位框会自动换成图片。

轮播图同理：给 `banners` 里的 `image` 填路径（建议 750 × 340 px）。
分类图标：给 `categories` 里的 `image` 填路径，会替换掉现在的 emoji。

## 怎么加商品区块（首页往下拉更多内容）

在 `miniprogram/pages/home/home.js` 的 `sections` 数组里复制一段：

```js
{
  id: "sauce",                       // 对应 categories 里的分类 id
  title: "家乡的味道",                 // 区块标题
  sub: "酱香一开，就是回家的味道",      // 一句话说明
  list: mock.byIds(["p01", "p02", "p03", "p04"]),  // 要展示的商品
}
```

## 怎么换主题色

`miniprogram/app.wxss` 顶部 `page { --brand: ...; --paper: ...; }` 就是全部配色。
改这几个变量，五个页面和商品卡片会一起变。

## 后续可接的能力（现在都留了入口，点下去只有提示）

- 商品详情页：现在点商品卡片提示「开发中」，加一个 `pages/goods-detail` 即可。
- 下单与支付：购物车「结算」按钮处接入微信支付。
- 真实数据：把 `utils/mock.js` 换成云开发数据库查询，`utils/cart.js` 的 `read / write`
  换成数据库读写，页面代码不用动。

> 说明：`pages/index`、`pages/example`、`components/cloudTipModal` 是云开发模板自带的
> 示例页，已从 `app.json` 中移除、不再显示，可以随时删除。
