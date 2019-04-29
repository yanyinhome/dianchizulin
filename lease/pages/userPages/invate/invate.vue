<template>
	<view class="content">
		<image src="../../../static/image/bg7.png" mode=""></image>
		<view class="top">
			<view class="box"></view>
			<view class="title">邀请好友一起赚钱</view>
			<view class="box2"></view>
			<view class="card">
					<image src="../../../static/image/invate.png" mode=""></image>
					<image src="../../../static/image/down.png" mode="" class="er"></image>
					<view class="titleC">扫描二维码</view>
					<view class="cardBox">
						<text>下载地址:</text>
						<text>http://houtai3.cadhx.com/uploads/dianchiY_1.0.0.apk</text>
					</view>
			</view>
			<view class="btn" @click="share()">
				立即邀请
			</view>
			<view class="card2">
				<view class="title2">
					<text>已累计邀请</text>
					<text class="ts">{{list.user_num}}</text>
					<text>人，赚取</text>
					<text class="ts">{{list.integra}}</text>
					<text>积分</text>
				</view>
				<view class="tabBox">
					<view class="tabTitle flexBox">
						<view>好友手机号</view>
						<view>状态</view>
						<view>注册时间</view>
					</view>
					<view class="tabTd flexBox" v-for='(item,index) in list.list' :key='index'>
						<view>{{item.link_tel}}</view>
						<view class="su">已完成</view>
						<view>{{item.add_time}}</view>
					</view>
				</view>
			</view>
			<view class="title3">
				<text class="bor"></text>
				<text>邀请规则</text>
				<text class="bor"></text>
			</view>
			<view class="container">
				<view>1、分享专属链接给好友;</view>
				<view>2、好友通过专属链接下载APP;</view>
				<view>3、好友注册完成后，获取积分奖励</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:''
			};
		},
		onLoad(){
			
		},
		methods:{
			share(){
				uni.getProvider({
					service: 'share',
					success: function (res) {
						console.log(JSON.stringify(res))
						if (~res.provider.indexOf('weixin')) {
							uni.share({
								provider: "weixin",
								scene: "WXSceneSession",
								type: 1,
								summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
								success: function (res) {
									console.log("success:" + JSON.stringify(res));
								},
								fail: function (err) {
									console.log("fail:" + JSON.stringify(err));
								}
							});
						}
					},
					fail(e){
						console.log('获取分享通道失败', e);
						uni.showModal({
							content:'获取分享通道失败',
							showCancel:false
						})
					}
				});
			}
		},
		onShow(){
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url:this.http+'user/getIntegralList',
				header:this.header,
				method:'POST',
				data:{
					user_id:uni.getStorageSync('token')
				},
				success:(res)=>{
					uni.hideLoading()
					for(var i in res.data.data.list){
						var str = new Date(parseInt(res.data.data.list[i].add_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
						res.data.data.list[i].add_time = str.substr(0, str.indexOf(' '))
					}
					this.list = res.data.data
				},
				fail(){
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
	.content{
		height:100%;
		padding: 0;
		margin:0;
		font-size:0;
		position: relative;
	}
	image{
		width:100%;
		height:1250px;
		margin:0;
	}
	view.top{
		width:100%;
		position: absolute;
		top:0;
		font-size:28upx;
		.box{
			width:100%;
			height:200upx;
		}
		.title{
			color:#fff;
			font-size:50upx;
			text-align: center;
		}
		.box2{
			width:100%;
			height:400upx;
		}
		.card{
			width:670upx;
			height:540upx;
			margin:0 auto 60upx;
			border:12upx solid #F7CB00;
			background: #fff;
			border-radius: 10upx;
			text-align: center;
			padding:40upx 30upx;
			image:nth-child(1){
				display: block;
				width:230upx;
				height:40upx;
				margin:0 auto 50upx;
			}
			.er{
				width:174upx;
				height:174upx;
				background:#eee;
				margin-bottom:20upx;
			}
			.cardBox{
				width:100%;
				height:100upx;
				margin-top:20upx;
				padding:0 20upx;
				line-height:100upx;
				text-align: left;
				font-size:24upx;
				background: #f5f5f5;
				text:last-child{
					width:420upx;
					line-height:30upx;
					vertical-align:middle ;
					display: inline-block;
					word-wrap:break-word;
					color:#999;
					margin-left:20upx;
				}
			}
		}
		.btn{
			width:650upx;
			height:94upx;
			color:white;
			margin:0 auto;
			text-align: center;
			line-height: 94upx;
			background:linear-gradient(180deg,rgba(255,154,132,1) 0%,rgba(247,203,0,1) 100%);
			box-shadow:0px 4px 8px 0px rgba(142,97,3,0.5);
			border-radius:40px;
			margin-bottom:80upx;
		}
	}
	.card2{
		width:670upx;
		margin:0 auto 60upx;
		border:12upx solid #F7CB00;
		background: #fff;
		border-radius: 10upx;
		text-align: center;
		padding:20upx 30upx;
		.title2{
			width:100%;
			height:80upx;
			line-height: 80upx;
			border-radius: 10upx;
			background:#FFECDA;
			.ts{
				font-size:36upx;
				color:#ff0000;
				margin:0 10upx;
			}
		}
		.tabBox{
			width:100%;
			text-align: center;
			line-height: 80upx;
			margin-top:30upx;
		}
		.tabTitle,.tabTd{
			width:100%;
			height:80upx;
			border-bottom:2upx dashed #cdcdcd;
			font-weight: normal;
			view{
				text-align: center;
				width:33.33333%;
			}
		}
		.tabTd{
			font-size:24upx;
			background: none;
			border:none;
		}
		.su{
			color:#00BE40;
		}
		.sb{
			color:#F10606;
		}
	}
	.title3{
		width:100%;
		height:40upx;
		line-height: 40upx;
		text-align: center;
		font-size:32upx;
		color:white;
		.bor{
			width:94upx;
			display: inline-block;
			border-top:4upx solid #fff;
			margin-left:40upx;
			position:relative;
			bottom:10upx;
		}
		.bor:nth-child(1){
			margin-right:40upx;
			margin-left:0;
		}
	}
	.container{
		width:100%;
		padding:0 40upx;
		color:white;
		margin-top: 50upx;
		font-size:24upx;
		line-height:50upx;
	}
</style>
