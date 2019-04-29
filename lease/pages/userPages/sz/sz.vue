<template>
	<view class="content">
		<input type="number" placeholder="请输入原手机号" value="" @input="change($event,'old_tel')" style="font-size:15px;" />
		<input type="number" placeholder="请输入现手机号" value="" @input="change($event,'tel')" style="font-size:15px;" />
		<input type="password" placeholder="请输入安全密码" value="" @input="change($event,'aq')" style="font-size:15px;" />
		<view class="btnBlue" @click="submit()">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				old_tel: '',
				aq: ''
			};
		},
		onLoad(option) {
			this.tel = option.tel
		},
		methods: {
			// 获取用户输入的数据
			change(e, name) {
				var that = this;
				if (name == 'old_tel') {
					that.tel = e.detail.value;
				} else if (name == 'tel') {
					that.old_tel = e.detail.value;
				} else if (name == 'aq') {
					that.aq = e.detail.value;
				}
			},
			submit() {
				var that = this;
				if (that.tel == '' || that.old_tel == '' || that.aq == '') {
					uni.showToast({
						title: '请完善修改信息!',
						icon: 'none'
					})
				}else{
					// 修改电话
					uni.request({
						url: that.http + 'user/reTelphone',
						header: that.header,
						method: 'POST',
						data: {
							tel: that.old_tel,
							old_tel: that.tel,
							safe_pass: that.aq,
							user_id: uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(res)
							if (res.data.code == 200) {
								uni.showToast({
									title: '修改成功!',
									icon: 'none'
								})
							} else {
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
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		border-top: 2upx solid #eee;
		padding-top: 20upx;
	}

	input {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		border-bottom: 2upx solid #eee;
	}

	.btnBlue {
		margin-top: 100upx;
	}
</style>
