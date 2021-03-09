<template>	
	 <view>
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
		methods: {

		},
		onLoad() {
			console.log("ffff")
			console.log(this.myprops)
		}
	}
</script>

<style lang="scss">

</style>
