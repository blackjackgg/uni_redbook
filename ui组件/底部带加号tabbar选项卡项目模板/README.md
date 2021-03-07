
## 底部带加号选项卡 

我们平常使用app的话，经常会看到比如抖音、今日头条等app底部tabbar中间都会有一个图标按钮。因为小程序和app、h5的平台差异性，所以暂时无法做到完全自定义tabbar。现给出一种解决方案，暂时解决tabar中间的按钮图标问题。


#### 效果示例
![演示](http://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/ext-tab.png)

#### 使用说明

- 配置`pages.json`

```javascript
"tabBar": {
		"borderStyle": "black",
		"backgroundColor": "#333",
		"color": "#8F8F94",
		"selectedColor": "#f33e54",
		"list": [{
				"pagePath": "pages/tabbar/tabbar-1/tabbar-1",
				"iconPath": "static/img/tabbar/home.png",
				"selectedIconPath": "static/img/tabbar/homeactive.png",
				"text": "首页"
			},
			{
				"pagePath": "pages/tabbar/tabbar-2/tabbar-2",
				"iconPath": "static/img/tabbar/guanzhu.png",
				"selectedIconPath": "static/img/tabbar/guanzhuactive.png",
				"text": "关注"
			},
			//#ifdef MP-WEIXIN
			{
				"pagePath": "pages/tabbar/tabbar-3/tabbar-3",
				"iconPath": "static/img/tabbar/add.png",
				"selectedIconPath": "static/img/tabbar/addactive.png",
				"text": "发布"
			},
			//#endif
			//#ifndef MP-WEIXIN
			{
				"pagePath": "pages/tabbar/tabbar-3/tabbar-3",
				"iconPath": "static/img/tabbar/add.png",
				"selectedIconPath": "static/img/tabbar/addactive.png"
			},
			//#endif
			{
				"pagePath": "pages/tabbar/tabbar-4/tabbar-4",
				"iconPath": "static/img/tabbar/news.png",
				"selectedIconPath": "static/img/tabbar/newsactive.png",
				"text": "消息"
			},
			{
				"pagePath": "pages/tabbar/tabbar-5/tabbar-5",
				"iconPath": "static/img/tabbar/me.png",
				"selectedIconPath": "static/img/tabbar/meactive.png",
				"text": "我"
			}
		]
	}

```
- 在tabbar中间按钮对应的页面中，写入项目对应附加功能。详见代码示例：`pages/tabbar/tabbar-3/tabbar-3.vue` 页面
- 因为小程序的平台差异，所以底部文字必须显示，否则图标偏上显示。

