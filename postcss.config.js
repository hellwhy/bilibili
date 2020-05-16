module.exports = {
	plugins: {
		autoprefixer: {},
		"postcss-px-to-viewport": {
		viewportWidth: 375,// 视窗的宽度，对应的是我们设计稿的宽度. 
		viewportHeight: 667, //视窗的高度，对应的是我们设计稿的高度. (也可以不配置)
		unitPrecision: 3, //指定 px 转换为视窗单位值的小数保留的位数(很多时候无法整除)
		viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用 vw
		//存放一些不需要转化px的类 或者给这些类添加一个共有类 再把共有类加进来
		minPixelValue: 1, //小于或等于多少 px 不用转换为视窗单位  这里为 1px
		mediaQuery: false //允许在媒体查询中转换 px
		}
	}
}