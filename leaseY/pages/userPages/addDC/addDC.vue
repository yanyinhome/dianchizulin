<template>
	<view class="content">
		<view class="box">
			<text>电池名称:</text>
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="box">
			<text>电池数量:</text>
			<view class="box2">
				<text @click="add('jian')">-</text>
				<input type="number" disabled :value="num" />
				<text @click="add('add')">+</text>
			</view>
		</view>
		<view class="btnBlue" @click="submit()">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:1,
				title: 'picker',
				// 网点信息
				info: '',
				// 网点名字
				array: [],
				index:0,
			}
		},
		onShow() {
			var that = this;
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url: that.http + 'net/getDianList',
				header: that.header,
				method: 'POST',
				data: {
					net_id: uni.getStorageSync('tokenW')
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res)
					if (res.data.code == 200) {
						that.info = res.data.data
						console.log(that.info)
						for (var i of res.data.data) {
							that.array.push(i.name)
						}
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
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			add(str){
				if(str=='add'){
					this.num = this.num+1
				}else{
					if(this.num != 1){
						this.num = this.num-1
					}
				}
			},
			submit(){
				var that = this;
				uni.request({
					url: that.http + 'net/setDc',
					header: that.header,
					method: 'POST',
					data: {
						dc_id:that.info[that.index].dc_id,
						dc_number:that.num,
						net_id: uni.getStorageSync('tokenW')
					},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if (res.data.code == 200) {
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},1500)
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
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
	}
	.box{
		width:100%;
		height:100upx;
		line-height:100upx;
		display: flex;
		border-bottom:2upx solid #eee;
		input{
			width:500upx;
			height:100upx;
			line-height: 100upx;
		}
		text:nth-child(1){
			margin-right:20upx;
		}
	}
	picker {
		width: 400upx;
	}
	.box2{
		display: flex;
		text{
			width:60upx;
			height:60upx;
			text-align: center;
			line-height: 60upx;
			border:2upx solid #999;
			margin-top:20upx;
		}
		input{
			width:60upx;
			height:60upx;
			line-height: 60upx;
			margin-top:20upx;
			text-align: center;
			border:2upx solid #999;
		}
	}
	.box2>text:nth-child(1){
		margin-right:0;
		border-right:none;
	}
	.box2>text:nth-child(3){
		margin-right:0;
		border-left:none;
	}
	.btnBlue{
		margin-top:200upx;
	}
</style>
