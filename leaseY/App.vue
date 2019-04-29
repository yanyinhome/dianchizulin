<script>
	export default {
		data(){
			return{
			}
		},
		onLaunch: function () {
			// 全局只触发一次
			var that = this;
			// 获取设备高度
			uni.getSystemInfo({
				success: function (res) {
					uni.setStorageSync('infoHeight', res.windowHeight+'px');
					uni.setStorageSync('infoWidth', res.windowWidth+'px');
				}
			});
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.content{
		padding:0 40upx;
		box-sizing: border-box;
		font-size:28upx;
	}
	view,cover-view{
		box-sizing: border-box;
	}
	// 弹性布局
	.flexBox{
		display: flex;
		justify-content: space-between;
	}
	input{
		width:0upx;
		height:0upx;
	}
	.btnBlue{
		width:100%;
		height:80upx;
		text-align: center;
		line-height:80upx;
		color:white;
		background: $buttonBg;
		border-radius: 10upx;
	}
</style>
