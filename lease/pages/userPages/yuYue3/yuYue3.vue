<template>
	<view class="content">
		<view class="box">
			<text>选择网点</text>
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="box">
			<text>预约安装日期</text>
			<view class="uni-list-cell-db">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
		<view class="box">
			<text>预约安装时间</text>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="price">需支付<text>{{info.huan_money}}元</text></view>
		<view class="btnBlue" @click="maskStatus=true">
			立即支付
		</view>
		<view class="mask" v-if="maskStatus">
			<view class="maskBox">
				<view class="title">选择支付方式</view>
				<view class="zhi" @click="num=1">
					<image src="../../../static/image/pay6.png" class="imageW" mode=""></image>
					<text>
						余额
					</text>
					<view :class="['boxW',num==1?'':'boxBorder']">
						<view :class="['boxN',num==1?'':'boxBg']"></view>
					</view>
				</view>
				<view class="zhi" @click="num=2">
					<image src="../../../static/image/wei.png" class="imageW" mode=""></image>
					<text>
						微信
					</text>
					<view :class="['boxW',num==2?'':'boxBorder']">
						<view :class="['boxN',num==2?'':'boxBg']"></view>
					</view>
				</view>
				<view class="zhi" @click="num=3">
					<image src="../../../static/image/zhi.png" mode=""></image>
					<text>
						支付宝
					</text>
					<view :class="['boxW',num==3?'':'boxBorder']">
						<view :class="['boxN',num==3?'':'boxBg']"></view>
					</view>
				</view>
				<view class="btn flexBox">
					<view data-id="1" @click="maskClick($event)">确定</view>
					<view data-id="2" @click="maskClick($event)">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				title: 'picker',
				// 网点信息
				info: '',
				// 网点名字
				array: [],
				// 电池id
				id: '',
				index: 0,
				date: getDate({
					format: true
				}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				time: '12:00',
				// 遮罩层数据
				maskStatus: false,
				num: 1,
			}
		},
		onLoad(option) {
			this.id = option.id
			// this.$store.state.dcId = option.id
			uni.setStorageSync('dcId',option.id)
			// console.log(this.$store.state.wdId,this.$store.state.dcId)
		},
		onShow() {
			var that = this;
			uni.request({
				url: that.http + 'order/getHnetList',
				header: that.header,
				method: 'POST',
				data: {
					dian_id: that.id
				},
				success: (result) => {
					uni.hideLoading()
					console.log(result)
					if (result.data.code == 200) {
						console.log(result.data.data)
						that.info = result.data.data
						for (var i of result.data.data.net_list) {
							that.array.push(i.name)
						}
					} else {
						uni.showToast({
							title: result.data.mes,
							icon: 'none'
						})
					}
				},
				fail() {
					uni.showToast({
						title: '请求网点信息失败，请刷新后重试!',
						icon: 'none'
					})
				}
			})
		},
		methods: {
			// 遮罩层确定和取消
			maskClick(e) {
				var that = this;
				// 存网点id
				var net_id = this.info.net_list[this.index].net_id
				// that.$store.state.wdId = net_id
				uni.setStorageSync('wdId',net_id)
				// 时间
				var yue_time = this.date + ' ' + this.time
				var id = e.currentTarget.dataset.id;
				if (id == 1) {
					// 确认支付
					that.maskStatus = !that.maskStatus;
					var arr = {
						type:3,		//换电池
						pay_type: 1, //余额支付
						money:this.info.huan_money,	//最后金额
						yue_time:yue_time	//预约时间
					}
					arr = JSON.stringify(arr)
					uni.navigateTo({
						url: '../pw/pw?arr=' + arr
					})
				} else if (id == 2) {
					that.maskStatus = !that.maskStatus;
				}
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				// console.log('日期' + e.target.value)
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				// console.log('时间' + e.target.value)
				this.time = e.target.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: #F5F5F5;
		border-top: 2upx solid #eee;
		padding: 0;
	}

	.box {
		background: #fff;
		display: flex;
		height: 84upx;
		line-height: 84upx;
		padding: 0 40upx;
		color: #999;
		font-size: 24upx;
		margin-top: 20upx;
		border-top: 2upx solid #eee;
		border-bottom: 2upx solid #eee;

		text:nth-child(1) {
			margin-right: 20upx;
			color: #333;
			font-size: 28upx;
		}
	}

	.price {
		padding: 0 40upx;
		margin-top: 40upx;

		text {
			color: #FF0000;
			margin-left: 20upx;
		}
	}

	picker {
		width: 400upx;
	}

	.btnBlue {
		width: 672upx;
		position: fixed;
		bottom: 100upx;
		margin: 0 40upx;
	}

	.mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
	}

	.maskBox {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 630upx;
		background: white;
		border-top-right-radius: 50upx;
		border-top-left-radius: 50upx;
		padding: 40upx 30upx;
		font-size: 32upx;
		color: #333;
		font-weight: bold;

		.title {
			text-align: center;
			margin-bottom: 40upx;
		}

		.zhi {
			margin-top: 30upx;
			padding-bottom: 30upx;
			border-bottom: 2upx solid #eee;
			line-height: 60upx;
		}

		.zhi image {
			width: 60upx;
			height: 60upx;
			float: left;
			margin-right: 24upx;
		}

		.boxW {
			width: 46upx;
			height: 46upx;
			float: right;
			border: 4upx solid $buttonBg;
			border-radius: 50%;
			margin-top: 10upx;
		}

		.boxN {
			width: 20upx;
			height: 20upx;
			margin: 10upx auto 0;
			background: $buttonBg;
			border-radius: 50%;
			position: relative;
			right: 1upx;
		}

		.btn {
			width: 74%;
			margin: 50upx auto 0;

			view {
				width: 242upx;
				height: 80upx;
				color: white;
				font-weight: normal;
				text-align: center;
				line-height: 80upx;
			}

			view:nth-child(1) {
				background: linear-gradient(180deg, rgba(255, 189, 97, 1) 0%, rgba(255, 134, 45, 1) 100%);
				border-radius: 10upx;
			}

			view:nth-child(2) {
				background: #a9a9a9;
				border-radius: 10upx;
			}
		}
	}

	.zhi>.boxBorder {
		border: 4upx solid #939393;
	}

	.zhi>view>.boxBg {
		background: white;
	}
</style>
