<template>
	 <view>
  <view class="container2">
	    <div class="title">
	      <input
	        type="text"
	        v-model.trim="form.title"
	        placeholder="输入标题会引起更多人关注"
	        maxlength="50"
	      />
	    </div>
    <textarea placeholder="这一刻的想法..."
              maxlength="-1"
			  height="60px"
              v-model="form.content"
              class="post-txt"></textarea>
			  
	<tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload>
<!--    <view @click="chooseItem"
          class="upload-wrap">
      <u-icon name="plus"></u-icon>
    </view>
    <p>图片</p>

    <block v-if="form.type == 2">
      <video class="upload-video"
             :src="form.media[0]"></video>
    </block> -->
<!--   <u-upload ref="uUpload"
              name="file"
              :max-count="9"
              :header="header"
              :action="uploadImgUrl"
              @on-uploaded="submit"
              :custom-btn="true"
              :auto-upload="false"></u-upload> -->

 <!--   <u-action-sheet :list="sheetList"
                    v-model="showSheet"
                    @click="onSheetItem"></u-action-sheet>
    <u-toast ref="uToast" />
    <u-mask :show="uploadStatus">
      <view class="warp">
        <u-loading mode="flower"
                   class="wrap"
                   :show="uploadStatus"
                   size="50"></u-loading>
        文件上传...
      </view> -->

