<template>
  <view>
    <view class="head">
      <view class="tab-box">
        <u-tabs name="tab_name"
                ref="uTabs"
                font-size="35"
                bg-color="#fff"
                :list="tabs"
                active-color="#616161"
                :is-scroll="true"
                :current="current"
                @change="tabChange"></u-tabs>
      </view>
    </view>
    <view style="height: 80rpx;"></view>
    <view>
      <view v-show="current === 0">
        <post-list :list="followPost"
                   :loadStatus="loadStatus"></post-list>
      </view>
      <view v-show="current === 1">
        <!-- 推荐内容 -->
        <view class="post-list">
          <post-waterfall ref="postwaterfall"
                          :list="postList"
                          :type="like"
                          :loadStatus="loadStatus"></post-waterfall>
        </view>
      </view>
      <view v-show="current === 2">
        <view v-if="showOpenLocation"
              style="margin:100rpx 30rpx 30rpx 30rpx;">
          <u-button type="success"
                    shape="circle"
                    @click="getLocation">开启定位</u-button>
        </view>
        <view v-else
              class="post-waterfall">
          <post-waterfall ref="waterfall"
                          :list="nearbyPostList"
                          :loadStatus="loadStatus"></post-waterfall>
        </view>
      </view>
      <view v-show="current===3">
        <view class="wrap">
          <u-swiper :list="list"
                    title="true"
                    :effect3d="true"></u-swiper>
        </view>
        <view v-for="(item,index) in list"
              class="item"
              :key="index">
          <image class="game-item"
                 @click="toBuGua(index)"
                 :src="item.image">
          </image>
        </view>
      </view>
    </view>
    <!-- 返回顶部 -->
    <u-back-top :scroll-top="scrollTop"></u-back-top>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  components: {
    postList,
    topicList,
    postWaterfall,
    UButton,
    SwiperVideo,
    UTabsSwiper,
    UImage,
    UToast
  },
  data () {
    return {
      tabs: [{
        tab_name: '关注'
      }, {
        tab_name: '推荐'
      },
      {
        tab_name: uni.getStorageSync("district") || '同城'
      },
      {
        tab_name: '互动'
      },
      ],
      list: [{
        image: 'http://121.36.100.85:3389/default/%E6%97%85%E8%A1%8C.jpeg',
        title: '善易者不占，知易者不占而知'
      },
      {
        image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
        title: '身无彩凤双飞翼，心有灵犀一点通'
      },
      {
        image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
      }
      ],
      current: 1,
      myTopic: [],
      scrollTop: 0,
      postList: [],
      followPost: [],
      nearbyPostList: [],
      loadStatus: "loadmore",
      storageTopicList: [],
      page1: 1,
      page2: 1,
      page3: 1,
      limit: 10,
      shareCover: "",
      showOpenLocation: false
    }
  },
  onShareAppMessage (res) {
    if (res.from === 'button') { // 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: this.$c.miniappName,
      path: '/pages/index/index',
      imageUrl: this.shareCover
    }
  },
  onLoad () {
    this.$H.get("/yj-grouping/user/me").then(res => {
      console.log(res)
      if (res.code === "00000") {
        this.getPostList(false);
        //#ifdef MP-WEIXIN
        wx.showShareMenu({
          withShareTicket: true,
          menus: ['shareAppMessage', 'shareTimeline']
        })
        //#endif
        if (!uni.getStorageSync("location_info")) {
          this.showOpenLocation = true;
        }
      } else {
        uni.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  },
  onShow () {
  },
  onPullDownRefresh () {
    this.page1 = 1;
    this.page2 = 1;
    this.page3 = 1;
    this.postList = [];
    this.nearbyPostList = [];
    this.followPost = [];
    console.log("刷新")
    if (this.current === 0) {
      this.getFollowPost();
    }
    if (this.current === 1) {
      this.getPostList();
    }
    if (this.current === 2) {
      if (!this.showOpenLocation) {
        this.$refs.waterfall.clear();
        this.getNearbyPost();
      }
    }
    uni.stopPullDownRefresh();
  },
  onPageScroll (e) {
    this.scrollTop = e.scrollTop;
  },
  onReachBottom () {
    console.log("触底")
    console.log(this.current)
    if (this.current === 0 && this.loadStatus != "nomore") {
      this.page2++
      this.getFollowPost();
    }
    if (this.current === 1 && this.loadStatus != "nomore") {
      this.page1++
      this.getPostList(true);
    }
    if (this.current === 2 && this.loadStatus != "nomore") {
      if (!this.showOpenLocation) {
        this.page3++
        this.getNearbyPost();
      }
    }
  },
  watch: {
    showOpenLocation () {
      this.getNearbyPost();
    }
  },
  methods: {
    toVideo () {
      uni.navigateTo({
        url: "/pages/swiper-video/swiper-video"
      })
    },
    toBuGua (index) {
      if (index == 0) {
        uni.navigateTo({
          url: "/pages/gua/gua"
        })
      } else {
        this.$refs.uToast.show({
          title: '功能待开发...',
          type: 'warn',
        })
      }
    },
    // view左右移动，通知tabs的滑块跟随移动
    transition (e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish (e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    getNearbyPost () {
      this.loadStatus = "loading";
      if (!this.showOpenLocation) {
        this.$H.get('/yj-grouping/article/pages/' + this.page3 + "/" + this.limit)
          .then(res => {
            console.log(res)
            res.data.forEach(item => {
              item.media = JSON.parse(item.media)
              item.distance = 10;
            })
            this.nearbyPostList = this.nearbyPostList.concat(res.data);
            res.total = res.total ? res.total : 0
            if (res.total <= this.page3 * this.limit) {
              this.loadStatus = "nomore";
            } else {
              this.loadStatus = "loadmore"
            }
          });
      }
    },
    getLocation () {
      let that = this;
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          var qqmapsdk = new QQMapWX({
            key: 'BMYBZ-GV464-JESUX-DZL53-Z6LNH-U6BIA' // 必填
          });
          qqmapsdk.reverseGeocoder({
            location: res,
            success: function (res2) {
              that.tabs[2].tab_name = res2.result.ad_info.district;
              uni.setStorageSync("district", res2.result.ad_info.district);
            },
            fail: function (error) {
              // console.error(error);
            },
            complete: function (res) {
              // console.log(res);
            }
          })
          uni.setStorageSync("location_info", res);
          that.showOpenLocation = false;
        }
      });
    },
    getSysInfo () {
      this.$H.get("system/miniConfig").then(res => {
        this.shareCover = res.result.intro;
      })
    },
    tabChange (index) {
      // this.page1 = 1;
      // this.page2 = 1;
      // this.page3 = 1;
      this.current = index;
      if (index === 0 && this.page2 == 1) {
        this.followPost = [];
        this.getFollowPost();
      }
      if (index === 1 && this.page1 == 1) {
        this.$refs.postwaterfall.clear();
        this.postList = [];
        this.getPostList();
      }
      if (index == 2 & this.page3 == 1) {
        if (!this.showOpenLocation) {
          this.$refs.waterfall.clear();
          this.nearbyPostList = [];
          this.getNearbyPost();
        }
      }
    },
    getPostList (isConcat = false) {
      this.loadStatus = "loading";
      if (!isConcat) {
        this.postList = [];
        this.$refs.postwaterfall.clear();
      }
      this.$H.get('/yj-grouping/article/pages/' + this.page1 + "/" + this.limit)
        .then(res => {
          console.log(res)
          res.data.forEach(item => {
            item.media = JSON.parse(item.media)
          })
          this.postList = this.postList.concat(res.data);
          console.log(this.postList)
          res.total = res.total ? res.total : 0
          console.log(this.page1 * this.limit)
          if (res.total <= this.page1 * this.limit) {
            this.loadStatus = "nomore";
          } else {
            this.loadStatus = "loadmore"
          }
        });
    },
    getFollowPost () {
      this.loadStatus = "loading";
      this.$H.get('/yj-grouping/article/getAttentionArticle/' + uni.getStorageSync("user").id)
        .then(res => {
          console.log(res)
          res.data.forEach(item => {
            item.media = JSON.parse(item.media)
          })
          this.followPost = this.followPost.concat(res.data);
          this.loadStatus = "nomore";
        });
    }
  }
}
</script>

<style lang="scss">
.wrap {
  padding: 40rpx;
}
.item {
  padding: 40rpx 20rpx 0 40rpx;
}
.game-item {
  width: 100%;
  height: 250rpx;
  border-radius: 10rpx;
}
</style>