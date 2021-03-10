<template>
		<!--表情-->
		<view v-show="show" class="emoji" @tap.prevent.stop="">
			<view class="list">
				<view class="item" v-on:click="fuckemoji(item)" v-for="(item, index) in emojis" :key="index">{{ item }}</view>
			</view>
		</view>
</template>

<script>
var emoji = require('./emo.json')

export default{
	components: {  },
	props:['show'],
	data(){
		return {
			emojis: [],
			content:"haha",
		}
	},
	mounted() {
		
		this.emojis = emoji
	},
	methods: {
		fuckemoji(item){
			this.$store.commit("set_emoji", item)
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	overflow: hidden;
}

/* #ifdef H5 */
.container{
	height: calc(100vh - 88upx);
}
/* #endif */

.status_bar,
.container,
.header,
.header{
	border-bottom: 2upx solid #EEE;
	
	.center{
		font-weight: bold;
	}
}
.emoji{
	background-color: #F3F3F3;
	position: relative;
	height: 300upx;
	overflow: scroll;
	            .list:after {
	                content: ' ';
	                flex: auto;
	            }
				
	
	.list{
		                display: flex;
		                justify-content: space-around;
		                flex-wrap: wrap;
						padding:20px 0;
		
		.item{
				justify-content: center;
				display: flex;
				width: calc((100vw) /12);
                margin-bottom: 20px;
		}
	}
}

</style>
