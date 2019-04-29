<template>
	<view class="content">
		<view class="card">
			<text>网点名称:</text>
			<input type="text" value="" placeholder="请输入网点名称" placeholder-style="color:#999;" @input="getInfo($event,'name')"/>
		</view>
		<view class="card">
			<text>网点地址:</text>
			<input type="text" value="" placeholder="请输入网点地址" placeholder-style="color:#999;" @input="getInfo($event,'address')"/>
		</view>
		<view class="card">
			<text>联系人:</text>
			<input type="text" value="" placeholder="请输入联系人" placeholder-style="color:#999;" @input="getInfo($event,'link_name')"/>
		</view>
		<view class="card">
			<text>联系方式:</text>
			<input type="text" value="" placeholder="请输入联系方式" placeholder-style="color:#999;" @input="getInfo($event,'link_tel')"/>
		</view>
		<view class="title">
			门头照片上传
		</view>
		<image :src="src.length==''?'../../../static/image/upload.png':src" mode="" @click="uploadImg()"></image>
		<view class="btn" @click="submit()">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				map_address:'',
				link_name:'',
				link_tel:'',
				src:'',
				id:'',	//照片id
			};
		},
		onLoad() {
			uni.request({
					url:this.http+'user/ifNet',
					method:'POST',
					header:this.header,
					data:{
						user_id:uni.getStorageSync('token'),
					},
					success: (res) => {
						console.log(res)
						if(res.data.code==200){
						}else{
							uni.showModal({
								title:'温馨提示',
								content:res.data.mes,
								showCancel:false,
								success() {
									uni.navigateBack({
										delta:1
									})
								}
							})
						}
					}
				})
		},
		methods:{
			getInfo(e,str){
				var that = this;
				if(str=='name'){
					that.name = e.detail.value
				}else if(str == 'address'){
					that.map_address = e.detail.value
				}else if(str == 'link_name'){
					that.link_name = e.detail.value
				}else if(str == 'link_tel'){
					that.link_tel = e.detail.value
				}
			},
			// 提交信息
			submit(){
				if(this.name==''||this.link_name==''||this.link_tel==''||this.map_address==''||this.id==''){
					uni.showToast({
						title:'请完善网点信息!',
						icon:'none'
					})
				}else{
					uni.request({
						url:this.http+'user/levelUp',
						method:'POST',
						header:this.header,
						data:{
							user_id:uni.getStorageSync('token'),
							name:this.name,
							map_address:this.map_address,
							link_name:this.link_name,
							link_tel:this.link_tel,
							head_photo:this.id
						},
						success: (res) => {
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
						}
					})
				}
			},
			// 上传图片
			uploadImg(){
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
												that.src = res.data.path;
												that.id = res.data.id
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
						uni.showToast({
							title: '打开相册失败，请重试！',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
	}
	.card{
		display: flex;
		justify-content: space-between;
		height:100upx;
		line-height: 100upx;
		border-bottom:2upx solid #eee;
		input{
			width:520upx;
			height:100upx;
		}
	}
	image{
		width:100%;
		height:298upx;
	}
	.title{
		height:120upx;
		line-height: 120upx;
		text-align: left;
	}
	.btn{
		width:100%;
		height:80upx;
		line-height:80upx;
		text-align:center;
		color:white;
		background:$buttonBg;
		border-radius: 10upx;
		margin-top:250upx;
	}
</style>
