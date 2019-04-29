<template>
	<view class="content">
		<navigator hover-class="none" class="header flexBox" v-for="(item,index) in info" :key="index" :url="'../leasePage/leasePage?id='+item.id">
			<image :src="item.head_src" mode=""></image>
			<view class="headerR">
				<view>{{item.name}}</view>
				<view>{{item.map_address}}</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				info:''
			};
		},
		onLoad(option) {
			var that = this;
			console.log(option.id)
			that.id = option.id;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url:that.http+'index/getNetList',
				header:that.header,
				method:'POST',
				data:{
					area_id:that.id
				},
				success: (res) => {
					uni.hideLoading()
					// console.log(res)
					if(res.data.code!=200){
						uni.showToast({
							title:res.data.mes,
							icon:'none'
						})
					}else{
						that.info = res.data.data
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
</script>

<style scoped lang="scss">
.content{
		border-top:2upx solid #eee;
	}
	.header{
		padding:30upx 0;
		border-bottom:2upx solid #eee;
	}
	.header image{
		width:166upx;
		height:166upx;
		background: #eee;
		border-radius: 50%;
	}
	.headerR{
		padding-top:20upx;
		width:460upx;
		view:nth-child(1){
			color:#333;
			font-size:32upx;
			font-weight: bold;
			margin-bottom:20upx;
		}
	}
</style>
