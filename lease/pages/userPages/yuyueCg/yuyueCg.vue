<template>
	<view class="content">
		<image src="../../../static/image/yuyue.png" mode=""></image>
		<view>预约成功，<text @click="to()">去选择租用期限</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:0,
				dc_id:''
			};
		},
		onLoad(option) {
		},
		methods:{
			to(){
				uni.navigateTo({
					url:'../yuyueDate/yuyueDate'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height:100vh;
		background:#FFF5ED;
		border-top:2upx solid #eee;
		text-align: center;
		view{
			color:#333;
			font-size:32upx;
			text{
				color:$colorOrange ;
			}
		}
	}
	image{
		width:220upx;
		height:180upx;
		margin-top:250upx;
		margin-bottom:70upx;
	}
</style>
