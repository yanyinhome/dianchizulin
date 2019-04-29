<template>
	<view class="content">
		<rich-text :nodes="string"></rich-text>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				string:''
			};
		},
		onLoad() {
			var that = this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url: that.http + 'net/getStory',
				header: that.header,
				method: 'POST',
				data: {
					type:1
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res)
					that.string = res.data.data.content
				},
				fail() {
					uni.showToast({
						title:'网络延迟，请刷新后重试!'
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
	}
</style>
