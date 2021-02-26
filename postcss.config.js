module.exports = {
  plugins: {
    autoprefixer: {},
    // "postcss-px-to-viewport" : {
    //   viewportWidth: 375,   //视窗的宽度，对应的是我们设计稿的宽度.
    //   viewPortHeight: 667,  //视窗的高度，对应的是我们的设计稿的高度（可不配置）
    //   unitPrecision: 5,     //指定 px 转换为视窗单位值的小数位数  （防止无法整除问题）
    //   viewportUnit: 'vw',   //指定需要转换成的视窗单位，建议vw
    //   selectorBlackList: ['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
    //   minPixelValue:1,      //小于或等于 1px不转换视窗单位
    //   mediaQuery: false     //允许在媒体查询中转换
    // }
  }
}