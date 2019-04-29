<template>
	<view class="content">
		<image src="../../../static/image/success.png" mode=""></image>
		<view class="title">恭喜认证成功</view>
		<view class="title2">可以开启租产品服务</view>
		<view class="btnBlue" @click="next('yuyue')">立即预约</view>
		<view class="btnBlue" @click="next('shang')">返回上一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			next(str){
				if(str == 'yuyue'){
					uni.navigateBack({
						delta: 2
					})
				}else if(str == 'shang'){
					uni.navigateBack({
						delta: 1
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height:100vh;
		background:#F5FBFF;
		border-top:2upx solid #eee;
		text-align: center;
	}
	image{
		width:338upx;
		height:280upx;
		margin-top:200upx;
	}
	.title,.title2{
		width:100%;
		font-size:32upx;
		color:#333;
		margin-top:50upx;
	}
	.title2{
		color:#a0a0a0;
		margin-top:30upx;
	}
	.btnBlue{
		border-radius: 50upx;
		margin-top:100upx;
	}
	.btnBlue:nth-child(5){
		background:#ADADAD ;
		margin-top:30upx;
	}
</style>
