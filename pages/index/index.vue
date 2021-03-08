<template>	
	 <view>
		<j-tab-swiper-ad :list="tablist" v-slot:anyview="{tabitem}">
	<!-- 这个组件传入一个tab列表 用name来命名 输出一个tab的item 可以根据item来生成不同的页面 -->
		<j-gallery-storm  @scroll_down="scroll_down"  :gallery_list="gallery_list"></j-gallery-storm>
		</j-tab-swiper-ad>
	 </view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagers: {
					page: 1,
					rows: 10,
					totalPages: 0
				},
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
		scroll_down() {
			console.log("hzzzheliiii")
			this.getList()
		},
		async getList() {
				this.loading = false;
				let res = await this.$request.get("/api/works/hot", {
					...this.pagers,
					type: 1
				});
				console.log(res)
				if (!res.errno) {
					if (this.pagers.page == 1) {
						this.gallery_list = [];
					}
		
					if (res.data.currentPage >= res.data.totalPages) {
						this.listsClose = true;
					}
					this.gallery_list = this.gallery_list.concat(res.data.data);
					this.pagers.page = res.data.currentPage;
					this.pagers.totalPages = res.data.totalPages;
				}
			}
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">

</style>
