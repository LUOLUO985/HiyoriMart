/**
 * 首页 / 分类页的占位数据
 * 现在 image 一律为空字符串 —— 页面会自动显示「图片占位框」。
 * 你之后只需要把图片放进 images/goods/，再把路径写到 image 字段即可，例如：
 *   image: "/images/goods/laoganma.png"
 */

// ---------- 分类（金刚区 / 分类页左侧导航） ----------
const categories = [
  { id: "veg", name: "新鲜蔬菜", emoji: "🥬", image: "", desc: "当日到货" },
  { id: "fruit", name: "时令水果", emoji: "🍊", image: "", desc: "当季鲜甜" },
  { id: "meat", name: "肉类海鲜", emoji: "🥩", image: "", desc: "冷链直送" },
  { id: "frozen", name: "速冻面点", emoji: "🥟", image: "", desc: "家乡手工" },
  { id: "rice", name: "米面粮油", emoji: "🍚", image: "", desc: "主食担当" },
  { id: "sauce", name: "酱料调味", emoji: "🫙", image: "", desc: "妈妈的味道" },
  { id: "snack", name: "零食饼干", emoji: "🍪", image: "", desc: "追剧必备" },
  { id: "drink", name: "饮料冲调", emoji: "🧋", image: "", desc: "解乡愁" },
  { id: "instant", name: "方便速食", emoji: "🍜", image: "", desc: "五分钟开饭" },
  { id: "daily", name: "日用百货", emoji: "🧴", image: "", desc: "顺手带一件" },
];

// ---------- 首页轮播图 ----------
// 优惠政策还没定，先只放一张「敬请期待」占位。
// 以后要上活动：往数组里复制一段，把 image 填成图片路径即可（建议 750 × 340）。
const banners = [
  { id: "b1", title: "敬请期待", sub: "更多优惠正在准备中", image: "" },
];

