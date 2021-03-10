<template>
	<view>
		<view @click="changeemoji">sssss2</view>
		<j-emoji  :show="showemoji"></j-emoji>
		<view>{{current_emoji}}</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
		  ...mapState({
		    current_emoji: state => state.current_emoji,
		  })
		},
		data() {
			return {
				showemoji:false,
			}
		},
		methods: {
			changeemoji(){
				this.showemoji =!this.showemoji
			}
		}
	}
</script>

<style>

</style>
