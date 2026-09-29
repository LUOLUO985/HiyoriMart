把商品图片放在这个文件夹里。

然后在 miniprogram/utils/mock.js 里给商品补上 image 字段，例如：

  image: "/images/goods/laoganma.png"

保存后，页面里的虚线占位框就会自动换成图片。

建议：
- 商品图做成正方形（1:1），例如 500 × 500 px，导出为 PNG 或 JPG
- 轮播图建议 750 × 340 px
- 文件名用英文或拼音，不要带空格
