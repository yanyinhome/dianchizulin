<template>
	<view class="content">
		<view class="title">退款原因</view>
		<textarea value="" placeholder="请输入你要退款的原因(选填)" @input="setText($event)"/>
		<view class="btnBlue" @click="submit()">
			提交申请
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				no_mes:'',
				lease_id:''
			};
		},
		onLoad(option){
			this.lease_id = option.id
		},
		methods:{
			setText(e){
				this.no_mes = e.detail.value
			},
			submit(){
				uni.request({
					url:this.http+'order/setTui',
					header:this.header,
					method:'POST',
					data:{
						user_id:uni.getStorageSync('token'),
						lease_id:this.lease_id,
						no_mes:this.no_mes
					},
					success:(res)=>{
						console.log(res)
						if(res.data.code==200){
							uni.showToast({
								title:res.data.mes,
								icon:'none'
							})
						}else{
							uni.showToast({
								title:res.data.mes,
								icon:'none'
							})
						}
					},
					fail(){
						uni.showToast({
							title:'网络延迟，请刷新后再提交!',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height:100vh;
		background: #F5F5F5;
		border-top:2upx solid #eee;
	}
	.title{
		margin:30upx 0;
	}
	textarea{
		width:100%;
		height:310upx;
		background:#fff;
		box-sizing: border-box;
		padding:20upx;
		border:2upx solid #d2d2d2;
		font-size:24upx;
	}
	.btnBlue{
		width:672upx;
		margin:0 auto;
		position: fixed;
		bottom:100upx;
	}
</style>
