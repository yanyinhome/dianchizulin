<template>
	<view class="content">
		<view class="header">
			<view class="headerTitle flexBox">
				<view :class="status?'ts':''" @click="setStatus('txz')">提现中</view>
				<view :class="status?'':'ts'" @click="setStatus('ytx')">已提现</view>
			</view>
		</view>
		<view class="card" v-for='item in arr'>
			<view class="cardTop flexBox">
				<view>
					<image src="../../../static/image/tx2.png" mode=""></image>
					<text>提现</text>
				</view>
				<text>+￥{{item.tx_money}}</text>
			</view>
			<view class="cardMiddle flexBox">
				<view>
					<image src="../../../static/image/tx.png" mode=""></image>
					<text>申请提现时间</text>
				</view>
				<text>{{item.add_time}}</text>
			</view>
			<view class="cardBottom flexBox">
				<view>
					<image src="../../../static/image/tx3.png" mode=""></image>
					<text>状态</text>
				</view>
				<text>{{item.status==0?'提现中':'已提现'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: true,
				arr:''
			};
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			setStatus(name) {
				var that = this;
				if (name == 'txz') {
					that.status = true
					that.getInfo()
				} else if (name == 'ytx') {
					that.status = false
					that.getInfo()
				}
			},
			getInfo() {
				var that = this;
				uni.showLoading({
					title:'数据加载中...'
				})
				uni.request({
					url: that.http + 'user/getUserTxlog',
					header: that.header,
					method: 'POST',
					data: {
						id: uni.getStorageSync('token'),
						type:2,
						status:that.status?'0':'1'
					},
					success: (res) => {
						uni.hideLoading()
						that.arr = res.data.data
					},
					fail() {
						uni.showToast({
							title:'网络延迟，请刷新后重试!'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0;
	}

	.header {
		width: 100%;
		height: 180upx;
		background: #F5F5F5;
		padding-top: 50upx;
	}

	.headerTitle {
		width: 440upx;
		height: 78upx;
		margin: 0 auto;

		view {
			width: 220upx;
			border: 2upx solid $buttonBg;
			color: $buttonBg;
			text-align: center;
			line-height: 78upx;
		}

		view:nth-child(1) {
			border-right: none;
			border-top-left-radius: 15upx;
			border-bottom-left-radius: 15upx;
		}

		view:nth-child(2) {
			border-left: none;
			border-top-right-radius: 15upx;
			border-bottom-right-radius: 15upx;
		}

		.ts {
			background: $buttonBg;
			color: white;
		}
	}

	.card {
		width: 100%;
		border-bottom: 20upx solid #f5f5f5;
		padding-bottom: 20upx;

		.cardTop {
			margin-bottom: 20upx;
		}

		.cardTop,
		.cardMiddle,
		.cardBottom {
			width: 100%;
			height: 100upx;
			padding: 0 40upx;
			color: $colorOrange;
			line-height: 100upx;
			border-bottom: 2upx solid #eee;

			image {
				width: 46upx;
				height: 48upx;
				float: left;
				margin-right: 20upx;
				margin-top: 20upx;
			}

			view>text {
				color: #333;
			}
		}

		.cardMiddle,
		.cardBottom {
			border: none;
			height: 75upx;
			line-height: 75upx;
			color: #999;

			image {
				width: 46upx;
				height: 46upx;
				margin-top: 15upx;
			}
		}
	}
</style>
