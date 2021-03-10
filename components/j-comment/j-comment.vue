<template>
	<view class="comment_view">
		<view class="comment_send">
	<u-input class="cm_input" v-model="$store.state.current_comment" :placeholder="'请发表评论'"	:type="type" :border="border"  :maxlength="'200'" />
  <view class="tui-enclosure">
    <tui-icon name="satisfied" :size="20"  @click="changeemoji" class="tui-mr icon_send"></tui-icon>
    <tui-icon name="send"  :size="20" class="tui-mr icon_send"></tui-icon>
    </view>
	</view>
		<!--表情-->
		<view v-show="showemoji" class="emoji" @tap.prevent.stop="">
			<view class="list">
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
								comment_text:""
			}
		},
		methods: {
			changeemoji(){
				this.showemoji =!this.showemoji
			},
			addtotext(item){
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
	display: flex;
	justify-content: space-between;
	margin-bottom: 3px;
}

.comment_view{
	}
.container2{
  padding: 30upx;
  box-sizing: border-box;
}
.cm_input{
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
 display: flex;
 justify-content: space-between;
 width: 50px;
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
	position: relative;
	height: 300upx;
	overflow: scroll;
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
		
		.item{
				justify-content: center;
				display: flex;
				width: calc((100vw) /12);
                margin-bottom: 20px;
		}
	}


</style>
