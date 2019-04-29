<template>
	<view class="content">
		<view class="title">*为了您的帐号信息安全</view>
		<view class="cz">
			<text>姓名：</text>
			<input type="text" value="" placeholder="请输入姓名" placeholder-style="color:#939393;" @input="getInfo($event,'name')"/>
			<image src="../../../static/image/backR.png" mode=""></image>
		</view>
		<view class="cz">
			<text>身份证号：</text>
			<input type="text" value="" placeholder="请输入身份证号" placeholder-style="color:#939393;" @input="getInfo($event,'id')"/>
			<image src="../../../static/image/backR.png" mode=""></image>
		</view>
		<view class="card">
			<view class="cardTitle">身份证正反照上传</view>
			<view class="flexBox">
				<image :src="zheng==''?'../../../static/image/real.png':zheng" mode="" @click="uploadImg('zheng')"></image>
				<image :src="fan==''?'../../../static/image/real.png':fan" mode="" @click="uploadImg('fan')"></image>
			</view>
		</view>
		<view class="sh" @click="status=!status">
			<image :src="status?'../../../static/image/close.png':'../../../static/image/2.png'" mode=""></image>
			<text>关闭审核</text>
		</view>
		<view class="sm">说明：点击关闭审核，后台将不在审核信息，你可以立即支付</view>
		<view class="btnBlue" @click="submit()">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:false,
				name:'',
				id:'',
				zheng:'',
				fan:'',
				zId:'',
				fId:''
			};
		},
		methods:{
			getInfo(e,str){
				if(str == 'name'){
					this.name = e.detail.value
				}else if(str == 'id'){
					this.id = e.detail.value
				}
			},
			submit(){
				var that = this;
				if(that.name == ''){
					uni.showToast({
						title:'请先输入姓名',
						icon:'none'
					})
				}else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.id))){
					uni.showToast({
						title:'身份证号格式不正确!',
						icon:'none'
					})
				}else if(that.zheng=='' || that.fan==''){
					uni.showToast({
						title:'请补全身份证照片!',
						icon:'none'
					})
				}else{
					// 提交信息
					uni.request({
						url:that.http+'index/setIdcard',
						header:that.header,
						method:'POST',
						data:{
							user_id:uni.getStorageSync('token'),
							user_name:that.name,
							id_card:that.id,
							id_photo:that.zId,
							id_photof:that.fId
						},
						success: (res) => {
							console.log(JSON.stringify(res.data))
							if(res.data.code == 200){
								uni.navigateTo({
									url:'../rnResault/rnResault'
								})
							}else{
								uni.showToast({
									title:res.data.data,
									icon:'none'
								})
							}
						},
						fail(){
							uni.showToast({
								title:'网络延迟，请重试!',
								icon:'none'
							})
						}
					})
				}
			},
			// 上传图片
			uploadImg(str){
				var that = this;
				// 选择图片
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (wj) => {
						uni.showLoading({
							title: '上传中...'
						})
						// 原生压缩
						plus.zip.compressImage({
								src: wj.tempFilePaths[0],
								dst: "_doc/a.jpg",
								overwrite: true,
								format: 'jpg',
								quality: 100
							},
							function(e) {
								var reader = new plus.io.FileReader();
								reader.onloadend = function(e) {
									var speech = e.target.result; //base64图片 
									// 上传头像
									uni.request({
										url: that.http + 'index/imgupload',
										header: that.header,
										method: 'POST',
										data: {
											file: speech
										},
										success: (res) => {
											uni.hideLoading()
											if(res.data.code==200){
												if(str == 'zheng'){
													that.zheng = res.data.path;
													that.zId = res.data.id
													console.log(that.zId,that.zheng)
												}else if(str == 'fan'){
													that.fan = res.data.path;
													that.fId = res.data.id
													console.log(that.fId,that.fan)
												}
											}else{
												uni.showToast({
													title:res.data.info,
													icon:'none'
												})
											}
										},
										fail() {
											uni.showToast({
												title: '上传时网络延迟，请刷新后重试!',
												icon: 'none'
											})
										}
									})
								};
								reader.readAsDataURL(e.target);
							},
							function(err) {
								plus.nativeUI.alert('未知错误！', function() {});
							}
						);
					},
					fail() {
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		min-height:100vh;
		background:#f5f5f5;
		border-top:2upx solid #eee;
		padding:0 30upx;
	}
	.title{
		color:#ff0000;
		padding:30upx 0 10upx;
	}
	.cz{
		width:100%;
		height:90upx;
		background: #fff;
		margin-top:30upx;
		border:2upx solid #e2e2e2;
		padding:0 20upx;
		line-height:90upx;
		text{
			float:left;
		}
		input{
			width:420upx;
			height:90upx;
			display: inline-block;
		}
		image{
			width:20upx;
			height:35upx;
			margin-top:25upx;
			float: right;
			
		}
	}
	.card{
		width:100%;
		background: #fff;
		margin-top:30upx;
		padding:0 30upx 40upx;
		border:2upx solid #e2e2e2;
		.cardTitle{
			width:100%;
			text-align: left;
			padding: 40upx 0;
		}
		image{
			width:304upx;
			height:244upx;
			border-radius: 15upx;
		}
	}
	.sh{
		width:100%;
		margin:30upx 0;
		image{
			width:39upx;
			height:39upx;
			float:left;
			margin-right:20upx;
		}
	}
	.sm{
		font-size:24upx;
		color:#999;
		margin-bottom:100upx;
	}
</style>
