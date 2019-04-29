<template>
	<view class="content">
		<view class="zBox">
			<image src="../../../static/image/money.png" mode=""></image>
			<view>
				<text>钱包余额</text>
				<text>{{balance}}</text>
			</view>
			<navigator :url="'../balance/balance?bala='+balance" hover-class="none">充值</navigator>
		</view>
		<view class="title">
			变动记录
		</view>
		<view class="pro" v-for="(item,index) in record" :key='index'>
			<image src="../../../static/image/pro.png" mode=""></image>
			<view class="proR">
				<text>{{item.dian_name}}</text>
				<view class="flexBox">
					<view>
					{{item.tp}}：<text>￥{{item.money}}</text>
					</view>
					<view>{{item.add_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: 0,
				record:''
			};
		},
		onLoad(option) {
			this.balance = option.balnace
		},
		onShow() {
			var that = this;
			uni.request({
				url: that.http + 'user/getUserOrder',
				header: that.header,
				method: 'POST',
				data: {
					user_id: uni.getStorageSync('token')
				},
				success: (res) => {
					console.log(res)
					for (var i in res.data.data) {
						var str = new Date(parseInt(res.data.data[i].add_time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
						res.data.data[i].add_time = str.substr(0, str.indexOf(' '))
					}
					that.record = res.data.data
				},
				fail() {
					uni.showToast({
						title: '网络延迟，请刷新后再获取积分记录!'
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		border-top: 2upx solid #eee;
	}

	.zBox {
		width: 100%;
		height: 170upx;
		border-bottom: 10upx solid #eee;

		view {
			width: 70%;
			position: relative;
			top: 50upx;
		}

		view>text {
			display: block;
		}

		view>text:nth-child(1) {
			font-size: 28upx;
			color: #070707;
		}

		view>text:nth-child(2) {
			color: #7c7c7c;
			font-size: 32upx;
		}

		image:nth-child(1) {
			width: 76upx;
			height: 76upx;
			float: left;
			margin-top: 50upx;
			margin-right: 32upx;
		}

		navigator:nth-child(3) {
			float: right;
			border: 2upx solid $colorOrange;
			font-size: 28upx;
			border-radius: 8upx;
			padding: 5upx 30upx;
			margin-top: -8upx;
		}
	}

	.title {
		width: 100%;
		font-size: 32upx;
		color: #2b2b2b;
		margin: 20upx 0;
	}

	.pro {
		width: 100%;
		height: 146upx;
		padding: 30upx 20upx;
		background: #F8F8F8;
		margin-bottom: 25upx;
		display: flex;

		image {
			width: 106upx;
			height: 86upx;
			margin-right: 20upx;
		}

		view>view>text {
			color: $colorOrange;
		}

		.proR>text {
			font-size: 28upx;
		}
	}

	.proR>view {
		width: 500upx;
		margin-top: 10upx;
	}

	.proR>view>view:nth-child(2) {
		color: #8b8b8b;
	}
</style>
