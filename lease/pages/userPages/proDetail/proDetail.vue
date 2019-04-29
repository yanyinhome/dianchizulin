<template>
	<view class="content">
		<view class="title">
			{{dc_info.name}}
		</view>
		<swiper class="swiper" circular indicator-dots="true" autoplay interval="2000" duration="500" indicator-color="rgb(0,0,0,.3)" indicator-active-color="#329ef0">
			<swiper-item v-for="(item,index) in img" :key="index">
				<image :src="item" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="card">
			<view class="flexBox">
				<text>续航能力</text>
				<text>{{dc_info.xuhang==null?'暂无':dc_info.xuhang}}</text>
			</view>
			<view class="flexBox">
				<text>电池重量</text>
				<text>{{dc_info.zhongliang==null?'暂无':dc_info.zhongliang}}</text>
			</view>
			<view class="flexBox">
				<text>电芯类型</text>
				<text>{{dc_info.dianxin==null?'暂无':dc_info.dianxin}}</text>
			</view>
			<view class="flexBox">
				<text>市场售价</text>
				<text>{{dc_info.shoujia==null?'暂无':'￥'+dc_info.shoujia}}</text>
			</view>
		</view>
		<view class="titleBottom">
			{{dc_info.detail}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dc_info:'',
				img:''
			};
		},
		onLoad(option) {
			var that = this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url:that.http+'index/getDcInfo',
				header:that.header,
				method:'POST',
				data:{
					dc_id:option.id
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res)
					that.dc_info = res.data.data
					that.img = res.data.data.pics_src
				},
				fail() {
					uni.showToast({
						title:'网络延迟，请刷新后重试!',
						icon:'none'
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		border-top: 2upx solid #eee;
		padding-top: 30upx;
	}

	.title {
		width: 100%;
		text-align: center;
		color: #666;
		margin-bottom:30upx;
	}
	swiper{
		width:582upx;
		height:448upx;
		border:2upx solid #eee;
		margin:0 auto 50upx;
		image{
			width:100%;
			height:100%;
		}
	}
	.card{
		width:100%;
		padding:0 30upx;
		border:2upx solid #7BC6FF;
		border-radius: 15upx;
		view{
			height:90upx;
			line-height: 90upx;
			border-bottom: 2upx solid #eee;
			text:last-child{
				color:$colorOrange;
			}
		}
		view:last-child{
			border:none;
		}
	}
	.titleBottom{
		width:100%;
		text-align: center;
		margin-top:150upx;
		color:#999;
	}
</style>
