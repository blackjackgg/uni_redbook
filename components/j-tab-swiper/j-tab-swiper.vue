<!-- 滚动页面做成一个组件 里面放置一个插槽 -->
<template>
	<view>
	<view class="f-center">
       <u-tabs ref="tabs" :list="list" bar-height="6" bar-width="40" :active-color="color"
	   @change="change"  :current="current"></u-tabs>
	</view>
	 <swiper class="swiper"  :current="swipe_current" @change="swipe_change">  
	 
	     <slot v-for="(item,index) in list" 
	             name="chart"
	             :data="item"
	             :index="index">
	     </slot>
		   
<!-- 			<swiper-item v-for="(item, index) in list">
				<slot  name="chart" :url="index">{{item}}</slot>
			 </swiper-item>   -->      
		                     </swiper>
							 
							 
							 </view>
</template>

<script>
	export default {
		props: {list:{type: Array,default:[]}},
		data() {
			return {
				txt0:"",
				txt1:"",
				txt2:"",
				color:"#ff0000",
				// list: [{  // 写成通用类 list 传入 根据list个数生成 对应页面   list 里面还携带一个api 根据api 来改变每个页面的内容  页面作为插槽放进去
				// 	name: '关注'
				// }, {
				// 	name: '发现'
				// }, {
				// 	name: '本地'
				// }],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项 
				swipe_current:0,
			};
		},
		// 使用监听器对值的修改进行监听
		methods: {
			swipe_change(event){
				this.current = event.detail.current
				this.fresh_page()
				
			},
			change(index) {
							this.current = index;
							this.swipe_current = index
							this.fresh_page()
						},
			fresh_page(){
				// 切换tab的时候刷新页面！
				let pagemap = {0:"wtf",1:"ok,imfine",2:"fuck"}
				let txt = pagemap[this.current]
				this["txt"+this.current] = txt
				
			}
		}
	};
</script>
<style>
	.swiper{
		height: 100vh;
	}
	page{
		max-height: 100vh;
/* 		overflow: hidden; */
	}
</style>