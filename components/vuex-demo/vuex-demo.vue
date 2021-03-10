<template>
	<view >
		<j-comment></j-comment>
		<view>{{$store.state.fuck}}</view>
		<button type="default" @click="changeemoji">点我</button>
	</view>
</template>

<script>
	// 不用mapstate 不用computed 直接调用更加简洁
	// 写一个通用的导入的方法 快速生成相关参数
	// 直接在需要的视图调用
	export default {
		computed: {
		},
		data() {
			return {
				showemoji:false,
			}
		},
		onLoad() {
		},
		methods: {
			changeemoji:function changemoji(){
				this.$store.state.fuck += "wtf222"
			}
		}
	}
</script>

<style>

</style>
