<template>
	<view class="content">
		<!-- 头部 -->
		<view class="header">
			<view class="title">
				个人中心
			</view>
			<view class="avtor">
				<image :src="info.touxiang" mode="" @click="uploadHead()"></image>
			</view>
			<text>{{info.link_tel}}</text>
			<view class="blance flexBox">
				<navigator :url="'../userPages/balance2/balance2?balnace='+info.balnace" hover-class="none" class="blanceL">
					<image src="../../static/image/money.png" mode=""></image>
					<view>
						<text>钱包余额</text>
						<view>{{info.balnace}}</view>
					</view>
				</navigator>
				<navigator :url="'../userPages/account/account?account='+info.integral" hover-class="none" class="blanceL">
					<image src="../../static/image/count.png" mode=""></image>
					<view>
						<text>积分余额</text>
						<view>{{info.integral}}</view>
					</view>
				</navigator>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list">
			<navigator :url="'../userPages/tiXian/tiXian?balnace='+info.balnace" hover-class="none" class="flexBox">
				<text>我要提现</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<navigator url="../userPages/payAq/payAq" hover-class="none" class="flexBox">
				<text>支付安全</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>		
			<navigator url="../userPages/invate/invate" hover-class="none" class="flexBox">
				<text>邀请好友</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<navigator url="../userPages/updateTel/updateTel" hover-class="none" class="flexBox">
				<text>修改电话</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<navigator url="../userPages/yuyue/yuyue" hover-class="none" class="flexBox">
				<text>预约管理</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<view class="flexBox" @click="sao()">
				<text>扫一扫</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</view>
			<navigator url="../userPages/kucun/kucun" hover-class="none" class="flexBox">
				<text>电池库存</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<navigator url="../userPages/riseShop/riseShop" hover-class="none" class="flexBox">
				<text>店铺信息</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<navigator url="../userPages/gushi/gushi" hover-class="none" class="flexBox">
				<text>品牌故事</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
			<navigator url="../userPages/dp/dp" hover-class="none" class="flexBox">
				<text>店铺介绍</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>		
			<navigator url='../userPages/notice/notice' hover-class="none" class="flexBox">
				<text>近期活动</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>		
			<navigator url="../userPages/help/help" hover-class="none" class="flexBox">
				<text>帮助中心</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>		
			<navigator url="../userPages/lianxiMine/lianxiMine" hover-class="none" class="flexBox">
				<text>联系我们</text>
				<image src="../../static/image/backR.png" mode=""></image>
			</navigator>
		</view>
		<view class="btnBlue" @click="tui()">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: '',
				avator:''
			};
		},
		onShow() {
			var that = this;
			if (uni.getStorageSync('tokenW') == '' || uni.getStorageSync('tokenW') == undefined) {
				uni.showModal({
					title: '温馨提示！',
					content: '请先前往登录!',
					showCancel:false,
					confirmText: '登录',
					success(res) {
						if (res.confirm) {
// 							uni.reLaunch({
// 								url: '../loginPages/login/login'
// 							});    
							uni.navigateTo({
								url:'../loginPages/login/login'
							})
						}
					}
				})
			} else {
				uni.showLoading({
					title: '数据加载中...'
				})
				uni.request({
					url: that.http + 'net/getNetInfo',
					header: that.header,
					method: 'POST',
					data: {
						net_id: uni.getStorageSync('tokenW')
					},
					success: (res) => {
						uni.hideLoading()
						that.info = res.data.data
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							title: '网络延迟，请刷新重试!',
							icon: 'none'
						})
					}
				})	
			}
		},
		methods: {
			// 退出登录
			tui(){
				uni.clearStorageSync()
				uni.reLaunch({
					url:'../loginPages/login/login'
				})
			},
			// 网点端扫一扫
			sao(){
				uni.scanCode({
					scanType:['qrCode'],
					success(res){
						console.log(JSON.stringify(res))
						if(res.scanType==''){
							var lease_id = JSON.stringify(res.result).substring(12,14)
							var id = res.result.substring(res.result.indexOf('e',10)+2)
							id = id.substring(0,id.length-1)
							uni.navigateTo({
								url:'../userPages/saoNext/saoNext?lease_id='+lease_id+'&id='+id
							})
						}else{
							var lease_id = JSON.stringify(res.result).substring(10,12)
							var id = res.result.substring(res.result.indexOf('e',10)+2)
							uni.navigateTo({
								url:'../userPages/saoNext/saoNext?lease_id='+lease_id+'&id='+id
							})
						}
					}
				})
			},
			// 上传头像
			uploadHead() {
				var that = this;
				// 选择图片
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (wj) => {
						uni.showLoading({
							title: '上传中...'
						})
						// 原生压缩
						plus.zip.compressImage({
								src: wj.tempFilePaths[0],
								dst: "_doc/a.jpg",
								overwrite: true,
								width: '270px',
								height: '270px',
								format: 'jpg',
								quality: 100
							},
							function(e) {
								var reader = new plus.io.FileReader();
								reader.onloadend = function(e) {
									var speech = e.target.result; //base64图片 
									// 上传头像
									uni.request({
										url: that.http + 'index/imgupload',
										header: that.header,
										method: 'POST',
										data: {
											file: speech
										},
										success: (res) => {
											if(res.data.code==200){
												that.info.head_src = res.data.path;
												uni.request({
													url:that.http+'net/reHeadImg',
													method:'POST',
													header:that.header,
													data:{
														head_id:res.data.id,
														net_id:uni.getStorageSync('token')
													},
													success: (result) => {
														uni.hideLoading()
														if(result.data.code==200){
															uni.showToast({
																title:'上传成功!',
																icon:'none'
															})
														}
													},
													fail(){
														uni.showToast({
															title:'设置头像失败，请重试!',
															icon:'none'
														})
													}
												})
											}else{
												uni.showToast({
													title:res.data.info,
													icon:'none'
												})
											}
										},
										fail() {
											uni.showToast({
												title: '上传时网络延迟，请刷新后重试!',
												icon: 'none'
											})
										}
									})
								};
								reader.readAsDataURL(e.target);
							},
							function(err) {
								plus.nativeUI.alert('未知错误！', function() {});
							}
						);
					},
					fail() {
						uni.showToast({
							title: '打开相册失败，请重试！',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 头部
	.content {
		padding: 0;
	}

	.header {
		width: 100%;
		height: 475upx;
		position: relative;
		background: url(http://houtai3.cadhx.com/uploads/qqqq.png) no-repeat;
		background-size: cover;
		padding-top: 60upx;
		text-align: center;
		color: white;

		.title {
			width: 95%;
			margin: 0 auto;
			text-align: center;
			color: white;
			font-size: 32upx;
			margin-bottom: 40upx;
		}

		.back,
		.sz {
			width: 100upx;
			height: 50upx;
			position: absolute;
			top: 60upx;

			image {
				width: 35upx;
				height: 35upx;
				margin-top: 5upx;
			}
		}

		.sz {
			right: 0;
		}

		.sz>image {
			width: 39upx;
			height: 39upx;
		}

		.avtor {
			width: 142upx;
			height: 142upx;
			border-radius: 50%;
			margin: 0 auto 25upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.blance {
		width: 690upx;
		height: 146upx;
		margin: 40upx auto 0;
		color: #070707;
		background: white;
		box-shadow: 0px 2px 4px 0px rgba(222, 222, 222, 0.5);

		image {
			width: 76upx;
			height: 76upx;
			margin-right: 32upx;
		}

		navigator:nth-child(1) {
			border-right: 4upx solid #eee;
		}
	}

	.blance>navigator{
		width: 50%;
		display: flex;
		padding: 36upx 0 0 70upx;

		text {
			font-size: 30upx;
			text-align: center;
		}
	}

	.blanceL>view>view,
	.blanceR>view>view {
		margin-top: 5upx;
		color: #7c7c7c;
		font-size: 30upx;
		text-align: left;
	}

	// 列表
	.list {
		width: 100%;
		margin: 60upx 0 50upx 0;
		padding: 0 30upx;
		font-size: 32upx;
		color: #2b2b2b;
		letter-spacing: 3upx;

		navigator,view {
			width: 100%;
			height: 100upx;
			line-height: 110upx;
			border-bottom: 2upx solid #eee;
		}
		
		image {
			width: 20upx;
			height: 31upx;
			margin-top: 45upx;
		}
	}

	.btnBlue {
		width: 672upx;
		margin: 0 auto 50upx;
	}
</style>
