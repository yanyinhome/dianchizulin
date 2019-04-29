<template>
	<view class="content">
		<image src="../../../static/image/logo.png" mode=""></image>
		<view class="user">
			<image src="../../../static/image/user.png" mode=""></image>
			<input type="number" value="" placeholder="手机号" @input="getInfo($event,'tel')"/>
		</view>
		<view class="user">
			<image src="../../../static/image/pwd.png" mode=""></image>
			<input type="password" value="" placeholder="密码" @input="getInfo($event,'pass')"/>
		</view>
		<button type="primary" @click="login()">登录</button>
		<view class="reg flexBox">
			<navigator url="../register/register" hover-class="none">注册</navigator>
			<navigator url="../forget/forget" hover-class="none">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel:'',
				pass:''
			};
		},
		methods:{
			getInfo(e,name){
				var that = this;
				if(name == 'tel'){
					that.tel = e.detail.value;
				}else if(name == 'pass'){
					that.pass = e.detail.value;
				}
			},
			login(){
				var that = this;
				if(!(/^1[34578]\d{9}$/.test(that.tel))){
					uni.showToast({
						title:'手机号格式不正确！',
						icon:'none'
					})
				}else if(that.pass.length == 0){
					uni.showToast({
						title:'密码不能为空！',
						icon:'none'
					})
				}else{
					var clientid = plus.push.getClientInfo().clientid;
					uni.request({
						url:that.http+'user/login',
						header:that.header,
						method:'POST',
						data:{
							tel:that.tel,
							pass:that.pass,
							cid:clientid
						},
						success: (res) => {
							console.log(clientid)
							if(res.data.code==200){
								uni.showToast({
									title:'登录成功！',
									icon:'none'
								})
								uni.setStorageSync('token',res.data.data.user_id);
								uni.reLaunch({
									url:'../../index/index'
								})
							}else{
								uni.showToast({
									title:res.data.mes,
									icon:'none'
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
		margin: 0 auto 40upx;

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
	uni-button{
		height:80upx;
		line-height: 80upx;
		background: $buttonBg;
		margin:80upx 0 40upx;
		font-size:28upx;
	}
	.reg{
		color:$buttonBg;
		margin-top:20upx;
	}
</style>
