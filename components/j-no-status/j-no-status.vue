<!-- 滚动页面做成一个组件 里面放置一个插槽 -->
<template>
	<view >
	</view>
</template>

<script>

	var _self;
	export default {
		props: ['list',"little_tab"],
		data() {
			return {
				moveX:0,
				startX:0,
				startY: 0,
				moveY: 0,
				moving: false,
				'disable_move':false,
				swiperhigh: 0,
				barHeight: 0,
				color: "#ff0000",
				// list: [{  // 写成通用类 list 传入 根据list个数生成 对应页面   list 里面还携带一个api 根据api 来改变每个页面的内容  页面作为插槽放进去
				// 	name: '关注'
				// }, {
				// 	name: '发现'
				// }, {
				// 	name: '本地'
				// }],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项 
				swipe_current: 0,
			};
		},
		// 使用监听器对值的修改进行监听
		created() {
			this.getSystemStatusBarHeight();
		},
		watch:{
		},
		methods: {
			getSystemStatusBarHeight() {
				// #ifdef MP
				console.log("ggin222")
				var height = 25
				this.barHeight = height;
				console.log("height" + height)
				// #endif

				// #ifdef APP-PLUS 
				console.log("ggin")
				var height = plus.navigator.getStatusbarHeight();
				this.barHeight = height;
				console.log("height" + height)
				// #endif
				// #ifdef H5
				console.log("h5")
				this.barHeight = 0;
				// #endif

				let myself = this
				// 获取屏幕高度设置swiper
				uni.getSystemInfo({
					success: function(res) {
						myself.swiperhigh = res.windowHeight - myself.barHeight - 50;
					}
				});
			},
		}
	};
</script>
<style lang="scss">
	.j-topbar{
		display: flex;
		width: 100vw;
	}
	page {
		max-height: 100vh;
	}
</style>
