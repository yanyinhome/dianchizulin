<template>
	<view class="content">
		<view class="header">
			<view class="headerTitle flexBox">
				<view :class="status?'ts':''" @click="set()">待安装</view>
				<view :class="status?'':'ts'" @click="set()">已安装</view>
			</view>
		</view>
		<view class="card" v-for='(item,index) in list' :key='index'>
			<view class="cardTop">
				<view>
					<image src="../../../static/image/order.png" mode=""></image>
					<text>订单编号</text>
				</view>
				<text>{{item.order}}</text>
			</view>
			<view class="cardMiddle">
				<view>
					<image src="../../../static/image/tx.png" mode=""></image>
					<text>预约时间</text>
				</view>
				<text>{{item.yue_time}}</text>
			</view>
			<view class="cardBottom">
				<view>
					<image src="../../../static/image/wang.png" mode=""></image>
					<text>预约网点</text>
				</view>
				<text>{{item.name}}</text>
			</view>
			<view class="cardBottom">
				<view>
					<image src="../../../static/image/tx3.png" mode=""></image>
					<text>状态</text>
				</view>
				<text>{{item.status==1?'已安装':'待安装'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: true,
				list:''
			};
		},
		onShow() {
			this.get(2)
		},
		methods:{
			set(){
				if(this.status){
					this.get(1)
				}else{
					this.get(2)
				}
				this.status = !this.status
			},
			get(status){
				var that = this;
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: that.http + 'order/getYuyue',
					method: 'POST',
					header: that.header,
					data: {
						user_id: uni.getStorageSync('token'),
						status:status
					},
					success: (res) => {
						uni.hideLoading()
						for(var i in res.data.data){
							res.data.data[i].yue_time =new Date(parseInt(res.data.data[i].yue_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
						}
						that.list = res.data.data
						console.log(res)
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
		
		.cardTop>view>image{
			margin-top:25upx;
		}
		.cardTop,
		.cardMiddle,
		.cardBottom {
			width: 100%;
			height: 100upx;
			display: flex;
			padding: 0 40upx;
			color: #999;
			line-height: 100upx;
			border-bottom: 2upx solid #eee;

			image{
				width: 46upx;
				height: 48upx;
				float: left;
				margin-right: 30upx;
				margin-top: 20upx;
			}

			view>text {
				display: inline-block;
				width: 150upx;
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