<!--    </u-mask> -->
	
	<div class="public-btn-class fixed_bottom">
	  <div class="common-btn mg-d-s pd" :class="{active: true}" @click.stop="postForm()">发布作品</div>
	</div>
	


  </view>
  <u-cell-group :border="false">
    <u-cell-item icon="tags"
                 :title="topicname"
                 bg-color="#F5F5F5"
                 @click="chooseCircle"></u-cell-item>
    <u-cell-item icon="map"
                 :title="position"
                 bg-color="#F5F5F5"
                 @click="setParams(1)"></u-cell-item>
  </u-cell-group>
 </view>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  components: { },
  computed:{
		 topicname:{
			  get(){
				  return this.$store.state.current_topic.topic_name || "添加话题"
			  }
	  }
  },
  data () {
    return {
      sheetList: [
        {
          text: '选择图片',
          color: 'black'
        },
        // {
        //   text: '选择视频',
        //   color: 'black'
        // }
      ],
      showSheet: false,
      position: '添加地点',
      circle: {
        circleName: '添加话题'
      },
      btnDisabled: false,
      btnLoading: false,
      uploadImgUrl:  '/yj-resource/files',
      form: {
        id: "",
        content: "",
        topicId: "",
        userId: uni.getStorageSync("user").id,
        images: "",
        video: "",
        media: [],
        circleId: "",
        glance: "",
        longitude: 0,
        latitude: 0,
        type: 1,

      },
      uploadStatus: false,
      header: {
        Authorization: 'Bearer ' + uni.getStorageSync("token")
      },
    };
  },
  onLoad (options) {

  },
  onShow (e) {
    // let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];
    // if (currPage.data.circle) {
    //   this.circle = currPage.data.circle;
    // }
    // let position = uni.getStorageSync("position");
    // if (position) {
    //   this.position = position
    // }
    // console.log(this.circle)
    // if (this.circle.id) {
    //   this.form.circleId = this.circle.id
    // }
  },
  methods: {
	  
    chooseItem () {
      // this.showSheet = true
	  this.chooseImage()
    },
    onSheetItem (index) {
      let runQueue = {
        0: this.chooseImage,
        1: this.chooseVideo
      }
      runQueue[index]();
    },
    chooseVideo () {
      this.form.media = [];
      this.form.type = 2;
      let that = this;

      uni.chooseVideo({
        success: (res) => {
          console.log("sssssssssssss", res)
          this.uploadStatus = true;
          const tempFilePaths = res.tempFilePath;
          uni.uploadFile({
            url: this.uploadImgUrl,
            filePath: tempFilePaths,
            name: 'file',
            header: {
              Authorization: 'Bearer ' + uni.getStorageSync("token")
            },
            success: (res2) => {
              console.log(res2)
              let rs = JSON.parse(res2.data)
              if (rs.code == "00000") {
                that.form.media.push(rs.data);
              }
              this.uploadStatus = false;
            }
          });
        }
      });
    },
    chooseImage () {
      this.form.media = [];
      this.form.type = 1;
      this.$refs.uUpload.selectFile();
    },
    setParams (index) {
      let runQueue = {
        0: this.chooseCircle,
        1: this.choosePosition
      }
      runQueue[index]();
    },
    choosePosition () {
      uni.chooseLocation({
        success: res => {
          this.position = res.address;
          uni.setStorageSync("position", res.address)
          console.log(res)
        }
      })
    },
    chooseCircle () {
	  console.log("navigate");
      uni.navigateTo({
       url: `../topic-list/topic-list`,
	    success: res => {},fail: (err) => {console.log(err);},complete: () => {}

      })
	  
	  console.log("end");
    },
    uploadImg () {
      this.btnDisabled = true;
      this.btnLoading = true;

      if (!this.form.content) {
        this.$refs.uToast.show({
          title: "内容不能为空",
          type: 'error'
        })
        this.btnDisabled = false;
        this.btnLoading = false;
        return;
      }

      console.log(this.circle)

      if (!this.form.circleId) {
        this.$refs.uToast.show({
          title: "圈子不能为空",
          type: 'error'
        })
        this.btnDisabled = false;
        this.btnLoading = false;
        return;
      }

      if (this.form.type == 1) {
        this.$refs.uUpload.upload();
      }

      if (this.form.type == 2) {
        this.submit();
      }


    },
    submit (e) {
      console.log(e)
      console.log(this.form.type)
      if (this.form.type == 1) {
        let mediaList = [];
        e.forEach(function (item, index) {
          mediaList.push(item.response.data)
        })
        this.form.media = mediaList;
      }

      console.log(this.form)

      this.form.media = JSON.stringify(this.form.media)

      this.$H.post("/yj-grouping/article", this.form).then(res => {
        console.log(res)
        if (res.code == "00000") {
          console.log(this.form.type)
          if (this.form.type == 2) {
            uni.redirectTo({
              url: "/pages/video-detail/video-detail?id=" + res.data.id
            })
          }

          if (this.form.type == 1) {
            uni.redirectTo({
              url: "/pages/post-detail/post-detail?id=" + res.data.id
            })
          }

        } else {
          this.$refs.uToast.show({
            title: res.msg,
            type: 'error'
          })
        }
        this.btnDisabled = false;
        this.btnLoading = false;
      })
    },
    reset () {
      this.form = {
        id: "",
        content: "",
        topicId: "",
        userId: uni.getStorageSync("user").id,
        media: [],
        circleId: "",
        type: 1
      }
    },
	postForm(){
		uni.showLoading({
			title:"发布中..."
		})
		setTimeout(this.success,1000)
	},
	success(){
		uni.showToast({
			title:"发布成功"
		})
		uni.switchTab({
			url:'../index/index'
		})
	}
  }
}
</script>

<style lang="scss">
	
.head {
	display: flex;
	padding: 20rpx;
	border-bottom: 1px solid #f5f5f5;
}

.head .plus-btn {
	margin-left: auto;
}

.post-txt {
	width: 100%;
	padding: 20rpx 0;
	border-bottom: 1px solid #f5f5f5;
	min-height: 300rpx;
}

.upload-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 180rpx;
	height: 180rpx;
	background-color: #ebe1e1ec;
	margin-top: 30rpx;
	border-radius: 10rpx;
}

.upload-video{
	width: 180rpx;
	height: 180rpx;
	margin-top: 30rpx;
}

.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}




page {
  background-color:white;
  font-size: 32rpx;
  line-height: 1.7;
}

.container2 {
  padding: 20rpx;
  

}

    .title {
		width: 100%;
      border-bottom: 1px solid #eee;
      // padding: 15px 0;
      font-size: 16px;
      font-weight: bold;
    }

.fixed_bottom{
	display: flex;
	justify-content: center;
	position: fixed;
	bottom: 50px;
	left: 0px;
	width: 100%;
}

</style>


