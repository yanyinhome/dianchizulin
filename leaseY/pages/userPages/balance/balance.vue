<template>
	<view class="content">
		<view class="cz">
			<text>充值金额</text>
			<input type="text" value="" placeholder="输入充值金额" placeholder-style="color:#939393;font-size:12px;" @input="getMoney($event)"/>
			<image src="../../../static/image/backR.png" mode=""></image>
		</view>
		<view class="balance">
			现在账号余额{{balance}}元
		</view>
		<view class="zBox" @click="status=true">
			<image src="../../../static/image/zhi.png" mode=""></image>
			<view>
				<text>支付宝支付</text>
				<text>快捷支付</text>
			</view>
			<image :src="status?'../../../static/image/zhi1.png':''" :class="status?'':'imageBorder'" mode=""></image>
		</view>
		<view class="zBox" @click="status=false">
			<image src="../../../static/image/wei.png" mode=""></image>
			<view>
				<text>微信支付</text>
				<text>快捷支付</text>
			</view>
			<image :src="status?'':'../../../static/image/zhi1.png'" :class="status?'imageBorder':''" mode=""></image>
		</view>
		<view class="btn" @click="cz()">
			立即充值
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:true,
				balance:0,
				// 用户数据
				money:0
			};
		},
		onLoad(option) {
			this.balance = option.bala
		},
		onShow() {
		},
		methods:{
			getMoney(e){
				this.money = e.detail.value
			},
			cz(){
				if(this.money == 0){
					uni.showToast({
						title:'请输入金额!',
						icon:'none'
					})
				}else{
					var arr = {
						money:this.money,
						type:this.status?2:3
					}
					arr = JSON.stringify(arr)
					uni.navigateTo({
						url: '../pw/pw?arr='+arr,
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 0;
	}
	.cz{
		width:100%;
		height:110upx;
		display: flex;
		font-size:32upx;
		justify-content: space-between;
		padding:0 40upx;
		line-height:110upx;
		border-top:2upx solid #eee;
		input{
			width:450upx;
			height:80upx;
			margin-top:18upx;
		}
		image{
			width:20upx;
			height:35upx;
			margin-top:35upx;
		}
	}
	.balance{
		width:100%;
		height:82upx;
		background: #F5F5FA;
		color:#939393;
		line-height: 82upx;
		padding-left:40upx;
	}
	.zBox{
		width:90%;
		height:160upx;
		margin:0 auto;
		border-bottom:2upx solid #EEEEEE;
		view{
			position:relative;
			top:40upx;
		}
		view>text{
			display: block;
		}
		view>text:nth-child(1){
			font-size:30upx;
		}
		view>text:nth-child(2){
			color:#999;
			font-size:26upx;
		}
		image:nth-child(1){
			width:60upx;
			height:60upx;
			float:left;
			margin-top:50upx;
			margin-right:30upx;
		}	
		image:nth-child(3){
			width:44upx;
			height:44upx;
			float:right;
			margin-top:-15upx;
		}
	}
	.imageBorder{
		border:2upx solid #999;
		border-radius: 50%;
	}
	.btn{
		width:672upx;
		height:80upx;
		margin:100upx auto 0;
		background: $buttonBg;
		text-align: center;
		line-height: 80upx;
		color:white;
	}
</style>
