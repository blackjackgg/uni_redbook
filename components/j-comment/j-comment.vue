<template>
	<view class="comment_view" :style="{height: popupheight	+'px',}">
	<view class="comment_send" >
	
			<!-- 这部分固定到头部 不然和下面滚动的冲突！ -->
			<textarea  class="cm_input" v-model="current_comment" :placeholder="'请发表评论'" height="20px" :type="type" :border="border" 
			 :maxlength="'500'"   :cursor-spacing="'200'"  @confirm="" confirm-type="send"/>
			<view class="tui-enclosure">
			<tui-icon :name="faceicon" :size="26"  @click="changeemoji" class="tui-mr icon_send"></tui-icon>	
			<tui-button  type="primary" shape='circle'width="100rpx" height="60rpx" >发送</tui-button>

			<!-- <tui-icon :style="{'margin-right':'5px'}"  name="send"  :size="26" class="tui-mr icon_send"></tui-icon> -->
			</view>
	</view>
		<!--表情-->
	<!-- 	@tap.prevent.stop="" -->
		<view v-show="showemoji" class="emoji"   scroll-y="true" >
			<view class="list" >
				<view class="item" v-on:click="addtotext(item)" v-for="(item, index) in emojis" :key="index">{{ item }}</view>
			</view>
		</view>


</view>
</template>

<script>
	var emoji = require('./emo.json')
	import {mapState} from 'vuex'
	export default {
		computed: {
			current_comment:{
				get () { return this.$store.state.current_comment},
				set (value) { this.$store.state.current_comment = value }
			}
		},
		components: {
		},
		mounted() {
			
			this.emojis = emoji
		},
		watch:{
			// current_emoji(val,old){
			// 	console.log(val,old)
			// 	this.comment_text += val
			// }
		},
		data() {
			return {	        emojis: [],
								value: '',
								type: 'textarea',
								border: true,
								showemoji:false,
								comment_text:"",
								popupheight:80,
								faceicon:"satisfied" 
			}
		},
		methods: {
			changeemoji(){
				this.showemoji =!this.showemoji
				if (this.showemoji){
					this.popupheight = 280
					this.faceicon="imkeyboard"
				}
				else{
					this.popupheight = 80
					this.faceicon="satisfied"
				}
			},
			addtotext(item){
				console.log("hellp")
				this.$store.state.current_comment += item
			}
		}
	}
</script>

<style lang="scss">
page {
  background: #fff;
  color: #333;
}
.comment_send{
	z-index:8888888;
	display: flex;
	align-items: center;
	width: 100%;
	height: 80px;
	position: fixed;
	top: 0px;
	padding-top: 0px;
	justify-content: space-between;
	background-color: white;
	// margin-bottom: 3px;
}

.comment_view{
	z-index: 99999999;
	width: 100vw;
	height:80px;
	}
.container2{
  padding: 30upx;
  box-sizing: border-box;
}
.cm_input{
	border-radius: 20px;
	background:  #f5f5f6;
	height: 50px;
	border: solid #f5f5f6;
	margin: 10px 0 0 10px;
}

.tui-cells {
  border-radius: 4upx;
  height: 280upx;
  box-sizing: border-box;
  padding: 20upx 20upx 0 20upx;
}

.tui-cells::after {
  content: '';
  position: absolute;
  height: 200%;
  width: 200%;
  border: 1px solid #e6e6e6;
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  left: 0;
  top: 0;
  border-radius: 8upx;
}

.tui-textarea {
  height: 210upx;
  width: 100%;
  color: #666;
  font-size: 28upx;
}

.tui-phcolor-color {
  color: #ccc !important;
}

.tui-textarea-counter {
  font-size: 24upx;
  color: #999;
  text-align: right;
  height: 40upx;
  line-height: 40upx;
  padding-top: 4upx;
}
.tui-enclosure{
	width: 200upx;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 26upx 10upx 5px 10upx;
 box-sizing: border-box;
}
.tui-mr{
}
.icon_send{
}
.tui-cmt-btn{
  margin-top: 60upx;
}


.emoji{
	background-color: #F3F3F3;
	// position: relative;
	margin-top: 80px;
	// overflow: scroll;
	// -webkit-overflow-scrolling:touch;
	}
	.list:after {
		content: ' ';
		flex: auto;
	}
			
	.list{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding:10px 0;
		overflow: auto;
		
		.item{  font-size: 26px;
				justify-content: center;
				display: flex;
				width: calc((100vw) /6);
                margin-bottom: 20px;
		}
	}
	
	.j-send{
		margin-right: 5px;
	}


</style>
