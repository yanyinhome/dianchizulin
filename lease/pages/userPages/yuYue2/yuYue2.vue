<template>
	<view class="content">
		<view class="card2">
			<view class="title2">产品信息</view>
			<view class="card">
				<image :src="dc_info.img_src" mode=""></image>
				<view class="title">
					<view>{{dc_info.name}}</view>
					<view>押金<text>￥{{dc_info.ya_money}}</text></view>
				</view>
			</view>
			<view class="zf">
				<view class="flexBox" @click="acc()">
					<text>可用积分{{account.keyong}}抵扣{{account.money}}元</text>
					<image :src="isAcc?'../../../static/image/zf.png':'../../../static/image/tx3.png'" mode=""></image>
				</view>
				<view class="flexBox" @click="status='0'">
					<text>余额支付</text>
					<image :src="status=='0'?'../../../static/image/zf.png':'../../../static/image/tx3.png'" mode=""></image>
				</view>
				<view class="flexBox" @click="status='1'">
					<text>支付宝支付</text>
					<image :src="status=='1'?'../../../static/image/zf.png':'../../../static/image/tx3.png'" mode=""></image>
				</view>
				<view class="flexBox" @click="status='2'">
					<text>微信支付</text>
					<image :src="status=='2'?'../../../static/image/zf.png':'../../../static/image/tx3.png'" mode=""></image>
				</view>
			</view>
		</view>
		<view class="footer flexBox">
			<view class="">
				共一件 合计：
				<text>￥{{money}}</text>
			</view>
			<view @click="next()">立即支付</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				dc_info: '',
				account: '',
				// 支付状态现金 或 积分抵扣
				status: '0',
				// 是否选中积分抵扣
				isAcc: false,
				// 支付方式
				mode: 0,
				money: 0,
				// 最后价格
				price: 0,
				dc_id: '',

			};
		},
		onShow(){
			console.log(this.isAcc)
		},
		onLoad(option) {
			// console.log(option.id)
			// 请求电池详情
			var that = this;
			// 存电池id
			// that.$store.state.dcId = option.id
			uni.setStorageSync('dcId',option.id)
			that.dc_id = option.id;
			uni.showLoading({
				title: '加载中...'
			})
			uni.request({
				url: that.http + 'index/getDcInfo',
				header: that.header,
				method: 'POST',
				data: {
					dc_id: option.id
				},
				success: (result) => {
					// console.log(res)
					that.dc_info = result.data.data
					that.money = result.data.data.ya_money
					// 请求积分抵扣等
					uni.request({
						url: that.http + 'order/getIntegralMax',
						method: 'POST',
						header: that.header,
						data: {
							user_id: uni.getStorageSync('token')
						},
						success: (res) => {
							uni.hideLoading()
							that.account = res.data.data;
						},
						fail() {
							uni.showToast({
								title: '网络延迟，请刷新后重试!',
								icon: 'none'
							})
						}
					})
				},
				fail() {
					uni.showToast({
						title: '网络延迟，请刷新后重试!',
						icon: 'none'
					})
				}
			})
		},
		methods: {
			next() {
				var that = this;
				// console.log(this.status)
				// 判断是否为余额支付余额支付在此页面完成
				if (this.status == '0') {
					// 跳转到安全密码页面并传参
					var arr = {
						type: 1, //押金类型
						pay_type: 1, //余额支付
						money: this.money, //最后钱数
						integral: this.isAcc ? this.account.keyong : '', //抵扣积分书
						integral_moner: this.isAcc ? this.account.money : '' //积分抵扣金额
					}
					console.log()
					arr = JSON.stringify(arr)
					uni.navigateTo({
						url: '../pw/pw?arr='+arr
					})
				}
			},
			acc() {
				this.isAcc = !this.isAcc;
				if (this.isAcc) {
					this.money = Number(this.dc_info.ya_money) - Number(this.account.money)
					console.log(this.money)
				} else {
					this.money = this.dc_info.ya_money
				}
				console.log(this.isAcc)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: #f5f5f5;
		border-top: 2upx solid #eee;
		padding: 0;
	}

	.card2 {
		background: #fff;
		width: 690upx;
		padding: 0 30upx 0;
		margin: 0 auto;
		margin-top: 30upx;
		border-radius: 10upx;
	}

	.title2 {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 2upx solid #eee;
	}

	.card {
		display: flex;
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
			width: 410upx;
			overflow: hidden;
			/*超出部分隐藏*/
			text-overflow: ellipsis;
			/* 超出部分显示省略号 */
			white-space: nowrap;
			/*规定段落中的文本不进行换行 */
			margin-top: 20upx;
		}

		view:nth-child(2) {
			color: #666;
			margin-top: 10upx;

			text {
				color: $colorOrange;
				margin-left: 20upx;
			}
		}

		navigator:nth-child(3) {
			margin-top: 10upx;
			color: $buttonBg;
		}
	}

	.zf {
		width: 100%;
		border-top: 10upx solid #eee;
		margin-top: 30upx;

		view {
			height: 100upx;
			line-height: 100upx;
			border-bottom: 2upx solid #eee;
		}

		view:last-child {
			border: none;
		}

		image {
			width: 44upx;
			height: 44upx;
			margin-top: 28upx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 124upx;
		line-height: 124upx;
		padding: 0 40upx;
		color: #333;
	}

	.footer>view:last-child {
		width: 188upx;
		height: 64upx;
		font-size: 24upx;
		line-height: 64upx;
		text-align: center;
		margin-top: 30upx;
		background: rgba(255, 137, 49, 1);
		border-radius: 32upx;
		color: white;
	}
</style>
