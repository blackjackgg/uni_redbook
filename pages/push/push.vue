<template>
  <view class="container">
    <view class="head">
      <!-- 图文 -->
      <u-button class="plus-btn"
                type="primary"
                :disabled="btnDisabled"
                :loading="btnLoading"
                @click="uploadImg">发布</u-button>
      <block v-if="form.type == 1">

      </block>
    </view>
    <textarea placeholder="这一刻的想法..."
              :auto-height="true"
              maxlength="-1"
              v-model="form.content"
              class="post-txt"></textarea>
    <view @click="chooseItem"
          class="upload-wrap">
      <u-icon name="plus"></u-icon>
    </view>
    <p>图片/视频</p>

    <block v-if="form.type == 2">
      <video class="upload-video"
             :src="form.media[0]"></video>
    </block>
    <u-upload ref="uUpload"
              name="file"
              :max-count="9"
              :header="header"
              :action="uploadImgUrl"
              @on-uploaded="submit"
              custom-btn="true"
              :auto-upload="false"></u-upload>
    <u-cell-group border="false">
      <u-cell-item icon="tags"
                   :title="circle.circleName"
                   bg-color="#F5F5F5"
                   @click="setParams(0)"></u-cell-item>
      <u-cell-item icon="map"
                   :title="position"
                   bg-color="#F5F5F5"
                   @click="setParams(1)"></u-cell-item>
    </u-cell-group>
    <u-action-sheet :list="sheetList"
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
      </view>

    </u-mask>

  </view>
</template>

<script>
export default {
  components: { },
  data () {
    return {
      sheetList: [
        {
          text: '选择图片',
          color: 'black'
        },
        {
          text: '选择视频',
          color: 'black'
        }
      ],
      showSheet: false,
      position: '选择位置',
      circle: {
        circleName: '选择圈子'
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
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.circle) {
      this.circle = currPage.data.circle;
    }
    let position = uni.getStorageSync("position");
    if (position) {
      this.position = position
    }
    console.log(this.circle)
    if (this.circle.id) {
      this.form.circleId = this.circle.id
    }
  },
  methods: {
    chooseItem () {
      this.showSheet = true
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
      uni.navigateTo({
        url: "/pages/topic-cate-list/topic-cate-list?isBack=true"
      })
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
    }
  }
}
</script>

<style lang="scss">
@import "push.css";
</style>
