<template>
	<view style="overflow: hidden;">
		<view data-scindex="0">
			<view class="content">
				<uni-password ref="secrity" @input="onInput" @confirm="onConfirm">
					请输入安全密码
				</uni-password>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPassword from '@/components/uni-password/uni-password.vue'
	import uniIcon from '@/components/i-icon/i-icon.vue'
	import uniKeyboard from '@/components/uni-keyboard.vue'
	export default {
		components: {
			uniPassword,
			uniIcon,
			uniKeyboard
		},
		data() {
			return {
				// 此页面数据
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				titleShowId: 'tabTag-0',
				tabHeight: 300,
				showKeyboard: false,
				// 提现数据
				arr: '',
			}
		},
		onLoad(option) {
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2]; //上个页面
			if (beforePage.route == 'pages/userPages/tiXian/tiXian') {
				this.arr = JSON.parse(option.arr)
			} else if (beforePage.route == 'pages/userPages/balance/balance') {
				this.arr = JSON.parse(option.arr)
			} else if (beforePage.route == 'pages/userPages/yuYue2/yuYue2') {
				this.arr = JSON.parse(option.arr)
				console.log(this.arr)
			} else if (beforePage.route == 'pages/userPages/yuyueDate/yuyueDate') {
				this.arr = JSON.parse(option.arr)
			}else if(beforePage.route == 'pages/userPages/yuYue3/yuYue3'){
				this.arr = JSON.parse(option.arr)
			}
		},
		methods: {
			// 安全密码页面函数
			done(password) {
				console.log(password);
				console.log(this.$refs);
			},
			confirmPwd() {
				this.$refs.keyboard.show();
			},
			onInput(e) {},
			// 验证安全密码并调用支付提现等功能
			onConfirm(e) {
				var that = this;
				var pages = getCurrentPages(); //当前页
				var beforePage = pages[pages.length - 2]; //上个页面
				// 点击完成时触发
				let password = e.value;
				console.log(e.value);
				uni.request({
					url: that.http + 'user/validationSafePass',
					header: that.header,
					method: 'POST',
					data: {
						safe_pass: e.value,
						user_id: uni.getStorageSync('token')
					},
					success: (res) => {
						if (res.data.code == 200) {
							// 提现执行体现功能
							if (beforePage.route == 'pages/userPages/tiXian/tiXian') {
								that.tx(that.arr)
							} else if (beforePage.route == 'pages/userPages/balance/balance') {
								// 充值余额
								that.cz(that.arr)
							// 押金支付
							} else if (beforePage.route == 'pages/userPages/yuYue2/yuYue2') {
								// 押金余额支付
								if (that.arr.pay_type == 1) {
									that.yaYuPay(that.arr)
								}
							//预约更换电池
							}else if(beforePage.route == 'pages/userPages/yuYue3/yuYue3'){
								// 租期余额支付
								if (that.arr.pay_type == 1) {
									that.gengHuanPay(that.arr)
								}
							// 租期支付
							} else if (beforePage.route == 'pages/userPages/yuyueDate/yuyueDate') {
								// 是续租订单
								if (that.arr.xu_id == '') {
									// 租期余额支付
									if (that.arr.pay_type == 1) {
										that.zqYuPay(that.arr)
									}
								// 不是续租订单
								} else {
									// 租期余额支付
									if (that.arr.pay_type == 1) {
										that.xuYuPay(that.arr)
									}
								}
							}
						} else {
							uni.showToast({
								title: res.data.data,
								icon: 'none'
							})
						}
					},
					fail() {
						uni.showToast({
							title: '网络延迟，请刷新后重试!',
							icon: 'none'
						})
					}
				})
			},
			tabChange(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			// 预约更换电吃
			gengHuanPay(obj){
				uni.request({
					url: this.http + 'order/setOrder',
					method: 'POST',
					header: this.header,
					data: {
						type: obj.type, //租金类型
						lease_id:uni.getStorageSync('lid'),
						pay_type: obj.pay_type, //余额支付
						user_id: uni.getStorageSync('token'),
						net_id: uni.getStorageSync('wdId'), //网点id
						dc_id: uni.getStorageSync('dcId'), //电池id
						money: obj.money, //最后钱数
						yue_time: obj.yue_time //换电池预约时间
					},
					success: (res) => {
						console.log(uni.getStorageSync('lid'))
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							uni.showModal({
								title: '提示',
								content: '付款成功，选择前往页面！',
								confirmText:'返回首页',
								cancelText:'查看订单',
								success: function (res) {
									if (res.confirm) {
										uni.reLaunch({
											url:'../../index/index'
										})
									} else if (res.cancel) {
										uni.redirectTo({
											url:'../myLease/myLease'
										})
									}
								}
							});
						} else {
							// 余额支付失败返回上一页面
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					},
					fail() {
						uni.showToast({
							title: '网络延迟，请刷新后重试!',
							icon: 'none'
						})
					}
				})
			},
			// 押金余额支付
			yaYuPay(obj) {
				uni.request({
					url: this.http + 'order/setOrder',
					method: 'POST',
					header: this.header,
					data: {
						type: obj.type, //押金类型
						pay_type: obj.pay_type, //余额支付
						user_id: uni.getStorageSync('token'),
						net_id: uni.getStorageSync('wdId'), //网点id
						dc_id: uni.getStorageSync('dcId'), //电池id
						money: obj.money, //最后钱数
						integral: obj.integral, //抵扣积分书
						integral_moner: obj.integral_moner //积分抵扣金额
					},
					success: (res) => {
						console.log(JSON.stringify(obj))
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							uni.redirectTo({
								url: '../yuyueCg/yuyueCg'
							})
						} else {
							// 余额支付失败返回上一页面
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					},
					fail() {
						uni.showToast({
							title: '网络延迟，请刷新后重试!',
							icon: 'none'
						})
					}
				})
			},
			// 续租订单时余额支付
			xuYuPay(obj){
				uni.request({
					url: this.http + 'order/setXuzu',
					method: 'POST',
					header: this.header,
					data: {
						lease_id:obj.xu_id,	//续租id
						type: obj.type, //租金类型
						pay_type: obj.pay_type, //余额支付
						user_id: uni.getStorageSync('token'),
						net_id: uni.getStorageSync('wdId'), //网点id
						dc_id: uni.getStorageSync('dcId'), //电池id
						money: obj.money, //最后钱数
						zu_time: obj.zu_time //租期
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							uni.showModal({
								title: '提示',
								content: '付款成功，选择前往页面！',
								confirmText:'返回首页',
								cancelText:'查看订单',
								success: function (res) {
									if (res.confirm) {
										uni.reLaunch({
											url:'../../index/index'
										})
									} else if (res.cancel) {
										uni.redirectTo({
											url:'../myLease/myLease'
										})
									}
								}
							});
						} else {
							// 余额支付失败返回上一页面
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					},
					fail() {
						uni.showToast({
							title: '网络延迟，请刷新后重试!',
							icon: 'none'
						})
					}
				})
			},
			// 租期余额支付
			zqYuPay(obj) {
				uni.request({
					url: this.http + 'order/setOrder',
					method: 'POST',
					header: this.header,
					data: {
						type: obj.type, //租金类型
						pay_type: obj.pay_type, //余额支付
						user_id: uni.getStorageSync('token'),
						net_id: uni.getStorageSync('wdId'), //网点id
						dc_id: uni.getStorageSync('dcId'), //电池id
						money: obj.money, //最后钱数
						zu_time: obj.zu_time //租期
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showModal({
								title: '提示',
								content: '付款成功，选择前往页面！',
								confirmText:'返回首页',
								cancelText:'查看订单',
								success: function (res) {
									if (res.confirm) {
										uni.reLaunch({
											url:'../../index/index'
										})
									} else if (res.cancel) {
										uni.redirectTo({
											url:'../myLease/myLease'
										})
									}
								}
							});
						} else {
							// 余额支付失败返回上一页面
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					},
					fail() {
						uni.showToast({
							title: '网络延迟，请刷新后重试!',
							icon: 'none'
						})
					}
				})
			},
			// 充值功能
			cz(obj) {
				var that = this;
				console.log(obj)
			},
			// 提现功能
			tx(obj) {
				var that = this;
				uni.showLoading({
					title: '正在提现...'
				})
				uni.request({
					url: that.http + 'user/tixian',
					header: that.header,
					method: 'POST',
					data: {
						type: 2, //1是网店2是用户
						id: uni.getStorageSync('token'),
						money: obj.money,
						card: obj.cardID,
						name: obj.name,
						way: obj.way
					},
					success: (res) => {
						uni.hideLoading()
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.data,
								icon: 'none'
							})
							setTimeout(function(){
								uni.redirectTo({
									url: '../../user/user'
								})
							},2000)
						} else {
							uni.showToast({
								title: res.data.mes,
								icon: 'none'
							})
						}
					},
					fail() {
						uni.showToast({
							title: '网络延迟，请刷新后重试!',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f2f2f2;
	}

	.content {
		padding: 0;
	}

	.keyboard-container {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%;
	}

	uni-button[type=primary] {
		background: #00C456 !important;
	}

	.content {
		text-align: center;
		height: 400upx;
	}

	.payment-container {
		border-top: 1px solid #e2e2e2;
		height: calc(100%-44px);
		overflow: hidden;
	}

	.payment-container .payment {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px;
		background: #fff;
	}

	.payment-container .payment view:nth-child(2) {
		flex: 1;
	}

	.payment-container .payment-active {
		background: #E2E2E2;
	}

	.payment-container .payment image {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	.money-container {
		background: #fff;
		padding: 10px;
	}

	.money-container .money-box {
		padding: 10px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.money-container .money-box .button {
		font-size: 12px;
		color: #cf9f41;
	}

	.money-container .money-box view:nth-child(1) {
		font-size: 25px;
	}

	.money-container .money-box view:nth-child(2) {
		flex: 1;
		font-size: 30px;
		padding: 0 5px;
	}

	.money-container .tips {
		color: #222;
		padding-top: 10px;
		font-size: 12px;
	}

	.button-box {
		padding: 0 10px;
	}
</style>
