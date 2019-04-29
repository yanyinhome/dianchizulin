<template>
	<view class="content">
		<view class="main">
			<view class="title">{{orderInfo.net_name}}</view>
			<view class="title2">{{orderInfo.dc_name}}</view>
			<view class="title3">租赁时间：{{orderInfo.start_time==null?'暂无':orderInfo.start_time}}</view>
			<view class="title4">到期时间：{{orderInfo.end_time==null?'暂无':orderInfo.end_time}} <text @click="xu()">续租</text></view>
		</view>
		<view class="er">
			<image :src="orderInfo.is_huan==1?'../../../static/image/yi.png':'../../../static/image/wan.png'" mode=""></image>
			<view class="er_title">{{orderInfo.is_huan==0?'换电池':'安装电池'}}二维码</view>
			<image :src="orderInfo.is_huan==1?'../../../static/image/er5.png':orderInfo.qrcode" mode=""></image>
			<view class="btn flexBox">
				<navigator :url="'../yuYue3/yuYue3?id='+orderInfo.dc_id" hover-class="none">预约更换</navigator>
				<navigator :url="'../tMoney/tMoney?id='+orderInfo.lease_id" hover-class="none">退押金</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				orderInfo: ''
			};
		},
		onLoad(option) {
			this.id = option.id
			console.log(option.id)
			uni.setStorageSync('lid',option.id)
		},
		methods: {
			xu() {
				// 点击续租时，需要把此时续租的电池id和网点id加到缓存里
// 				this.$store.state.wdId = this.orderInfo.net_id
// 				this.$store.state.dcId = this.orderInfo.dc_id
				uni.setStorageSync('wdId',this.orderInfo.net_id)
				uni.setStorageSync('dcId',this.orderInfo.dc_id)
				uni.navigateTo({
					url: '../yuyueDate/yuyueDate?id=' + this.orderInfo.lease_id
				})
			}
		},
		onShow() {
			var that = this;
			uni.showLoading({
				title: '加载中...'
			})
			console.log(1)
			uni.request({
				url: that.http + 'user/getLeaseInfo',
				header: that.header,
				method: 'POST',
				data: {
					user_id: uni.getStorageSync('token'),
					lease_id: that.id
				},
				success: (res) => {
					uni.hideLoading()
					that.orderInfo = res.data.data
				},
				fail() {
					uni.showToast({
						title: '网络有延迟，请刷新后重试!',
						icon: 'none'
					})
				}
			})
		},

	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		border-top: 2upx solid #eee;
		padding-top: 30upx;
	}

	.main {
		width: 100%;
		height: 300upx;
		background: white;
		border-radius: 20upx;
		border-bottom: 2upx dashed #CECECE;
		padding: 0 40upx;

		.title,
		.title2,
		.title3,
		.title4 {
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			border-bottom: 2upx solid #eee;
			font-size: 30upx;
			color: #2d2d2d;

		}

		.title2,
		.title3,
		.title4 {
			height: 60upx;
			color: #000;
			font-size: 28upx;
			border: none;
		}

		.title3 {
			color: #FF0B00;
			font-size: 24upx;
		}

		.title4 {
			color: #666;
			font-size: 24upx;
		}

		.title4>text {
			color: #0285E9;
			font-size: 28upx;
			font-weight: bold;
			margin-left: 20upx;
		}
	}

	.er {
		width: 100%;
		height: 900upx;
		background: white;
		border-radius: 20upx;
		padding-top: 40upx;
		text-align: center;
		position: relative;

		.er_title {
			width: 552upx;
			height: 82upx;
			line-height: 82upx;
			padding-left: 40upx;
			background: #F8F8F8;
			margin: 0 auto;
			text-align: left;
			font-size: 34upx;
			color: #6E6E6E;
		}

		image:nth-child(1) {
			width: 130upx;
			height: 120upx;
			padding: 12upx;
			position: absolute;
			top: -60upx;
			right: 50upx;
		}

		image:nth-child(3) {
			width: 408upx;
			height: 408upx;
			padding: 12upx;
			background: #eee;
			margin: 60upx 0 120upx;
		}

		.btn {
			color: white;
			padding: 0 20upx;
		}

		.btn>navigator {
			width: 300upx;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
			font-size: 32upx;
			border-radius: 15upx;
		}

		.btn>navigator:nth-child(1) {
			background: #329EF0;
		}

		.btn>navigator:nth-child(2) {
			background: #A9A9A9;
		}
	}
</style>
