<template>
	<view class="content">
		<scroll-view scroll-y="true">
			<view class="card" v-for="(item,index) in dc" :key="index" @click='status=item.id'>
				<image :src="status==item.id?'../../../static/image/check.png':''" mode="" :class="status==item.id?'box':''"></image>
				<image :src="item.img_src" mode="" @click='status=index'></image>
				<view class="title" @click='status=index'>
					<view @click='status=index'>{{item.name}}</view>
					<view @click='status=index'>押金<text>￥{{item.ya_money}}</text></view>
					<navigator :url="'../proDetail/proDetail?id='+item.id" hover-class="none">查看详情</navigator>
				</view>
			</view>
		</scroll-view>
		<view @click="next()">下一步</view>
	</view>
</template>

<script>
	// import {wdId} from 'vuex';
	export default {
		data() {
			return {
				dc:'',
				dc_id:'',
				status:0
			};
		},
		onLoad(option) {
			var that = this;
			// 存网点id
			uni.setStorageSync('wdId',option.id)
			// that.$store.state.wdId = option.id
			uni.request({
				url:that.http+'index/getDcList',
				method:'POST',
				header:that.header,
				data:{
					net_id:option.id
				},
				success: (res) => {
					console.log(res)
					if(res.data.code==200){
						that.dc = res.data.data
						that.status = res.data.data[0].id
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
		},
		methods:{
			next(){
				var that = this;
				if(that.dc.length <1){
					uni.showToast({
						title:'无法进入下一步!',
						icon:'none'
					})
				}else{
					// 先判断是否实名
					uni.request({
						url:that.http+'index/ifIdcard',
						method:'POST',
						header:that.header,
						data:{
							user_id:uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(res)
							if(res.data.data==1){
								uni.navigateTo({
									url:'../yuYue2/yuYue2?id='+that.status
								})
							}else{
								console.log(2)
								uni.navigateTo({
									url:'../realName/realName'
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

<style lang="scss" scoped>
	.content{
		width:100%;
		min-height:100vh;
		background:#f5f5f5;
		border-top:2upx solid #eee;
	}
	scroll-view{
		height:1000upx;
	}
	.card{
		background:#fff;
		width:100%;
		display: flex;
		border-radius: 10upx;
		padding:30upx 20upx;
		margin-top:30upx;
		.box{
			border:none;
		}
		image:nth-child(1){
			width:30upx;
			height:30upx;
			border-radius: 50%;
			margin-top:50upx;
			box-sizing: border-box;
		}
		image{
			width:140upx;
			height:140upx;
			border: 2upx solid #dedede;
			margin-right:20upx;
			box-sizing: border-box;
		}
	}
	.title{
		view:nth-child(1){
			width:410upx;
			overflow: hidden;/*超出部分隐藏*/
			text-overflow:ellipsis;/* 超出部分显示省略号 */
			white-space: nowrap;/*规定段落中的文本不进行换行 */
		}
		view:nth-child(2){
			color:#666;
			margin-top:10upx;
			text{
				color:$colorOrange;
				margin-left:20upx;
			}
		}
		navigator:nth-child(3){
			width:200upx;
			margin-top:10upx;
			color:$buttonBg;
		}
	}
	.content>view:last-child{
		width:672upx;
		height:80upx;
		position: fixed;
		bottom:100upx;
		color:white;
		background:$buttonBg;
		line-height:80upx;
		text-align: center;
	}
</style>
