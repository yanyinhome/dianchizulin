<template>
	<view class="content">
		<view class="user flexBox">
			<image src="../../../static/image/pay3.png" mode=""></image>
			<input type="number" value="" placeholder="请输入手机号" @input="getText($event,'tel')"/>
			<text @click="getYzm()">获取验证码</text>
		</view>
		<view class="user">
			<image src="../../../static/image/aq8.png" mode=""></image>
			<input type="text" value="" placeholder="请输入短信验证码" @input="getText($event,'code')"/>
		</view>
		<view class="user">
			<image src="../../../static/image/pay.png" mode=""></image>
			<input type="password" value="" placeholder="请输入密码" @input="getText($event,'pass')"/>
		</view>
		<view class="user">
			<image src="../../../static/image/pay2.png" mode=""></image>
			<input type="password" value="" placeholder="请再次输入密码" @input="getText($event,'again_pass')"/>
		</view>
		<view class="btn" @click="submit()">
			提交
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
				again_pass:''
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
				}else if(name == 'again_pass'){
					that.again_pass = e.detail.value;
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
									uni.showToast({
										title: '发送成功，注意查收验证码！',
										icon: 'none'
									})
									// that.yzm = res.data.data;
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
						url:that.http+'net/setSafePass',
						header:that.header,
						data:{
							tel:that.tel,
							code:that.code,
							pass:that.pass,
							again_pass:that.again_pass
						},
						method:'POST',
						success: (res) => {
							if(res.data.code==200){
								uni.showToast({
									title:'设置安全密码成功!',
									icon:'none'
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
			}
		},
		// 自定义按钮点击事件
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({
					url:"../update/update"
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
		
	}
	.user {
		width: 670upx;
		height: 120upx;
		border-bottom: 1upx solid #ebebeb;
		margin: 0 auto;
		image {
			width: 36upx;
			height: 42upx;
			margin-top: 35upx;
		}

		input {
			width: 590upx;
			height: 120upx !important;
			float: right;
			display: inline-block;
		}
	}
	.user:nth-child(1){
		line-height:120upx;
		image{
			width:32upx;
			height:48upx;
		}
		input{
			width:400upx;
		}
		text{
			display: inline-block;
			width:152upx;
			height:58upx;
			font-size:24upx;
			margin-top:30upx;
			border-radius: 10upx;
			background: $colorOrange;
			color:white;
			line-height:58upx;
			text-align: center;
		}
	}
	.btn{
		width:100%;
		height:80upx;
		margin-top:150upx;
		line-height:80upx;
		text-align: center;
		color:white;
		border-radius: 50upx;
		background: $colorOrange;
	}
</style>
