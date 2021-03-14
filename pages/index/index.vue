<template>
	<view>
		<j-search  button="inside"></j-search>
		<j-tab-swiper-ad :list="tablist2" v-slot:chart="{tabitem,tabindex}">
			
			<!-- <j-tab-swiper-ad  :little_tab="true" :list="tablist" v-slot:chart="{tabitem,tabindex}"> -->
				<!-- 			这里动态命名连slot 这些都得重新遍历一遍
 -->
				<!-- 这个组件传入一个tab列表 用name来命名 输出一个tab的item 可以根据item来生成不同的页面 -->
				<!-- v-if="tabindex==1" -->
				<!-- 		<j-tab-swiper-ad :list="tablist2" v-slot:[chart+tabindex]="{tabitem:insideitem,tabindex:insideindex}">
			<j-gallery-storm :tabitem="insideitem" :tabindex="insideindex"></j-gallery-storm>
		</j-tab-swiper-ad> -->
				<j-gallery-storm :tabitem="tabitem" :tabindex="tabindex"></j-gallery-storm>
			<!-- </j-tab-swiper-ad> -->
		</j-tab-swiper-ad>
		<!-- <tui-tabbar :current="currenttab"  backdropFilter  :tabBar="tabBar" color="#777" selectedColor="#AC9157" @click="tabbarSwitch"></tui-tabbar> -->
<!-- 	<j-no-status></j-no-status> -->
		
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
				],
				currenttab:0,
				tabBar: [
					{
						pagePath: '/pages/index/index',
						text: '首页',
						iconPath: '/static/images/tabbar/code_gray.png',
						selectedIconPath: '/static/images/tabbar/code_active.png'
					},
					{
						pagePath: '',
						text: '发布',
						iconPath: '/static/images/tabbar/release.png',
						hump: true,
						selectedIconPath: '/static/images/tabbar/release.png'
					},
					{
						pagePath: '/pages/user/index',
						text: '我的',
						iconPath: '/static/images/tabbar/thor_gray.png',
						selectedIconPath: '/static/images/tabbar/thor_active.png',
					}
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
