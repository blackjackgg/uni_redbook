<template>	
	 <view>
		<j-tab-swiper-ad :list="tablist" v-slot:chart="{tabitem,tabindex}">
		<!-- 这个组件传入一个tab列表 用name来命名 输出一个tab的item 可以根据item来生成不同的页面 -->
			<j-gallery-storm :tabitem="tabitem" :tabindex="tabindex"></j-gallery-storm>
		</j-tab-swiper-ad>
	 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			},

		onLoad() {
		},
	}
</script>

<style lang="scss">

</style>
