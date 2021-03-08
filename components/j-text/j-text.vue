<template>
	<view class="swiper-item uni-bg-red" @click="click">{{data.url}}</view>
</template>

<script>
	export default {
		props: {data:{type: Object,default:{}}},
		data() {
			return {
				num:0
			};	
		},
		methods:{
			click(){
				this.num += 1
				console.log("当前计数"+this.num)
			}
		}
	}
</script>

<style>

</style>
