# 云函数

这个目录是云函数的根目录（对应 `project.config.json` 里的 `cloudfunctionRoot`）。
云开发模板自带的示例函数 `quickstartFunctions` 已经删掉，这里现在是空的。

## 以后要加云函数

1. 在微信开发者工具里，右键这个 `cloudfunctions` 目录 → **新建 Node.js 云函数**，比如 `getGoods`；
2. 写完代码后，右键那个函数目录 → **上传并部署：云端安装依赖**；
3. 小程序里这样调用（等的时候页面上会出现那只橘黄小猫）：

   ```js
   const catLoading = require("../utils/cat-loading");

   const res = await catLoading.wrap(
     wx.cloud.callFunction({ name: "getGoods", data: { catId: "sauce" } }),
     "小猫正在找货…"
   );
   ```

> 调用云函数前，记得在 `miniprogram/app.js` 的 `globalData.env` 里填上你的云环境 ID。
