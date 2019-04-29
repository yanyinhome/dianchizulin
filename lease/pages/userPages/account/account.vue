<template>
	<view class="content">
		<view class="zBox">
			<image src="../../../static/image/money.png" mode=""></image>
			<view>
				<text>积分余额</text>
				<text>{{account}}</text>
			</view>
			<image src="../../../static/image/notice2.png" mode=""></image>
		</view>
		<view class="title">
			积分明细
		</view>
		<view class="tabBox">
			<view class="tabTitle flexBox">
				<view>当前余额</view>
				<view>变动数额</view>
				<view>变动时间</view>
			</view>
			<view class="tabTd flexBox" v-for="(item,index) in record" :key="index">
				<view>{{item.integral}}积分</view>
				<view>{{item.in_recode}}</view>
				<view>{{item.add_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account:'',
				record:''
			};
		},
		onLoad(option) {
			this.account = option.account
			var that = this;
			uni.request({
				url:that.http+'user/getUserInlog',
				header:that.header,
				method:'POST',
				data:{
					user_id:uni.getStorageSync('token')
				},
				success: (res) => {
					console.log(res)
					for(var i in res.data.data){
						var str = new Date(parseInt(res.data.data[i].add_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
						res.data.data[i].add_time = str.substr(0, str.indexOf(' '))
					}
					that.record = res.data.data
				},
				fail() {
					uni.showToast({
						title:'网络延迟，请刷新后再获取积分记录!'
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
			width:70%;
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

		image:nth-child(3) {
			width:170upx;
			height:80upx;
			float: right;
			margin-top: -35upx;
		}
	}
	.title{
		width:100%;
		font-size:32upx;
		color:#2b2b2b;
		margin:20upx 0;
	}
	.tabBox{
		width:100%;
		text-align: center;
		line-height: 80upx;
	}
	.tabTitle,.tabTd{
		width:100%;
		height:80upx;
		background: #f0f0f0;
		border: none;
		font-weight: normal;
		view{
			text-align: center;
			width:33.33333%;
		}
	}
	.tabTd{
		background: none;
		view{
			border:2upx solid #eee;
			border-top:none;
		}
		view:nth-child(2){
			border-left:none;
			border-right:none;
		}
	}
</style>
