<template>
	<view class="content">
		<image src="../../../static/image/logo.png" mode=""></image>
		<view class="user">
			<image src="../../../static/image/user.png" mode=""></image>
			<input type="number" value="" placeholder="手机号" @input='getText($event,"tel")' />
		</view>
		<view class="user flexBox">
			<image src="../../../static/image/register2.png" mode=""></image>
			<input type="text" value="" placeholder="请输入短信验证码" @input='getText($event,"code")' />
			<text @click="getYzm()">获取验证码</text>
			<view @click="getYzm()">
				<view></view>
			</view>
		</view>
 		<view class="user">
			<image src="../../../static/image/pwd.png" mode=""></image>
			<input type="password" value="" placeholder="请输入密码" @input='getText($event,"pass")' />
		</view>
		<view class="user">
			<image src="../../../static/image/pwd.png" mode=""></image>
			<input type="password" value="" placeholder="请再次输入密码" @input='getText($event,"again_pass")' />
		</view>
		<view class="user">
			<image src="../../../static/image/register.png" mode=""></image>
			<input type="number" value="" placeholder="请输入邀请人手机号   (选填)" @input='getText($event,"p_tel")' />
		</view>
		<view class="user">
			<image src="../../../static/image/11.png" mode=""></image>
			<input type="text" value="" placeholder="请输入网点名称" @input='getText($event,"name")' />
		</view>
		<view class="user">
			<image src="../../../static/image/12.png" mode=""></image>
			<input type="text" value="" placeholder="请输入网点地址" @input='getText($event,"map_address")' />
		</view>
		<view class="box2">
			<view class="title">
				<text></text>
				<text>门头照片上传</text>
			</view>
			<image :src="src.length==''?'../../../static/image/upload.png':src" mode="" @click="uploadImg()"></image>
		</view>
		<button type="primary" @click="submit()">立即注册</button>
		<view class="reg">
			<navigator url="../login/login" hover-class="none">已经注册，去登录</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 后台请求的验证码
				status: true,
				yzm: '',
				// 用户输入的信息
				tel: '',
				code: '',
				pass: '',
				again_pass: '',
				p_tel: '',
				map_address:'',
				name:'',
				src:'',
				id:'',	//照片id
			};
		},
		methods: {
			// 获取用户输入的数据
			getText(e, name) {
				var that = this;
				if (name == 'tel') {
					that.tel = e.detail.value;
				} else if (name == 'code') {
					that.code = e.detail.value;
				} else if (name == 'pass') {
					that.pass = e.detail.value;
				} else if (name == 'again_pass') {
					that.again_pass = e.detail.value;
				} else if (name == 'p_tel') {
					that.p_tel = e.detail.value;
				}else if(name == 'name'){
					that.name = e.detail.value;
				}else if(name == 'map_address'){
					that.map_address = e.detail.value;
				}
			},
			// 获取验证码
			getYzm() {
				var that = this;
				var time = 60;
				var timer = null;
				if (that.status == true) {
					that.status = false;
					// 60s内不允许重复点击
					timer = setInterval(function() {
						if (time == 0) {
							that.status = !that.status;
							clearInterval(timer);
							timer = null;
						}
						time = time - 1;
					}, 1000);
					if (!(/^1[34578]\d{9}$/.test(that.tel))) {
						uni.showToast({
							title: '手机号格式不正确！',
							icon: 'none'
						})
					} else {
						uni.request({
							url: that.http + 'user/getTelCode',
							header: that.header,
							data: {
								tel: that.tel
							},
							method: 'POST',
							success: (res) => {
								console.log(res);
								if (res.data.code == 200) {
									console.log(JSON.stringify(res))
									uni.showToast({
										title: '发送成功，注意查收验证码！',
										icon: 'none'
									})
								}
							},
							fail() {
								uni.showToast({
									title: '网络延迟，请刷新后重试！',
									icon: 'none'
								})
							}
						})
					}
				}else {
					uni.showToast({
						title: '60s内请勿重复请求验证码！',
						icon: 'none'
					})
				}
			},
			// 提交注册信息
			submit(){
				var that = this;
				if(that.tel.length<3){
					uni.showToast({
						title:'手机号不能为空!',
						icon:'none'
					})
				}else if(that.code.length < 3){
					uni.showToast({
						title:'验证码不能为空!',
						icon:'none'
					})
				}else if(that.pass == 0 ){
					uni.showToast({
						title:'密码不能为空!',
						icon:'none'
					})			
				}else if(that.pass!=that.again_pass){
					uni.showToast({
						title:'两次密码不一致！',
						icon:'none'
					})
				}else{
					uni.request({
						url:that.http+'net/register',
						header:that.header,
						data:{
							tel:that.tel,
							code:that.code,
							pass:that.pass,
							again_pass:that.again_pass,
							p_tel:that.p_tel,
							name:that.name,
							map_address:that.map_address,
							head_photo:that.id
						},
						method:'POST',
						success: (res) => {
							if(res.data.code==200){
								uni.showToast({
									title:res.data.data,
									icon:'none'
								})
								uni.navigateTo({
									url:'../login/login'
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
								title:'网络延迟，请刷新后重试！',
								icon:'none'
							})
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

<style scoped lang="scss">
	.content {
		padding-top: 100upx;
	}

	.content>image {
		width: 120upx;
		height: 120upx;
		display: block;
		margin: 0 auto 70upx;
	}

	.user {
		width: 670upx;
		height: 90upx;
		border: 1upx solid #ebebeb;
		border-radius: 10upx;
		padding-left: 20upx;
		margin: 0 auto 30upx;

		image {
			width: 40upx;
			height: 40upx;
			margin-top: 25upx;
		}

		input {
			width: 580upx;
			height: 90upx !important;
			float: right;
			display: inline-block;
		}
	}

	uni-button {
		height: 80upx;
		line-height: 80upx;
		background: $buttonBg;
		margin: 80upx 0 35upx;
		font-size: 28upx;
	}

	.reg {
		color: $buttonBg;
		text-align: center;
		margin:50upx 0 50upx;
	}

	.user:nth-child(3) {
		line-height: 90upx;

		image {
			width: 34upx;
			height: 42upx;
			margin-left: 6upx;
		}

		input {
			width: 270upx;
			margin-left: -12upx;
		}

		text {
			color: $colorOrange;
		}

		view {
			width: 100upx;
			height: 90upx;
			border-left: 1upx solid #ebebeb;
			padding-top: 40upx;

			view {
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid #D2D2D2;
				margin: 0 auto;
			}
		}
	}

	.user:nth-child(4)>image,
	.user:nth-child(5)>image {
		width: 35upx;
		height: 40upx;
		position: relative;
		left: 7upx;
	}

	.user:nth-child(6)>image,.user:nth-child(8)>image{
		width: 30upx;
		height: 43upx;
		position: relative;
		left: 10upx;
	}
	.user:nth-child(7)>image {
		width: 43upx;
		height: 43upx;
		position: relative;
		left: 7upx;
	}
	.title{
		height:120upx;
		line-height: 120upx;
		text-align: left;
		font-size: 30upx;
		text:nth-child(1){
			border-left:6upx solid $buttonBg;
			margin-right:20upx;
		}
	}
	.box2{
		width:100%;
		background: #fff;
		margin:20upx 0;
		text-align: center;
		image{
			width:500upx;
			height:298upx;
		}
	}
	.box2{
		background: none;
		margin:0;
	}
</style>
