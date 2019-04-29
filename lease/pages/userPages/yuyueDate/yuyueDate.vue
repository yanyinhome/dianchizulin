<template>
<view class="content">
		<view class="card2">
			<view class="title2">选择租用期限</view>
			<view class="card">
				<view :class="status=='day'?'bg':''" @click="change('day')">
					<view>1天</view>
					<view>{{day}}元</view>
				</view>
				<view :class="status=='month'?'bg':''" @click="change('month')">
					<view>30天</view>
					<view>{{qu}}元</view>
				</view>
				<view :class="status=='quarter'?'bg':''" @click="change('qu')">
					<view>90天</view>
					<view>{{month}}元</view>
				</view>
				<view :class="status=='hyear'?'bg':''" @click="change('hyear')">
					<view>半年</view>
					<view>{{hyear}}元</view>
				</view>
				<view :class="status=='year'?'bg':''" @click="change('year')">
					<view>一年</view>
					<view>{{year}}元</view>
				</view>
			</view>
		</view>
		<view class="footer flexBox">
			<view class="">
				共一件 合计：
				<text>￥{{price}}</text>
			</view>
			<view @click="maskStatus=true">立即支付</view>
		</view>
		<view class="mask" v-if="maskStatus">
			<view class="maskBox">
				<view class="title">选择支付方式</view>
				<view class="zhi" @click="num=1">
					<image src="../../../static/image/pay6.png" class="imageW" mode=""></image>
					<text>
						余额
					</text>
					<view :class="['boxW',num==1?'':'boxBorder']"><view :class="['boxN',num==1?'':'boxBg']"></view></view>
				</view>
				<view class="zhi" @click="num=2">
					<image src="../../../static/image/wei.png" class="imageW" mode=""></image>
					<text>
						微信
					</text>
					<view :class="['boxW',num==2?'':'boxBorder']"><view :class="['boxN',num==2?'':'boxBg']"></view></view>
				</view>
				<view class="zhi" @click="num=3">
					<image src="../../../static/image/zhi.png" mode=""></image>
					<text>
						支付宝
					</text>
					<view :class="['boxW',num==3?'':'boxBorder']"><view :class="['boxN',num==3?'':'boxBg']"></view></view>
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
				// 续租时的id
				xu_id:'',
				// 选择状态
				status:'day',
				price:0,
				dc_id:'',
				day:0,
				month:0,
				qu:0,
				hyear:0,
				year:0,
				// 遮罩层数据
				maskStatus:false,
				num:1,
			};
		},
		methods:{
		// 遮罩层确定和取消
			maskClick(e){
				var that = this;
				var id = e.currentTarget.dataset.id;
				if(id==1){
					// 确认支付
					that.maskStatus = !that.maskStatus;
					var arr = {
						xu_id:that.xu_id,	//续租id
						type:2,	//租金
						pay_type:1,	//余额支付
						money:that.price,	//最后金额
						zu_time:that.status	//租期
					}
					arr = JSON.stringify(arr)
					uni.navigateTo({
						url:'../pw/pw?arr='+arr
					})
				}else if(id==2){
					that.maskStatus = !that.maskStatus;
				}
			},
			change(str){
				if(str=='day'){
					this.status = 'day'
					this.price = this.day
				}else if(str == 'month'){
					this.status = 'month'
					this.price = this.month
				}else if(str == 'qu'){
					this.status = 'quarter'
					this.price = this.qu
				}else if(str == 'hyear'){
					this.status = 'hyear'
					this.price = this.hyear
				}else if(str == 'year'){
					this.status = 'year'
					this.price = this.year
				}
			}
		},
		onShow(){
			// 请求租用期限
			uni.request({
				url:this.http+'index/getDcInfo',
				method:'POST',
				header:this.header,
				data:{
					dc_id:uni.getStorageSync('dcId'),
				},
				success: (res) => {
					console.log(res)
					this.day = res.data.data.rent_day
					this.month = res.data.data.rent_month
					this.qu = res.data.data.rent_quarter
					this.hyear = res.data.data.rent_byear
					this.year = res.data.data.rent_year
					// 默认租用时间为1天
					this.change('day');
				},
				fail() {
					uni.showToast({
						title:'网络延迟，请刷新后重试!',
						icon:'none'
					})
				}
			})
		},
		onLoad(option) {
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2]; //上个页面
			if(beforePage.route == 'pages/userPages/yuSuccess/yuSuccess'){
				// 续租时存放的id
				this.xu_id = option.id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height:100vh;
		background: #f5f5f5;
		border-top:2upx solid #eee;
		padding:0;
	}
	.card2{
		background:#fff;
		width:690upx;
		padding:0 30upx 0;
		margin:0 auto;
		margin-top:30upx;
		border-radius: 10upx;
	}
	.title2{
		width:100%;
		height:80upx;
		line-height:80upx;
		border-bottom:2upx solid #eee;
	}
	.card{
		display: flex;
		flex-wrap: wrap;
		width:100%;
		padding:10upx 10upx 40upx;
	}
	.card>view{
		width:30%;
		height:106upx;
		margin-top:30upx;
		margin-right:20upx;
		text-align: center;
		padding-top:10upx;
		border:2upx solid #d0d0d0;
	}
	.bg{
		background:#ADDCFF;
		color:white;
	}
	.footer{
		position: fixed;
		bottom:0;
		background: #fff;
		width:100%;
		height:124upx;
		line-height:124upx;
		padding:0 40upx;
		color:#333;
	}
	.footer>view:last-child{
		width:188upx;
		height:64upx;
		font-size:24upx;
		line-height:64upx;
		text-align: center;
		margin-top:30upx;
		background:rgba(255,137,49,1);
		border-radius:32upx;
		color:white;
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
		height:630upx;
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
	.zhi>.boxBorder{
		border:4upx solid #939393;
	}
	.zhi>view>.boxBg{
		background: white;
	}
</style>

