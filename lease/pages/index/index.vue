<template>
	<view class="content">
		<!--:longitude="jing" :latitude="wei" :markers="covers" -->
		<map :longitude="jing" :latitude="wei" :markers="covers" @markertap="detail($event)">
			<cover-view class="btn" @click="login()">
				我要租赁
			</cover-view>
		</map>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				inHeight: '',
				inWidth: '',
				jing: 0,
				wei: 0,
				// 地图坐标点
				covers: [{
					latitude: 0,
					longitude: 0,
					id: 0,
					iconPath: '../../static/image/path.png'
				}],
				// 网店信息
				wdInfo: [],
				// 地区#ifdef

			}
		},
		created() {
			var that = this;
			that.inHeight = uni.getStorageSync('infoHeight');
			that.inWidth = uni.getStorageSync('infoWidth');
		},
		onLoad() {
			uni.showLoading({
				title: '数据加载中...',
			})
			var that = this;
			// 获取用户的地理位置
			uni.getLocation({
				type: 'gcj02', //国测局坐标比较标准
				success: function(res) {
					that.jing = res.longitude;
					that.wei = res.latitude;
					that.covers[0].latitude = res.latitude;
					that.covers[0].longitude = res.longitude;
					// console.log(JSON.stringify(that.covers))
				}
			})
			// 获取网店信息
			uni.request({
				url: that.http + 'index/getAreaList',
				header: that.header,
				method: 'POST',
				success: (res) => {
					// 现获取地区id
					if (res.data.code != 200) {
						uni.showToast({
							title: res.data.data.mes,
							icon: 'none'
						})
					} else {
						that.id = res.data.data[0].id;
						uni.request({
							url: that.http + 'index/getNetList',
							header: that.header,
							method: 'POST',
							data: {
								area_id: res.data.data[0].id
							},
							success: (result) => {
								uni.hideLoading()
									// console.log(JSON.stringify(result))
								if (result.data.code == 200) {
									that.wdInfo = result.data.data;
									for (var i of result.data.data) {
										var arr = {};
										arr.longitude = i.jing
										arr.latitude = i.wei
										arr.iconPath = '../../static/image/wd.png'
										arr.id = i.id
										that.covers.push(arr)
									}
								} else {
									uni.showToast({
										title: '获取网点信息失败，请刷新后重试!',
										icon: 'none'
									})
								}
							},
							fail() {
								uni.showToast({
									title: '请求网点信息失败，请刷新后重试!',
									icon: 'none'
								})
							}
						})
					}
				},
				fail() {
					uni.hideLoading()
					uni.showToast({
						title: '网络延迟，请刷新后重试!',
						icon: 'none'
					})
				}
			})
			// 获取是否有电池到期或者即将到期
			uni.request({
				url: that.http + 'index/getOverDc',
				method: 'POST',
				header: that.header,
				data: {
					user_id: uni.getStorageSync('token')
				},
				success: (res) => {
				},
				fail() {
				}
			})
			uni.request({
				url: that.http + 'index/getOverTime',
				method: 'POST',
				header: that.header,
				data: {
					user_id: uni.getStorageSync('token')
				},
				success: (res) => {
				},
				fail() {
				}
			})
		},
		onShow() {
			
		},
		// 自定义按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				uni.navigateTo({
					url: '../userPages/notice/notice'
				});
			} else if (e.index == 0) {
				if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == undefined) {
					uni.showModal({
						title: '温馨提示！',
						content: '请先前往登录!',
						confirmText: '登录',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../loginPages/login/login'
								});
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '../user/user'
					});
				}
			}
		},
		methods: {
			login() {
				var that = this;
				// console.log(uni.getStorageSync('token'))
				if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == undefined) {
					uni.showModal({
						title: '温馨提示！',
						content: '请先前往登录!',
						confirmText: '登录',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../loginPages/login/login'
								});
							}
						}
					})
				} else {
					// 判断用户是否有未完成的订单
					uni.request({
						url: that.http + 'order/ifUnOrder',
						method: 'POST',
						header: that.header,
						data: {
							user_id: uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(res)
							// 换成model框跳转到该跳的页面
							if (res.data.code == 201) {
								uni.showModal({
									title: '温馨提示',
									content: '你有未交租金的订单，是否跳转?',
									confirmText: '跳转',
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../userPages/yuyueDate/yuyueDate'
											})
										}
									}
								})
							} else if (res.data.code == 202) {
								uni.showModal({
									title: '温馨提示',
									content: '你有未安装的电池，是否跳转?',
									confirmText: '跳转',
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../userPages/yuyue/yuyue'
											})
										}
									}
								})
							} else {
								uni.navigateTo({
									url: '../userPages/wdList/wdList?id=' + that.id
								})
							}
						},
						fail() {
							uni.showToast({
								title: "无法查询是否有订单正在进行，请刷新后重试!",
								icon: 'none'
							})
						}
					})
				}
			},
			detail(e) {
				var that = this;
				// console.log(uni.getStorageSync('token'))
				if (uni.getStorageSync('token') == '' || uni.getStorageSync('token') == undefined) {
					uni.showModal({
						title: '温馨提示！',
						content: '请先前往登录!',
						confirmText: '登录',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../loginPages/login/login'
								});
							}
						}
					})
				} else {
					uni.request({
						url: that.http + 'order/ifUnOrder',
						method: 'POST',
						header: that.header,
						data: {
							user_id: uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(res)
							// 换成model框跳转到该跳的页面
							if (res.data.code == 201) {
								uni.showModal({
									title: '温馨提示',
									content: '你有未交租金的订单，是否跳转?',
									confirmText: '跳转',
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../userPages/yuyueDate/yuyueDate'
											})
										}
									}
								})
							} else if (res.data.code == 202) {
								uni.showModal({
									title: '温馨提示',
									content: '你有未安装的电池，是否跳转?',
									confirmText: '跳转',
									success(res) {
										if (res.confirm) {
											uni.navigateTo({
												url: '../userPages/yuyue/yuyue'
											})
										}
									}
								})
							} else {
								uni.navigateTo({
									url: '../userPages/wdDetail/wdDetail?id=' + e.mp.markerId
								})
							}
						},
						fail() {
							uni.showToast({
								title: "无法查询是否有订单正在进行，请刷新后重试!",
								icon: 'none'
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		padding: 0;
	}

	map {
		width: 100%;
		height: 100vh;
	}

	.btn {
		width: 100%;
		height: 90upx;
		position: absolute;
		bottom: 0;
		left: 0;
		line-height: 90upx;
		text-align: center;
		color: white;
		background: $colorOrange;
	}
</style>
