<!--
 * @Author: vinc
 * @LastEditTime: 2020-04-25 00:14:54 这个也改造成组件  只传入数据 不进行交互
 * 这个每个页面都比较整洁  组件不关心逻辑 只负责渲染
 -->
<template>
	<view>
		<div class="public-index-wrap">

			<scroll-view :scroll-y="true" :style="{'height':'100vh'}" @scrolltolower="down">
				<!-- 				<div class="home-navigation">
					<div class="nav-list">
						<span v-for="(item, index) in navList" :key="index" @click.stop="changeNav(item)" :class="{active: navIndex == item.type}">{{item.title}}</span>
					</div>
				</div>
				<div class="home-title" v-if="false">热门推荐</div> -->
				<div class="public-list">
					<ul class="public-list-ul">
						<li v-for="(item, index) in gallery_list" :key="index" @click.stop="$store.dispatch('changeWorks',item)">
							<div class="cover-wrap">
								<img :src="item.coverPic" class="cover" mode="aspectFill" :lazy-load="true" />
								<img src="/static/images/video.png" v-if="item.fileType == 'video'" class="public_video_icon" />
							</div>
							<div class="information">
								<div class="title">{{item.title}}</div>
								<div class="user" @click.stop="$store.dispatch('changeUser', item)">
									<div class="user-l">
										<img :src="item.avatarUrl" mode="widthFix" :lazy-load="true" />
										{{item.nickName}}
									</div>
									<div class="user-r">
										<img src="/static/images/like_gray.png" />
										{{item.like}}
									</div>
								</div>
							</div>
						</li>
						<li class="public-loading-more" v-if="loading">正在加载...</li>
						<li class="public-loading-more" v-if="listsClose">已加载全部</li>
					</ul>
				</div>
			</scroll-view>
		</div>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				color: "#ff0000",
				list: [{
					name: '关注'
				}, {
					name: '发现'
				}, {
					name: '本地'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				loading: false,
				listsClose: false,
				lists: [],
				pagers: {
					page: 1,
					rows: 10,
					totalPages: 0
				}
			};
		},
		filters: {},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				locationInfo: state => state.locationInfo
			})
		},
		props: ['gallery_list'],
		components: {},
		methods: {
			down() {
				this.$emit('scroll_down')
			},
			goDetail(item) {
				wx.navigateTo({
					url: `../detail/main?id=${item.id}`
				});
			},
			searchChang() {
				wx.navigateTo({
					url: "../search/main"
				});
			},


			// async onShow() {
			// 	this.pagers.page = 1;
			// 	this.listsClose = false;
			// 	this.loading = false;
			// 	this.getList();
			// }
		}
	}
</script>

<style scoped lang="less">
	.home-navigation {
		padding: 2px 15px 5px 15px;
		position: fixed;
		background: #fff;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		font-size: 14px;
		box-sizing: border-box;

		.home-search {
			margin-bottom: 10px;

			div {
				display: flex;
				align-items: center;
				background: #e5e5e5;
				border-radius: 15px;
				padding: 3px 10px;
				color: #666;

				img {
					width: 20px;
					height: 20px;
					display: block;
				}
			}
		}

		.nav-list {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 14px;

			span {
				margin-right: 15px;
				transition: all 0.2s;
				color: #999;

				&.active {
					color: #ff2f2f;
					font-weight: bold;
				}
			}
		}
	}

	// .home-title {
	//   font-size: 16px;
	//   font-weight: bold;
	//   padding: 80px 10px 15px;
	//   background: #f5f5f6;
	// }

	.public-list {
		padding-top: 2px;
	}

	.public-index-wrap {
		position: relative;
		min-height: 100vh;
	}
</style>
