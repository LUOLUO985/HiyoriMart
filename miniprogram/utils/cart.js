/**
 * 购物车数据层（本地缓存版）
 * 后续接入云开发时，只需把 read / write 换成数据库读写即可，
 * 页面调用的 list / add / setCount / summary 等接口保持不变。
 */
const KEY = "xiangwei_cart_v1";
const CART_TAB_INDEX = 3; // tabBar 中「购物车」的位置

function read() {
  try {
    return wx.getStorageSync(KEY) || [];
  } catch (e) {
    return [];
  }
}

function write(list) {
  try {
    wx.setStorageSync(KEY, list);
  } catch (e) {
    // 忽略写入失败（例如存储空间不足）
  }
  refreshBadge(list);
}

/** 同步 tabBar 购物车角标 */
function refreshBadge(list) {
  const items = list || read();
  const count = items.reduce((n, it) => n + it.count, 0);
  try {
    if (count > 0) {
      wx.setTabBarBadge({
        index: CART_TAB_INDEX,
        text: count > 99 ? "99+" : String(count),
      });
    } else {
      wx.removeTabBarBadge({ index: CART_TAB_INDEX });
    }
  } catch (e) {
    // tabBar 尚未就绪时忽略
  }
}

function list() {
  return read();
}

function findIndex(items, id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) return i;
  }
  return -1;
}

/** 加入购物车；item 为商品对象（含 id/name/spec/price/image） */
function add(item, count) {
  const num = count || 1;
  const items = read();
  const idx = findIndex(items, item.id);
  if (idx > -1) {
    items[idx].count += num;
  } else {
    items.push({
      id: item.id,
      name: item.name,
      spec: item.spec || "",
      unit: item.unit || "",
      price: item.price,
      image: item.image || "",
      count: num,
      checked: true,
    });
  }
  write(items);
  return items;
}

/** 加入并提示（页面里一行搞定） */
function addAndToast(item) {
  add(item, 1);
  wx.showToast({ title: "已加入购物车", icon: "success", duration: 1200 });
}

/** 修改数量，最少 1 件 */
function setCount(id, count) {
  const items = read();
  const idx = findIndex(items, id);
  if (idx > -1) {
    items[idx].count = Math.max(1, count);
    write(items);
  }
  return items;
}

function toggle(id) {
  const items = read();
  const idx = findIndex(items, id);
  if (idx > -1) {
    items[idx].checked = !items[idx].checked;
    write(items);
  }
  return items;
}

function toggleAll(checked) {
  const items = read().map((it) => Object.assign({}, it, { checked: !!checked }));
  write(items);
  return items;
}

function remove(id) {
  const items = read().filter((it) => it.id !== id);
  write(items);
  return items;
}

function clear() {
  write([]);
  return [];
}

/** 汇总：总件数 / 已选件数 / 已选金额 */
function summary(listData) {
  const items = listData || read();
  let count = 0;
  let checkedCount = 0;
  let amount = 0;
  items.forEach((it) => {
    count += it.count;
    if (it.checked) {
      checkedCount += it.count;
      amount += it.count * it.price;
    }
  });
  return {
    count,
    checkedCount,
    amount: Math.round(amount * 100) / 100,
    amountText: (Math.round(amount * 100) / 100).toFixed(2),
    allChecked: items.length > 0 && items.every((it) => it.checked),
  };
}

module.exports = {
  list,
  add,
  addAndToast,
  setCount,
  toggle,
  toggleAll,
  remove,
  clear,
  summary,
  refreshBadge,
};
