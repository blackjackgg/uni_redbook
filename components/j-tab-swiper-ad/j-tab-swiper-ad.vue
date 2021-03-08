<template>
	<view>
		<j-tab-swiper :list="list" v-slot:chart="{index,data}">
				<swiper-item :ref="'chart'+index" :chartData="data">
				<slot name="anyview" :tabitem="data"></slot>
			    </swiper-item>
		</j-tab-swiper>
	</view>
</template>

<script>
	export default {
		props: {list:{type: Array,default:[]}},
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
