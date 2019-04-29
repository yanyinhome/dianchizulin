<template>
	<view class="content">
		<view class="card flexBox">
			<image src="../../../static/image/pro.png" mode=""></image>
			<view class="cardR">
				<view>文化路国基路军卡卡卡锂电池</view>
				<view>李先生<text>电话：15685489512</text></view>
				<view>2017-11-08 12:50</view>
			</view>
		</view>
		<view class="card flexBox">
			<image src="../../../static/image/pro.png" mode=""></image>
			<view class="cardR">
				<view>文化路国基路军卡卡卡锂电池</view>
				<view>李先生<text>电话：15685489512</text></view>
				<view>2017-11-08 12:50</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.content{
		width:100%;
		border-top:2upx solid #eee;
	}
	.card{
		width:100%;
		border-bottom:2upx solid #eee;
		padding:30upx 0;
		image{
			width:218upx;
			height:152upx;
			border:2upx solid #eee;
		}
	}
	.card>view{
		width:420upx;
		view:nth-child(1){
			color:#333;
			font-size:32upx;
			font-weight: bold;
			margin-bottom:20upx;
		}
		view:nth-child(2){
			color:#333;
			font-size:28upx;
			margin-bottom:20upx;
			text{
				display: inline-block;
				margin-left:20upx;
				color:#666;
				margin-right:20upx;
			}
		}
		view:nth-child(3){
			color:#999;
			font-size:24upx;
		}
	}
</style>
