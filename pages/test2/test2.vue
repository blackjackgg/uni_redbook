<template>
	<view>
		<j-search  button="inside"></j-search>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chart: "sl_",
				moveX: 0,
				startX: 0,
				startY: 0,
				moveY: 0,
				moving: false,
				scrollTop: -1,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				tablist: [{
						name: "关注",
						url: "https://baidu.com"
					}, {
						name: "发现",
						url: "https://qq.com"
					},
					{
						name: "本地",
						url: "https://77.com"
					}, {
						name: "关注",
						url: "https://baidu.com"
					}, {
						name: "发现",
						url: "https://qq.com"
					},
					{
						name: "本地",
						url: "https://77.com"
					}, {
						name: "关注",
						url: "https://baidu.com"
					}, {
						name: "发现",
						url: "https://qq.com"
					},
					{
						name: "本地",
						url: "https://77.com"
					}, {
						name: "关注",
						url: "https://baidu.com"
					}, {
						name: "发现",
						url: "https://qq.com"
					},
					{
						name: "本地",
						url: "https://77.com"
					},
				],
				tablist2: [{
					name: "关注",
					url: "https://baidu.com"
				}, {
					name: "发现",
					url: "https://qq.com"
				}, 
				{
					name: "本地",
					url: "https://qq.com"
				},
				]
			}
		},
		// onPullDownRefresh() {
		//         console.log('refresh');
		//         setTimeout(function () {
		//             uni.stopPullDownRefresh();
		//         }, 1000);
		//     },
		methods: {
			coverTouchstart(swipeindex, e) {
				console.log("start", swipeindex);
				// if (!this.isRefresh) {
				// 	return
				// }
				// this.coverTransition = 'transform .1s linear'
				this.startY = e.touches[0].clientY
				this.startX = e.touches[0].clientX
			},
			coverTouchmove(swipeindex, e) {
				// if (!this.isRefresh || this.updating) {
				// 	return
				// }
				// console.log("fcuk")
				// console.log(currentindex)
				this.moveY = e.touches[0].clientY
				this.moveX = e.touches[0].clientX
				let moveDistance = this.moveY - this.startY
				let movexdis = Math.abs(this.moveX - this.startX)

				// if (movexdis <= 6){

				// if ( moveDistance <= 70) {
				// 	this.coverTransform = `translateY(${moveDistance}px)`
				// }
				// this.moving = moveDistance >= 70
				// }
			},
			coverTouchend(swipeindex) {
				console.log("stop", swipeindex);
				// console.log("now_index",this.index);
				// if (!this.isRefresh || this.updating) {
				// 	return
				// }
				// if (this.moving ) {
				// 	this.runRefresh()
				// } else {
				// 	this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
				// 	this.coverTransform = 'translateY(0px)'
				// }

			},
		},

		onLoad() {},
	}
</script>

<style lang="scss">

</style>
