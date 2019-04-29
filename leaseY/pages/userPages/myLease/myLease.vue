<template>
	<view class="content">
		<view class="card2" v-for='(item,index) in list' :key="index">
			<view class="card">
				<image :src="item.img_src" mode=""></image>
				<view class="title">
					<view class="">{{item.name}}</view>
					<view>租赁时间：{{item.start_time}}</view>
					<view>
						<text>到期时间：{{item.end_time}}</text>
						<navigator :url="'../yuSuccess/yuSuccess?id='+item.id" hover-class="none">详情</navigator>
					</view>
				</view>
			</view>
			<view class="flexBox btn">
				<navigator :url="'../yuYue3/yuYue3?id='+item.dian_id" hover-class="none">预约更换</navigator>
				<navigator :url="'../tMoney/tMoney?id='+item.id" hover-class="none">退押金</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:''
			};
		},
		onShow(){
			// 获取订单列表
			var that= this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url:that.http+'order/getMyLease',
				method:'POST',
				header:that.header,
				data:{
					user_id:uni.getStorageSync('tokenW')
				},
				success:(res)=>{
					uni.hideLoading()
					console.log(res)
					that.list = res.data.data
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
	.content {
		min-height:100vh;
		background:#f5f5f5;
		border-top: 2upx solid #eee;
	}
	
	.card2{
		background: #fff;
		width: 100%;
		padding-bottom:30upx;
		border-radius: 10upx;
	}
	
	.card {
		display: flex;
		border-radius: 10upx;
		padding: 30upx 20upx;
		margin-top: 30upx;

		.box {
			border: none;
		}

		image {
			width: 140upx;
			height: 140upx;
			border: 2upx solid #dedede;
			margin-right: 20upx;
			box-sizing: border-box;
		}
	}

	.title {
		view:nth-child(1) {
			width: 450upx;
			overflow: hidden;
			/*超出部分隐藏*/
			text-overflow: ellipsis;
			/* 超出部分显示省略号 */
			white-space: nowrap;
			/*规定段落中的文本不进行换行 */
		}

		view:nth-child(2) ,view:nth-child(3){
			color: #666;
			margin-top: 15upx;
			font-size:24upx;
		}

		view:nth-child(3) {
			display: flex;
			navigator{
				color:#0285E9;
				font-size:28upx;
				font-weight: bold;
				margin-left:20upx;
				margin-top:-5upx;
			}
		}
	}
	.btn{
		padding:0 25upx;
		navigator{
			width:162upx;
			height:54upx;
			text-align: center;
			line-height: 54upx;
			border-radius: 10upx;
		}
		navigator:nth-child(1){
			color:$buttonBg;
			border:2upx solid $buttonBg;
		}
		navigator:nth-child(2){
			color:#9f9f9f;
			border:2upx solid #9f9f9f;
		}
	}
</style>