// ---------- 商品 ----------
// 价格先统一填 0（线上暂不展示真实售价），以后有实价再改这里的 price 即可。
// 产地字段已经不用了，商品信息只保留：名称 / 规格 / 价格 / 角标 / 图片。
const products = [
  { id: "p01", cat: "sauce", name: "老干妈风味豆豉油制辣椒", spec: "280g / 瓶", price: 0, badge: "招牌", image: "" },
  { id: "p02", cat: "sauce", name: "海天金标生抽", spec: "500ml / 瓶", price: 0, image: "" },
  { id: "p03", cat: "sauce", name: "王致和大块腐乳", spec: "250g / 瓶", price: 0, image: "" },
  { id: "p04", cat: "sauce", name: "恒顺镇江香醋", spec: "500ml / 瓶", price: 0, image: "" },
  { id: "p05", cat: "sauce", name: "李锦记旧庄蚝油", spec: "510g / 瓶", price: 0, image: "" },
  { id: "p06", cat: "sauce", name: "龟甲万万字酱油", spec: "500ml / 瓶", price: 0, image: "" },

  { id: "p07", cat: "rice", name: "五常稻花香大米", spec: "5kg / 袋", price: 0, badge: "新米", image: "" },
  { id: "p08", cat: "rice", name: "泰国茉莉香米", spec: "5kg / 袋", price: 0, image: "" },
  { id: "p09", cat: "rice", name: "中筋面粉 · 饺子粉", spec: "1kg / 袋", price: 0, image: "" },
  { id: "p10", cat: "rice", name: "金龙鱼菜籽油", spec: "1.8L / 瓶", price: 0, image: "" },

  { id: "p11", cat: "frozen", name: "三全灌汤水饺 · 猪肉白菜", spec: "450g / 袋", price: 0, badge: "冷藏", image: "" },
  { id: "p12", cat: "frozen", name: "思念黑芝麻汤圆", spec: "400g / 袋", price: 0, image: "" },
  { id: "p13", cat: "frozen", name: "韩国宗家府切件泡菜", spec: "300g / 袋", price: 0, image: "" },
  { id: "p14", cat: "frozen", name: "手抓饼 · 原味", spec: "10 片 / 袋", price: 0, image: "" },

  { id: "p15", cat: "instant", name: "康师傅红烧牛肉面", spec: "5 连包", price: 0, badge: "热卖", image: "" },
  { id: "p16", cat: "instant", name: "农心辛拉面", spec: "5 连包", price: 0, image: "" },
  { id: "p17", cat: "instant", name: "越南干河粉", spec: "400g / 袋", price: 0, image: "" },
  { id: "p18", cat: "instant", name: "白象大骨面", spec: "5 连包", price: 0, image: "" },

  { id: "p19", cat: "snack", name: "洽洽山核桃味瓜子", spec: "260g / 袋", price: 0, image: "" },
  { id: "p20", cat: "snack", name: "旺旺雪饼", spec: "168g / 袋", price: 0, image: "" },
  { id: "p21", cat: "snack", name: "好丽友薯愿", spec: "104g / 罐", price: 0, image: "" },
  { id: "p22", cat: "snack", name: "黄飞红麻辣花生", spec: "210g / 袋", price: 0, image: "" },

  { id: "p23", cat: "drink", name: "维他柠檬茶", spec: "250ml × 6", price: 0, image: "" },
  { id: "p24", cat: "drink", name: "娃哈哈 AD 钙奶", spec: "220ml × 4", price: 0, image: "" },
  { id: "p25", cat: "drink", name: "三得利乌龙茶", spec: "500ml / 瓶", price: 0, image: "" },
  { id: "p26", cat: "drink", name: "西湖龙井茶叶", spec: "100g / 罐", price: 0, image: "" },

  { id: "p27", cat: "veg", name: "新鲜小白菜", spec: "约 500g / 把", price: 0, badge: "当日", image: "" },
  { id: "p28", cat: "veg", name: "青线椒", spec: "约 200g", price: 0, image: "" },
  { id: "p29", cat: "veg", name: "黄豆芽", spec: "约 300g", price: 0, image: "" },
  { id: "p30", cat: "veg", name: "紫皮茄子", spec: "约 500g", price: 0, image: "" },

  { id: "p31", cat: "fruit", name: "鲜龙眼", spec: "约 500g", price: 0, image: "" },
  { id: "p32", cat: "fruit", name: "脆柿", spec: "约 500g", price: 0, image: "" },
  { id: "p33", cat: "fruit", name: "红心火龙果", spec: "约 500g", price: 0, image: "" },
  { id: "p34", cat: "fruit", name: "砂糖橘", spec: "约 1kg", price: 0, image: "" },

  { id: "p35", cat: "meat", name: "冷冻五花肉片", spec: "500g / 盒", price: 0, image: "" },
  { id: "p36", cat: "meat", name: "鸡腿肉（去骨）", spec: "约 600g", price: 0, image: "" },
  { id: "p37", cat: "meat", name: "去壳虾仁", spec: "300g / 袋", price: 0, image: "" },

  { id: "p38", cat: "daily", name: "竹制蒸笼", spec: "20cm", price: 0, image: "" },
  { id: "p39", cat: "daily", name: "不锈钢漏勺", spec: "中号", price: 0, image: "" },
  { id: "p40", cat: "daily", name: "陶瓷饭碗（4 只装）", spec: "4 只 / 套", price: 0, image: "" },
];

// ---------- 搜索热词 ----------
const hotKeywords = [
  "老干妈",
  "五常大米",
  "水饺",
  "辛拉面",
  "生抽",
  "香醋",
  "泡菜",
  "龙井",
];

/** 按分类取商品 */
function byCat(catId) {
  return products.filter((p) => p.cat === catId);
}

/** 按 id 列表取商品，保持顺序 */
function byIds(ids) {
  return ids
    .map((id) => products.filter((p) => p.id === id)[0])
    .filter((p) => !!p);
}

/** 关键词搜索：命中商品名 / 规格 / 分类名 */
function search(keyword) {
  const kw = String(keyword || "").trim().toLowerCase();
  if (!kw) return [];
  const catName = {};
  categories.forEach((c) => (catName[c.id] = c.name));
  return products.filter((p) => {
    const hay = [p.name, p.spec, catName[p.cat] || ""].join(" ").toLowerCase();
    return hay.indexOf(kw) > -1;
  });
}

module.exports = {
  categories,
  banners,
  products,
  hotKeywords,
  byCat,
  byIds,
  search,
};
