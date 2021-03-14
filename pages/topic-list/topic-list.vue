<!--
 * @Author: your name
 * @Date: 2020-12-23 16:07:36
 * @LastEditTime: 2021-01-21 20:58:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /yj-project/src/pages/topic-list/topic-list.vue
-->
<template>
  <view>
    <view class="u-search-box">
      <u-search placeholder="搜索更多话题"
                v-model="keyword"
                @change="getTopicList"
                :show-action="false"></u-search>
    </view>
	
	<tui-list-view >
		<tui-list-cell  v-for="item in topicList" @click="chosetopic(item)"> 
		# {{item.topic_name}}
		</tui-list-cell>
	</tui-list-view>


    <!-- 加载状态 -->
    <block v-if="topicList.length === 0  ">  
	<!-- loadStatus == 'nomore' -->
      <u-empty text="暂无相关话题"
               mode="favor"></u-empty>
    </block>
  </view>
</template>

<script>
let page;
export default {
  data () {
    return {
      current: 0,
      topicClssList: [],
      topicList: [],
      loadStatus: "nomore",
      keyword: ""
    };
  },
  onLoad (options) {
    // this.keyword = options.keyword;
	this.getTopicList()
  },
  methods: {
    getTopicList () {
		this.topicList = [
			{"topic_name":"简笔画教程"},
			{"topic_name":"Vlog我的一天"},
			{"topic_name":"广州交友"},
			{"topic_name":"男士护肤指南"},
			{"topic_name":"周末去哪儿"},
			{"topic_name":"我的日常"},
			{"topic_name":"游戏分享"},
			{"topic_name":"相机实测"},
			{"topic_name":"周末去哪儿2"},
		]
		this.loadStatus = "loading";
      // this.loadStatus = "loading";
      // this.topicList = [];
      // this.$H.get('topic/list', {
      //   keyword: this.keyword
      // }).then(res => {
      //   this.topicList = this.topicList.concat(res.result.data);
      //   if (res.total < this) {
      //     this.loadStatus = "nomore";
      //   } else {
      //     this.loadStatus = "loadmore"
      //   }
      // })
    },
    toTopic (id) {
      uni.navigateTo({
        url: "/pages/topic-detail/topic-detail?id=" + id
      })
    },
	chosetopic(item){
		this.$store.state.current_topic = item
		uni.navigateBack({
		})
	}
  }
}
</script>

<style lang="scss">
// @import "topic-list.css";
.j-list{
	margin-top: 300px;
	height: 100vh;
}
</style>
