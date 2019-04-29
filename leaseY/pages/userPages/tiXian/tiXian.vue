<template>
	<view class="content">
		<view class="cz">
			<text>提现金额</text>
			<input type="text" value="" placeholder="输入提现金额" placeholder-style="color:#939393;font-size:12px;" @input="getMoney($event,'money')"/>
			<image src="../../../static/image/backR.png" mode=""></image>
		</view>
		<view class="balance">
			现在账号余额{{balance}}元
		</view>
		<view class="cz" @click="maskStatus=!maskStatus">
			<text>提现方式：</text>
			<text>{{num?'银行卡':'支付宝'}}</text>
			<image src="../../../static/image/backR.png" mode=""></image>
		</view>
		<view class="content1" v-if="!num">
			<input type="text" placeholder="请输入您的姓名" value="" placeholder-style="color:#939393;font-size:15px;" @input="getMoney($event,'name')"/>
			<input type="text" placeholder="请输入您的支付宝账号" value="" placeholder-style="color:#939393;font-size:15px;" @input="getMoney($event,'cardID')"/>
		</view>
		<view class="content2" v-if="num">
			<view>
				<text>持卡人：</text>
				<input type="text" placeholder="某某某" value="" @input="getMoney($event,'name')"/>
			</view>
			<view>
				<text>卡号:</text>
				<input type="text" placeholder="请输入银行卡号" value="" @input="getMoney($event,'cardID')"/>
			</view>
		</view>
		<view class="btn2" @click="submit">
			提交
		</view>
		<view class="mask" v-if="maskStatus">
			<view class="maskBox">
				<view class="title">选择提现方式</view>
				<view class="zhi" @click="num=false">
					<image src="../../../static/image/zhi.png" mode=""></image>
					<text>
						支付宝
					</text>
					<view :class="['boxW',num?'boxBorder':'']"><view :class="['boxN',num?'boxBg':'']"></view></view>
				</view>		
				<view class="zhi" @click="num=true">
					<image src="../../../static/image/bank.png" class="imageW" mode=""></image>
					<text>
						银行卡
					</text>
					<view :class="['boxW',num?'':'boxBorder']"><view :class="['boxN',num?'':'boxBg']"></view></view>
				</view>
				<view class="btn flexBox">
					<view data-id="1" @click="maskClick($event)">确定</view>
					<view data-id="2" @click="maskClick($event)">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 余额
				balance:0,
				// 遮罩层数据
				maskStatus:false,
				num:false,
				// 提现金额
				money:0,
				name:'',
				cardID:''
			};
		},
		onLoad(option) {
			this.balance = option.balnace
		},
		methods:{
			// 遮罩层确定和取消
			maskClick(e){
				var that = this;
				var id = e.currentTarget.dataset.id;
				console.log(id);
				if(id==1){
					that.maskStatus = !that.maskStatus;
				}else if(id==2){
					that.maskStatus = !that.maskStatus;
				}
			},
			getMoney(e,str){
				if(str == 'money'){
					this.money = e.detail.value
				}else if(str == 'name'){
					this.name = e.detail.value
				}else if(str == 'cardID'){
					this.cardID = e.detail.value
				}
			},
			// 点击到安全密码
			submit(){
				if(this.money==0){
					uni.showToast({
						title:'请输入提现金额!',
						icon:'none'
					})
				}else if(this.name == ''){
					uni.showToast({
						title:'请输入您的姓名或持卡人姓名!',
						icon:'none'
					})
				}else if(this.cardID == ''){
					uni.showToast({
						title:'请输入支付宝账号或银行卡号!',
						icon:'none'
					})
				}else{
					var arr = {
						money:this.money,
						name:this.name,
						cardID:this.cardID,
						way:this.num?'2':'1'
					}
					arr = JSON.stringify(arr);
					uni.navigateTo({
						url:'../pw/pw?arr='+arr
					})
				}
			}
		},
		// 自定义按钮点击事件
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({
					url:"../mx/mx"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content{
		width:100%;
		height:100%;
		padding:0;
		border-top:2upx solid #eee;
		position: relative;
	}
	uni-page-body{
		height:100%;
	}
	.cz{
		width:100%;
		height:110upx;
		display: flex;
		font-size:32upx;
		justify-content: space-between;
		padding:0 40upx;
		line-height:110upx;
		input{
			width:450upx;
			height:80upx;
			margin-top:18upx;
		}
		text:nth-child(2){
			font-size:30upx;
			margin-left:-370upx;
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
	.content .cz:nth-child(3){
		border-bottom:2upx solid #eee;
	}
	.mask{
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
	}
	.maskBox{
		position: fixed;
		left: 0;
		bottom: 0;
		width:100%;
		height:504upx;
		background: white;
		border-top-right-radius: 50upx;
		border-top-left-radius: 50upx;
		padding:40upx 30upx;
		font-size:32upx;
		color:#333;
		font-weight: bold;
		.title{
			text-align: center;
			margin-bottom:40upx;
		}
		.zhi{
			margin-top:30upx;
			padding-bottom:30upx;
			border-bottom:2upx solid #eee;
			line-height: 60upx;
		}
		.zhi image{
			width:60upx;
			height:60upx;
			float:left;
			margin-right:24upx;
		}
		.boxW{
			width:46upx;
			height:46upx;
			float:right;
			border:4upx solid $buttonBg;
			border-radius: 50%;
			margin-top:10upx;
		}
		.boxN{
			width:20upx;
			height:20upx;
			margin:10upx auto 0;
			background: $buttonBg;
			border-radius: 50%;
			position:relative;
			right:1upx;
		}
		.btn{
			width:74%;
			margin:50upx auto 0;
			view{
				width:242upx;
				height:80upx;
				color:white;
				font-weight: normal;
				text-align: center;
				line-height: 80upx;
			}
			view:nth-child(1){
				background:linear-gradient(180deg,rgba(255,189,97,1) 0%,rgba(255,134,45,1) 100%);
				border-radius:10upx;
			}
			view:nth-child(2){
				background:#a9a9a9;
				border-radius:10upx;
			}
		}
	}
	.zhi>image.imageW{
		width:58upx;
		height:40upx;
		margin-top:11upx;
	}
	.zhi>.boxBorder{
		border:4upx solid #939393;
	}
	.zhi>view>.boxBg{
		background: white;
	}
	.content1>input{
		width:100%;
		height:82upx;
		line-height: 82upx;
		padding-left:40upx;
		background: #F5F5FA;
		margin-top:30upx;
		box-sizing: border-box;
	}
	.content2{
		padding:0 40upx;
		input{
			width:450upx;
			height:110upx;
			margin-left:65upx;
		}
	}
	.content2>view{
		display: flex;
		width:100%;
		height:110upx;
		border-bottom:2upx solid #eee;
		line-height: 110upx;
	}
	.content2>view:nth-child(2) input{
		margin-left:110upx;
	}
	.btn2{
		width:672upx;
		height:80upx;
		color:white;
		background: $buttonBg;
		margin:150upx auto 0;
		line-height: 80upx;
		text-align: center;
		border-radius: 10upx;
	}
</style>
