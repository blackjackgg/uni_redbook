<template>
  <view class="wrap">
    <view class="head">
      <image mode="aspectFill"
             class="bg"
             :src="topicInfo.bg"></image>
      <view class="head-c">
        <text class="name">{{topicInfo.circleName}}</text>
        <view class="count">
          <text>{{topicInfo.memberContent.member}}人已加入</text>·
          <text>{{topicInfo.memberContent.content}}篇内容</text>
          <block v-if="topicInfo.isJoin">
            <u-button class="btn margin-left"
                      :custom-style="btnStyle"
                      @click="jumpAddDis"
                      type="success">创建话题</u-button>
            <u-button class="btn"
                      type="error"
                      :custom-style="btnStyle"
                      @click="outTopic">退出圈子</u-button>
          </block>
          <block v-else>
            <u-button class="btn margin-left"
                      :custom-style="btnStyle"
                      type="success"
                      @click="joinTopic">加入圈子</u-button>
          </block>
        </view>
      </view>
    </view>
    <!-- 公告 -->
    <view class="member-wrap"
          @click="noticeShow =true">
      <view class="member-wrap-head">
        <view class="notice-box">公告<text class="notice-txt">{{topicInfo.dsc || "暂无公告"}}</text></view>
        <u-icon class="icon"
                name="arrow-right"></u-icon>
      </view>
    </view>
    <!-- 公告弹窗 -->
    <u-popup v-model="noticeShow"
             mode="bottom"
             :closeable="true"
             height="60%">
      <view class="popup-notice-wrap">
        <view class="popup-notice-head">公告</view>
        <text>{{topicInfo.dsc}}</text>
      </view>
    </u-popup>
    <!-- 管理员 -->
    <!-- 	<view class="member-wrap" v-if="topicInfo.member_list.length > 0">
			<view class="member-wrap-head">
				<text>管理员</text>
				<u-icon class="icon" name="arrow-right"></u-icon>
			</view>
			<u-grid :col="5" :border="false" @click="jump">
				<u-grid-item v-for="(item,index) in topicInfo.member_list" :key="index" :index="item.uid">
					<u-avatar class="avatar" :src="item.avatar"></u-avatar>
					<view class="grid-text">{{item.username | substr}}</view>
				</u-grid-item>
			</u-grid>
		</view> -->
    <view class="tabs-box">
      <view class="tab-left">
        <u-tabs :list="tabList"
                :is-scroll="false"
                :current="current"
                @change="tabsChange"></u-tabs>
      </view>
    </view>
    <view v-show="current == 0">
      <post-list :showTopic="false"
                 :handle="true"
                 :uid="topicInfo.uid"
                 :list="postNews"
                 :loadStatus="loadStatus"></post-list>
    </view>
    <view v-show="current == 1">
      <post-list :showTopic="false"
                 :handle="true"
                 :uid="topicInfo.id"
                 :list="postHot"
                 :loadStatus="loadStatus"></post-list>
    </view>
    <view v-show="current == 2">
      <dis-list :list="topicList"></dis-list>
    </view>
    <view v-show="current == 3">
      <user-list :list="memberList"></user-list>
    </view>
    <!-- 发布按钮 -->
    <uni-fab :content="fabList"
             direction="vertical"
             horizontal="right"
             v-if="topicInfo.isJoin"
             @trigger="onTrigger"></uni-fab>
  </view>
</template>

