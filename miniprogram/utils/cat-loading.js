/**
 * utils/cat-loading.js —— 全站统一的「小猫加载」
 *
 * 页面里放一个 cat-loading id="cat-loading" 之后，js 里就能随时开、随时关：
 *
 *   const catLoading = require("../../utils/cat-loading");
 *   const token = catLoading.show("小猫正在找货…");
 *   // ...请求...
 *   catLoading.hide(token);
 *
 * 也可以偷懒：
 *   catLoading.flash("已加入购物车…", 700);          // 显示一小会儿
 *   catLoading.wrap(请求promise, "小猫正在结账…");    // 自动开、自动关
 *
 * 页面里没放组件时会退回微信自带的 wx.showLoading，不会报错。
 */

const COMPONENT_ID = "#cat-loading";

function currentPage() {
  const pages = getCurrentPages();
  return pages && pages.length ? pages[pages.length - 1] : null;
}

/** 找到当前页面上的小猫组件实例 */
function findLoader() {
  const page = currentPage();
  if (!page || typeof page.selectComponent !== "function") return null;
  try {
    return page.selectComponent(COMPONENT_ID);
  } catch (e) {
    return null;
  }
}

/** 显示：返回 token，用于成对收起 */
function show(text) {
  const loader = findLoader();
  if (loader && typeof loader.show === "function") {
    return loader.show(text);
  }
  wx.showLoading({ title: text || "小猫找货中", mask: true });
  return 0;
}

/** 收起：传 token 时，只有那次加载没被新的加载覆盖才会关掉 */
function hide(token) {
  const loader = findLoader();
  if (loader && typeof loader.hide === "function") {
    loader.hide(token);
    return;
  }
  wx.hideLoading();
}

/** 只换文字 */
function setText(text) {
  const loader = findLoader();
  if (loader && typeof loader.setText === "function") {
    loader.setText(text);
    return;
  }
  wx.showLoading({ title: text || "小猫找货中", mask: true });
}

/** 显示一小会儿就自动收起（适合「打卡式」的短等待） */
function flash(text, duration) {
  const token = show(text);
  setTimeout(() => hide(token), duration || 800);
  return token;
}

/**
 * 包住一个 Promise：自动开、成功或失败都自动关
 *   catLoading.wrap(wx.request({ ... }), "小猫正在找货…").then(() => {})
 */
function wrap(task, text) {
  const token = show(text);
  const done = () => hide(token);
  if (task && typeof task.then === "function") {
    return task.then(
      (res) => {
        done();
        return res;
      },
      (err) => {
        done();
        throw err;
      }
    );
  }
  done();
  return task;
}

module.exports = { show, hide, setText, flash, wrap };
