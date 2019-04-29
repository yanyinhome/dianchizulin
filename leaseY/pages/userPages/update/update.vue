<template>
	<view class="content">
		<view class="box flexBox">
			<text>原密码</text>
			<input type="number" placeholder="请输入旧密码" value="" @input="getText($event,'old_pass')"/>
		</view>
		<view class="box flexBox">
			<text>新密码</text>
			<input type="password" placeholder="请输入新密码" value="" @input="getText($event,'new_pass')"/>
		</view>
		<view class="box flexBox">
			<text>确认密码</text>
			<input type="password" placeholder="请在此确定新密码" value="" @input="getText($event,'again_pass')"/>
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
					// 用户输入的信息
					old_pass: '',
					new_pass: '',
					again_pass:''
				};
			},
			methods: {
				// 获取用户输入的数据
				getText(e, name) {
					var that = this;
					if (name == 'old_pass') {
						that.old_pass = e.detail.value;
					} else if (name == 'new_pass') {
						that.new_pass = e.detail.value;
					}else if(name == 'again_pass'){
						that.again_pass = e.detail.value;
					}
				},
				// 提交注册信息
				submit(){
					var that = this;
					if(that.old_pass.length<3){
						uni.showToast({
							title:'旧密码!',
							icon:'none'
						})
					}else if(that.new_pass == 0 ){
						uni.showToast({
							title:'新密码不能为空!',
							icon:'none'
						})			
					}else if(that.new_pass!=that.again_pass){
						uni.showToast({
							title:'两次密码不一致！',
							icon:'none'
						})
					}else{
						uni.request({
							url:that.http+'net/changeSafePass',
							header:that.header,
							data:{
								old_pass:that.old_pass,
								new_pass:that.new_pass,
								again_pass:that.again_pass,
								user_id:uni.getStorageSync('tokenW')
							},
							method:'POST',
							success: (res) => {
								if(res.data.code==200){
									uni.showToast({
										title:'修改安全密码成功!',
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
		}
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
	}
	.box{
		width:100%;
		height:100upx;
		line-height:100upx;
		border-bottom:2upx solid #eee;
		input{
			width:300upx;
			height:100upx;
			text-align: right;
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
