<template>
	<view class="content">
		<view class="card2" v-for="(item,index) in info" :key="index">
			<view class="card">
				<image src="../../../static/image/pro.png" mode=""></image>
				<view class="title">
					<view class="">{{item.name}}</view>
					<view>库存：{{item.dc_number}}个</view>
				</view>
			</view>
			<view class="flexBox btn">
				<view @click="shang(item.dc_id,item.id)">上架</view>
				<view @click="xia(item.dc_id,item.id)">下架</view>
			</view>
		</view>
		<navigator hover-class="none" url="../addDC/addDC" class="btnBlue">
			<image src="../../../static/image/tx5.png" mode=""></image>
			添加电池
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:''
			};
		},
		onShow() {
			var that = this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url: that.http + 'net/getDianList',
				header: that.header,
				method: 'POST',
				data: {
					net_id: uni.getStorageSync('tokenW')
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res)
					if (res.data.code == 200) {
						that.info = res.data.data
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
		},
		methods: {
			shang(id,num){
				var that = this;
				uni.request({
					url: that.http + 'net/shelves',
					header: that.header,
					method: 'POST',
					data: {
						dc_id:id,
						id:num,
						status:1,
						net_id: uni.getStorageSync('tokenW')
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title: '上架成功!',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '电池已经上架,不能重复上架!',
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
			xia(id,num){
				var that = this;
				uni.request({
					url: that.http + 'net/shelves',
					header: that.header,
					method: 'POST',
					data: {
						dc_id:id,
						id:num,
						status:0,
						net_id: uni.getStorageSync('tokenW')
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title: '下架成功!',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '电池已经下架,不能重复下架!',
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

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: #f5f5f5;
		border-top: 2upx solid #eee;
		padding: 0;
	}
	.card2{
		background: #fff;
		width: 90%;
		padding-bottom:30upx;
		border-radius: 10upx;
		margin: 0 auto;
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
		margin-top:20upx;
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
		view{
			width:162upx;
			height:54upx;
			text-align: center;
			line-height: 54upx;
			border-radius: 10upx;
		}
		view:nth-child(1){
			color:$buttonBg;
			border:2upx solid $buttonBg;
		}
		view:nth-child(2){
			color:#9f9f9f;
			border:2upx solid #9f9f9f;
		}
	}
	.btnBlue{
		width:90%;
		margin:100upx auto 0;
		image{
			width:50upx;
			height:50upx;
			margin-right:20upx;
			position:relative;
			top:15upx;
		}
	}
</style>
