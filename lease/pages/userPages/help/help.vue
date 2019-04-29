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
			uni.showLoading({
				title:'努力加载中...'
			})
			uni.request({
				url:this.http+'index/getHelp',
				header:this.header,
				method:'POST',
				data:{
				},
				success:(res)=>{
					uni.hideLoading()
					this.string = res.data.data.content
				},
				fail(){
					uni.showToast({
						title:'网络延迟，请刷新后重试!',
						icon:'none'
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height:100vh;
		background: #FCFCFC;
		border-top:2upx solid #eee;
		padding:50upx 40upx;
	}
	.title,.title3{
		color:#666666;
		font-size:32upx;
	}
	.title2,.title3{
		margin-top:50upx;
	}
	.title2{
		color:$buttonBg;
		font-size:32upx;
	}
	.title3{
		font-size:30upx;
	}
</style>
