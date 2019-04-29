<template>
	<view class="content">
		<view class="header">
			<image src="../../../static/image/bg4.png" mode=""></image>
			<view class="box">
				<view class="title">
					今日预约
				</view>
				<view class="bor"></view>
				<view class="flexBox">
					<view>
						<view>换电总数量：</view>
						<view>{{info.huan_num}}</view>
					</view>
					<view>
						<view>安装总数量：</view>
						<view>{{info.an_num}}</view>
					</view>
					<view>
						<view>退租总数量：</view>
						<view>{{info.tui_num}}</view>
					</view>
				</view>
			</view>
			<view class="header2">
				<view class="headerTitle flexBox">
					<view :class="status==1?'ts':''" @click="set(1)">已预约</view>
					<view :class="status==2?'ts':''" @click="set(2)">已换电</view>
					<view :class="status==3?'ts':''" @click="set(3)">已安装</view>
				</view>
				<view class="card" v-if="status==1" v-for="(item,index) in list" :key="index">
					<view>订单编号:
						<text>{{item.order}}</text>
					</view>
					<view>预约时间:
						<text>{{item.yue_time}}</text>
					</view>
					<view>订单类型:
						<text>{{item.type==1?'待安装':'待换电'}}</text>
					</view>
					<view>预约姓名:
						<text>{{item.user_name}}</text>
					</view>
					<view>预约联系方式:
						<text>{{item.user_tel}}</text>
					</view>
				</view>
				<view class="card" v-if="status!=1" v-for="(item,index) in list" :key="index">
					<view>订单编号:
						<text>{{item.order}}</text>
					</view>
					<view>预约时间:
						<text>{{item.yue_time}}</text>
					</view>
					<view>预约姓名:
						<text>{{item.user_name}}</text>
					</view>
					<view>预约联系方式:
						<text>{{item.user_tel}}</text>
					</view>
					<view class="btnBox" v-if="status==3">
						<text class="btn" @click="gui(item.id)">确认归还电池</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:1,
				info:'',
				list:''		//预约列表
			};
		},
		onLoad() {
			
		},
		onShow() {
			var that = this;
			that.get()
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url: that.http + 'net/getLeaseCount',
				header: that.header,
				method: 'POST',
				data: {
					net_id: uni.getStorageSync('tokenW')
				},
				success: (res) => {
					uni.hideLoading()
					// console.log(res)
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
		methods:{
			set(num){
				if(num == 1){
					// 已预约的列表
					this.get()
					this.status = 1
				}else if(num == 2){
					this.get2(2)
					this.status = 2
				}else{
					this.get2(1)
					this.status = 3
				}
			},
			get2(num){
				var that = this;
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url: that.http + 'net/getleaseAn',
					header: that.header,
					method: 'POST',
					data: {
						type:num,
						net_id: uni.getStorageSync('tokenW')
					},
					success: (res) => {
						that.list = ''
						uni.hideLoading()
						if (res.data.code == 200) {
							console.log(res)
							for(var i in res.data.data){
								var str = new Date(parseInt(res.data.data[i].yue_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
								res.data.data[i].yue_time = str
							}
							that.list = res.data.data
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
			get(){
				var that = this;
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					url: that.http + 'net/getleaseList',
					header: that.header,
					method: 'POST',
					data: {
						net_id: uni.getStorageSync('tokenW')
					},
					success: (res) => {
						uni.hideLoading()
						if (res.data.code == 200) {
							for(var i in res.data.data){
								var str = new Date(parseInt(res.data.data[i].yue_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
								res.data.data[i].yue_time = str
							}
							that.list = res.data.data
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
			gui(id){
				var that = this;
				uni.request({
					url: that.http + 'net/returnDc',
					header: that.header,
					method: 'POST',
					data: {
						net_id: uni.getStorageSync('tokenW'),
						lease_id:id
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title: res.data.date,
								icon: 'none'
							})
							that.get(1)
						} else {
							uni.showToast({
								title: res.data.date,
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
		padding: 0;
		min-height:100vh;
		background: #F9F9F9;
	}
	.header{
		position:relative;
	}
	.header>image{
		width:100%;
		height:232upx;
	}
	.box{
		width:100%;
		position: absolute;
		top:0;
		color:white;
		.title{
			width:100%;
			margin-top:30upx;
			text-align: center;
		}
		.bor{
			width:70upx;
			margin:15upx auto 0;
			border-top:2upx solid white;
		}
		.flexBox{
			width:90%;
			margin:40upx auto 0;
		}
	}
	.header2 {
		width: 90%;
		height: 78upx;
		padding-top: 30upx;
		margin: 0 auto;
	}
	
	.headerTitle {
		width: 100%;
		height: 78upx;
		margin: 0 auto 30upx;
	
		view {
			width: 33.3333333%;
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
			border-right: none;
		}
	
		view:nth-child(3) {
			border-left: none;
			border-top-right-radius: 15upx;
			border-bottom-right-radius: 15upx;
		}
	
		.ts {
			background: $buttonBg;
			color: white;
		}
	}
	.card{
		background: white;
		margin-bottom:40upx;
		box-shadow:0px 4px 8px 0px rgba(200,200,200,0.5);
		view{
			height:100upx;
			padding:0 40upx;
			line-height:100upx;
			color:#333333;
			border-bottom:2upx solid #eee;
			text{
				color:#999999;
				margin-left:20upx;
			}
		}
	}
	.card .btnBox{
		text-align: center;
	}
	.card .btn{
		display: inline-block;
		width:400upx;
		height:70upx;
		line-height: 70upx;
		background:$buttonBg;
		color:#fff;
		border-radius: 15upx;
	}
</style>