<script>
// import postList from '../../components/post-list/post-list.vue';
// import disList from '../../components/discuss-list/discuss-list.vue';
// import userList from '../../components/user-list/user-list.vue';
export default {
  components: {
    postList,
    disList,
    userList
  },
  data () {
    return {
      current: 0,
      tabList: [{
        name: '最新'
      }, {
        name: '最热'
      }, {
        name: '话题'
      },
      {
        name: '圈友'
      }
      ],
      limit: 2,
      topicLimit: 10,
      noticeShow: false,
      btnStyle: {
        marginRight: 0,
        width: '150rpx',
        fontSize: '12px',
        height: '60rpx',
        lineHeight: '60rpx'
      },
      topicId: 0,
      topicInfo: {
        member_list: [],
        discuss_list: []
      },
      topicList: [],
      memberList: [],
      postHot: [],
      postNews: [],
      loadStatus: "loading",
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      fabList: [{
        iconPath: "/static/images/img-icon.png",
        selectedIconPath: "/static/images/img-icon.png",
        text: "图文",
        url: "/pages/plus-post/plus-post?type=1"
      },
      {
        iconPath: "/static/images/video-icon.png",
        selectedIconPath: "/static/images/video-icon.png",
        text: "视频",
        url: "/pages/plus-post/plus-post?type=2"
      }
      ]
    };
  },
  onLoad (options) {
    this.topicId = options.id;

    //#ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    //#endif
  },
  onShow () {
    this.initData();
    this.getTopicInfo();
    this.getPostList();
  },
  onReachBottom () {
    if (this.current == 0 && this.loadStatus !== "nomore") {
      this.page1++;
      this.getPostList();
    }

    if (this.current == 1 && this.loadStatus !== "nomore") {
      this.page2++;
      this.getPostList();
    }


  },
  onPullDownRefresh () {
    if (this.current == 0) {
      this.page1 = 1;
      this.postNews = [];
    }

    if (this.current == 1) {
      this.page2 = 1;
      this.postHot = [];
    }

    if (this.current == 2) {
      this.topicList = []
    }

    if (this.current == 3) {
      this.memberList = []
    }

    this.getPostList();
    uni.stopPullDownRefresh();
  },
  onShareAppMessage (res) {
    if (res.from === 'button') { // 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: this.topicInfo.topic_name + '-' + this.topicInfo.description,
      path: '/pages/topic-detail/topic-detail?id=' + this.topicId,
      imageUrl: this.topicInfo.bg_image
    }
  },
  onShareTimeline () {
    return {
      title: this.topicInfo.topic_name + '-' + this.topicInfo.description,
      imageUrl: this.topicInfo.bg_image,
      query: "id=" + this.topicId
    }
  },
  filters: {
    substr: function (e) {
      return e.substr(0, 5);
    }
  },
  methods: {
    tabsChange (index) {
      this.current = index;
      this.initData();
      this.getPostList();
    },
    initData () {
      this.postNews = [];
      this.postHot = [];
      this.page1 = 1;
      this.page2 = 1;
      this.page3 = 1;
    },
    onTrigger (e) {
      uni.navigateTo({
        url: e.item.url + "&topic_id=" + this.topicId
      })
    },
    jump (uid) {
      uni.navigateTo({
        url: "/pages/ucenter/ucenter?uid=" + uid
      })
    },
    joinTopic () {
      this.$H.post('/yj-grouping/user-circle', {
        circleId: this.topicId,
        userId: uni.getStorageSync("user").id
      }).then(res => {
        if (res.code === "00000") {
          this.topicInfo.isJoin = true
        }
      });
    },
    outTopic () {
      this.$H.delete('/yj-grouping/user-circle/' + this.topicId + "/" + uni.getStorageSync("user").id)
        .then(res => {
          console.log(res)
          if (res.code === "00000") {
            this.topicInfo.isJoin = false
          }
        });
    },
    getTopicInfo () {
      this.$H.get('/yj-grouping/circle/' + this.topicId + "?userId=" + uni.getStorageSync("user").id)
        .then(res => {
          console.log(res)
          this.topicInfo = res.data;
        });
    },
    jumpAddDis () {
      if (this.topicInfo.isJoin) {
        uni.navigateTo({
          url: "/pages/discuss-add/discuss-add?topicId=" + this.topicId
        })
      } else {
        uni.showToast({
          title: '您未加入圈子',
          duration: 2000
        });
      }

    },
    getPostList () {
      this.loadStatus = "loading";


      if (this.current == 0) {
        this.getPostByOrder(this.page1, "create_time")
      }

      if (this.current == 1) {
        this.getPostByOrder(this.page2, "glance")
      }

      if (this.current == 2) {
        this.getTopicList(this.page3, this.topicLimit)
        console.log("获取话题")
      }

      if (this.current == 3) {
        this.getMemberList();
        console.log("获取圈友")
      }


    },
    getPostByOrder (page, order) {
      this.$H.get('/yj-grouping/article/order/' + page + "/" + this.limit + "/" + this.topicId + "/" + order)
        .then(res => {

          res.data.forEach(item => {
            item.media = JSON.parse(item.media)
          });
          console.log(res)
          if (this.current == 0) {
            this.postNews = this.postNews.concat(res.data);
          }

          if (this.current == 1) {
            this.postHot = this.postHot.concat(res.data);
          }

          if (res.total <= this.limit * page) {
            this.loadStatus = "nomore";
          } else {
            this.loadStatus = "loadmore";
          }
        });
    },
    getTopicList (page, limit) {
      this.$H.get('/yj-grouping/topic/pages/' + page + "/" + limit + "/" + this.topicId)
        .then(res => {
          console.log(res)
          this.topicList = res.data;

        });
    },
    getMemberList () {
      this.$H.get('/yj-grouping/user-circle/byCid/' + this.topicId)
        .then(res => {
          console.log(res)
          this.memberList = res.data;

        });
    }
  }
}
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
@import "topic-detail.scss";
</style>
