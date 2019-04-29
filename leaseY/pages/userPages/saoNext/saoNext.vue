<template>
	<view class="container">
		<view class="box">
			<image src="../../../static/image/success3.png"></image>
			<view>扫码成功</view>
		</view>
		<view class="btnBlue" @click="submit()">确认已安装</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lease_id:'',
				type:''
			};
		},
		onLoad(option) {
			this.lease_id = option.lease_id
			this.type = option.id
		},
		methods:{
			submit(){
				var that = this;
				// 安装确认接口
				if(that.type==1){
					uni.request({
						url: that.http + 'net/successInstal',
						header: that.header,
						method: 'POST',
						data: {
							lease_id: that.lease_id,
							net_id:uni.getStorageSync('tokenW')
						},
						success: (res) => {
							console.log(JSON.stringify(res))
							console.log(that.lease_id)
							if(res.data.code==200){
								uni.showToast({
									title: '用户安装成功!',
									icon: 'none'
								})
							}else{
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
				// 换电池接口
				}else{
					uni.request({
						url: that.http + 'net/successHuan',
						header: that.header,
						method: 'POST',
						data: {
							lease_id: that.lease_id,
							net_id:uni.getStorageSync('tokenW')
						},
						success: (res) => {
							// console.log(JSON.stringify(res))
							if(res.data.code==200){
								uni.showToast({
									title: '用户换电池成功!',
									icon: 'none'
								})
							}else{
								uni.showToast({
									title: res.data.data,
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
	}
</script>

<style lang="scss" scoped>
	.container{
		min-height:100vh;
		border-top:2upx solid #eee;
		background:#F5F5F5;
		padding-top:80upx;
	}
	.box{
		width:510upx;
		height:284upx;
		margin:0 auto 500upx;
		text-align: center;
		background:white;
		font-size:32upx;
		color:#666;
		image{
			width:60upx;
			height:60upx;
			margin:80upx 0 20upx;
		}
	}
	.btnBlue{
		width:90%;
		font-size:28upx;
		margin:0 auto;
	}
</style>
