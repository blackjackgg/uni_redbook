<template>
  <view class="u-wrap">
    <view class="u-search-box">
      <u-search placeholder="输入名称搜索圈子"
                v-model="keyword"
                @search="search"
                :show-action="false"></u-search>
    </view>
    <view class="u-menu-wrap">
      <scroll-view scroll-y
                   scroll-with-animation
                   class="u-tab-view menu-scroll-view"
                   :scroll-top="scrollTop">
        <view v-for="(item,index) in classList"
              :key="index"
              class="u-tab-item"
              :class="[current==index ? 'u-tab-item-active' : '']"
              :data-current="index"
              @tap.stop="swichMenu(index)">
          <text class="u-line-1">{{item.categoryName}}</text>
        </view>
      </scroll-view>
      <scroll-view scroll-y
                   class="right-box">
        <view class="page-view">
          <block v-if="topicList&&topicList.length > 0 "
                 v-for="(item,index) in topicList"
                 :key="index">
            <view @click="toTarget(item)">
              <view class="topic-item">
                <u-image width="100rpx"
                         height="100rpx"
                         shape="circle"
                         :src="item.cover"></u-image>
                <view class="right">
                  <view>{{item.circleName}}</view>
                  <view class="desc">{{item.dsc}}</view>
                  <view class="num">
                    <text>{{item.memberContent.member}}人已加入</text>
                    <text>{{item.memberContent.content}}篇内容</text>
                  </view>
                </view>
              </view>
            </view>
          </block>
          <block v-if="topicList&&topicList.length=== 0">
            <u-empty margin-top="100"
                     text="暂无内容"
                     mode="favor"></u-empty>
          </block>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isBack: false,
      scrollTop: 0, //tab标题的滚动条位置
      current: 0, // 预设当前项的值
      menuHeight: 0, // 左边菜单的高度
      menuItemHeight: 0, // 左边菜单item的高度
      classList: [],
      classId: "",
      topicList: [],
      loadStatus: "loadmore",
      keyword: ""
    }
  },
  onLoad (options) {
    console.log(options)
    if (options.class_id) {
      this.classId = options.class_id;
    }

    if (options.isBack) {
      this.isBack = true;
    }

    this.getClassList();
  },
  methods: {
    toTarget (item) {
      console.log(this.isBack)
      if (this.isBack) {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]; //上一个页
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          circle: {
            id: item.id,
            circleName: item.circleName
          }
        })
        uni.navigateBack();

      } else {
        uni.navigateTo({
          url: "/pages/topic-detail/topic-detail?id=" + item.id
        })
      }
    },
    search () {
      uni.navigateTo({
        url: "/pages/topic-list/topic-list?keyword=" + this.keyword
      })
    },
    getClassList () {
      this.$H.get('/yj-grouping/category').then(res => {
        console.log(res)
        this.classList = res.data;
        if (this.classId) {
          this.classList.forEach((item, index) => {
            if (item.id == this.classId) {
              this.classId = res.data[index].id;
              this.swichMenu(index)
            }
          })
        } else {
          this.classId = res.data[0].id;
          console.log(res.data[0].id)
          this.getTopicList();
        }
      })
    },
    getTopicList () {
      this.loadStatus = "loading";
      this.$H.get("/yj-grouping/circle/byCategoryId/" + this.classId)
        .then(res => {
          this.topicList = this.topicList.concat(res.data);
          if (0) {
            this.loadStatus = "nomore";
          } else {
            this.loadStatus = "loadmore"
          }
        })
    },
    // 点击左边的栏目切换
    async swichMenu (index) {
      if (index == this.current) return;
      this.current = index;
      // 如果为0，意味着尚未初始化
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect('menu-scroll-view', 'menuHeight');
        await this.getElRect('u-tab-item', 'menuItemHeight');
      }
      // 将菜单菜单活动item垂直居中
      this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;

      this.classId = this.classList[index].id;
      this.topicList = [];
      this.getTopicList();
    },
    // 获取一个目标元素的高度
    getElRect (elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(this);
        query.select('.' + elClass).fields({
          size: true
        }, res => {
          // 如果节点尚未生成，res值为null，循环调用执行
          if (!res) {
            setTimeout(() => {
              this.getElRect(elClass);
            }, 10);
            return;
          }
          this[dataVal] = res.height;
        }).exec();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "topic-cate-list.scss";
</style>
