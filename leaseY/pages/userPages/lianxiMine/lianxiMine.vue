<template>
	<view class="content">
		<rich-text :nodes="string"></rich-text>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				string:'<ol class=" list-paddingleft-2" style="list-style-type: decimal;"><li><p style="text-align: center;">国服国服乳液热统一发放更好地发挥反光板出发答案是666666666666最新程序<strong>的双方各萨达</strong><strong><span style="text-decoration: underline;">第三方公司的是大法官是大法官</span></strong></p ></li><li><p><strong><span style="text-decoration: underline; border: 1px solid rgb(0, 0, 0);">第三个15</span></strong></p ></li></ol>'
			};
		},
		onLoad() {
			var that = this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url: that.http + 'index/getWord',
				header: that.header,
				method: 'POST',
				data: {
					cate:6
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
