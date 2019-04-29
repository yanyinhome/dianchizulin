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
		onLoad(option) {
			var that = this;
			uni.request({
				url: that.http + 'index/getNewInfo',
				header: that.header,
				method: 'POST',
				data: {
					new_id:option.id
				},
				success: (res) => {
					uni.hideLoading()
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
