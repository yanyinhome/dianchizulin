<template>
	<view class="content">
		<image src="../../../static/image/banner.png" mode=""></image>
		<navigator v-for="(item,index) in list" :key="index" :url="'../noticeDetail/noticeDetail?id='+item.id" hover-class="none" class="card flexBox" >
			<view class="box" >
				<view class="title">
					{{item.title}}
				</view>
				<text>{{item.add_time}}</text>
			</view>
			<image :src="item.img_src" mode=""></image>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:''
			};
		},
		onLoad() {
			var that = this;
			uni.request({
				url: that.http + 'index/getNewsList',
				header: that.header,
				method: 'POST',
				data: {
					cate:1
				},
				success: (res) => {
					uni.hideLoading()
					console.log(res)
					for(var i in res.data.data){
						var str = new Date(parseInt(res.data.data[i].add_time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
						res.data.data[i].add_time = str
					}
					that.list = res.data.data
				},
				fail() {
					uni.showToast({
						title:'网络延迟，请刷新后重试!'
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		border-top:2upx solid #eee;
	}
	.content>image{
		width:100%;
		height:276upx;
		margin:40upx 0 20upx;
	}
	.card{
		border-bottom:2upx solid #eee;
		padding-bottom:30upx;
		margin-top:30upx;
		.box{
			width:436upx;
			.title{
				margin-bottom:40upx;
				text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 2;
				  line-clamp: 2;
				  -webkit-box-orient: vertical;
			}
			text{
				color:#999;
			}
		}
		image{
			width:218upx;
			height:152upx;
			background:#666666;
		}
	}
</style>
