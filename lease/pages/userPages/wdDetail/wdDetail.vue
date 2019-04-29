<template>
	<view class="content">
		<view class="header flexBox">
			<image :src="info.head_src" mode=""></image>
			<view class="headerR">
				<view>{{info.name}}</view>
				<view>{{info.map_address}}</view>
			</view>
		</view>
		<image :src="info.head_src" mode=""></image>
		<view class="flexBox card">
			<view  v-for='(item,index) in dc' :class="['left',status==item.id?'cardBg':'']" :key='index' :data-num='item.id' @click="changeDc($event,item.id)">
				<view class="title" :data-num='item.id'>{{item.name}}</view>
				<view class="ts" :data-num='item.id'>{{item.dc_number}}</view>
				<view class="title" :data-num='item.id'>
					待租
				</view>
			</view>
		</view>
		<view class="btn flexBox">
			<view class="btnBlue" @click="next()">
				预约安装
			</view>
			<view class="btnBlue" @click='call()'>
				呼叫
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:'',
				dc:'',
				dc_id:'',
				status:0
			};
		},
		onLoad(option) {
			var that = this;
			uni.showLoading({
				title:'数据加载中...'
			})
			uni.request({
				url:that.http+'index/getDcList',
				header:that.header,
				method:'POST',
				data:{
					net_id:option.id
				},
				success: (res) => {
					console.log(JSON.stringify(res.data))
					uni.hideLoading()
					uni.setStorageSync('wdId',res.data.net_info.id)
					// that.$store.state.wdId = res.data.net_info.id
					that.info = res.data.net_info;
					that.dc = res.data.data;
					that.status = res.data.data[0].id
				},
				fail() {
					uni.showToast({
						title:'网络延迟，请刷新后重试!',
						icon:'none'
					})
				}
			})
		},
		methods:{
			// 选择电池id
			changeDc(e,id){
				this.status = id
			},
			// 打电话
			call(){
				uni.makePhoneCall({
					phoneNumber:this.info.link_tel.toString()
				})
			},
			// 点击预约安装
			next(){
				var that = this;
				if(that.dc.length < 1){
					uni.showToast({
						title:'无法进入下一步!',
						icon:'none'
					})
				}else{
					// 先判断是否实名
					uni.request({
						url:that.http+'index/ifIdcard',
						method:'POST',
						header:that.header,
						data:{
							user_id:uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(JSON.stringify(res))
							console.log(uni.getStorageSync('token'))
							if(res.data.data==1){
								uni.setStorageSync('dcId',that.status)
								uni.navigateTo({
									url:'../yuYue2/yuYue2?id='+that.status
								})
							}else{
								console.log(2)
								uni.navigateTo({
									url:'../realName/realName'
								})
							}
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
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
	}
	.header{
		padding:50upx 0;
		border-bottom:2upx solid #eee;
	}
	.header image{
		width:186upx;
		height:186upx;
		background: #eee;
		border-radius: 50%;
	}
	.headerR{
		padding-top:20upx;
		width:436upx;
		view:nth-child(1){
			color:#333;
			font-size:32upx;
			font-weight: bold;
			margin-bottom:20upx;
		}
	}
	.content>image{
		width:100%;
		height:388upx;
		background: #eee;
		margin:40upx 0;
	}
	.card{
		flex-wrap: wrap;
	}
	.card>.cardBg{
		background: #D1E9FF;
	}
	.card>view{
		width:330upx;
		height:214upx;
		background: #eee;
		border-radius: 10upx;
		text-align: center;
		padding-top:25upx;
		margin-bottom:20upx;
		view{
			margin-top:10upx;
		}
		view:nth-child(2){
			font-size:42upx;
			color:red;
		}
	}
	.btn{
		width:90%;
		margin:100upx auto 50upx;
	}
	.btnBlue{
		width:272upx;
		height:54upx;
		border-radius: 0;
		line-height:54upx;
	}
</style>
