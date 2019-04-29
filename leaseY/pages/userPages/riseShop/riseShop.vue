<template>
	<view class="content">
		<view class="box1">
			<view class="title">
				<text></text>
				<text>隶属运营中心</text>
			</view>
			<view class="card">
				<text>姓名:</text>
				<input type="text" value="" disabled :placeholder="shang.link_name" placeholder-style="color:#999;"/>
			</view>
			<view class="card">
				<text>联系方式:</text>
				<input type="number" value="" disabled :placeholder="shang.link_tel" placeholder-style="color:#999;"/>
			</view>
			<view class="card">
				<text>地址:</text>
				<input type="text" value="" disabled :placeholder="shang.link_address" placeholder-style="color:#999;"/>
			</view>
		</view>
		<view class="box1">
			<view class="title">
				<text></text>
				<text>店铺信息</text>
			</view>
			<view class="card">
				<text>网点名称:</text>
				<input type="text" value="" :placeholder="info.name" placeholder-style="color:#999;" @input="getInfo($event,'name')"/>
			</view>
			<view class="card">
				<text>网点地址:</text>
				<input type="text" value="" :placeholder="info.map_address" placeholder-style="color:#999;" @input="getInfo($event,'address')"/>
			</view>
			<view class="card">
				<text>联系人:</text>
				<input type="text" value="" :placeholder="info.link_name" placeholder-style="color:#999;" @input="getInfo($event,'link_name')"/>
			</view>
			<view class="card">
				<text>联系方式:</text>
				<input type="number" value="" :placeholder="info.link_tel" placeholder-style="color:#999;" @input="getInfo($event,'link_tel')"/>
			</view>
		</view>
		<view class="box2">
			<view class="title">
				<text></text>
				<text>门头照片上传</text>
			</view>
			<image :src="src.length==''?'../../../static/image/upload.png':src" mode="" @click="uploadImg()"></image>
			<view class="btn" @click="submit()">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 店铺原信息
				info:'',
				// 上级信息
				shang:'',
				name:'',
				map_address:'',
				link_name:'',
				link_tel:'',
				src:'',
				id:'',	//照片id
			};
		},
		onLoad() {
			var that = this;
			// 店铺信息
			uni.request({
				url: that.http + 'net/getNetInfo',
				header: that.header,
				data: {
					net_id: uni.getStorageSync('tokenW')
				},
				method: 'POST',
				success: (res) => {
					console.log(res);
					if (res.data.code == 200) {
						res.data.data.link_tel = res.data.data.link_tel.toString()
						that.info = res.data.data;
						that.src=res.data.data.head_src
						that.name = res.data.data.name
						that.link_name = res.data.data.link_name
						that.link_tel = res.data.data.link_tel
						that.map_address = res.data.data.map_address
						that.id = res.data.data.head_photo
					}
				},
				fail() {
					uni.showToast({
						title: '网络延迟，请刷新后重试！',
						icon: 'none'
					})
				}
			})
			// 上级信息
			uni.request({
				url: that.http + 'net/getOperator',
				header: that.header,
				data: {
					net_id: uni.getStorageSync('tokenW')
				},
				method: 'POST',
				success: (res) => {
					console.log(res);
					if (res.data.code == 200) {
						res.data.data.link_tel = res.data.data.link_tel.toString()
						that.shang = res.data.data;
					}
				},
				fail() {
					uni.showToast({
						title: '网络延迟，请刷新后重试！',
						icon: 'none'
					})
				}
			})
		},
		methods:{
			getInfo(e,str){
				var that = this;
				if(str=='name'){
					that.name = e.detail.value
				}else if(str == 'address'){
					that.map_address = e.detail.value
				}else if(str == 'link_name'){
					that.link_name = e.detail.value
				}else if(str == 'link_tel'){
					that.link_tel = e.detail.value
				}
			},
			// 提交信息
			submit(){
				var that = this;
				if(that.name==''||that.map_address==''||that.link_name==''||that.link_tel==''||that.id==''){
					uni.showToast({
						title:'请完善网点信息!',
						icon:'none'
					})
				}else{
					uni.request({
						url:this.http+'net/setNetInfo',
						method:'POST',
						header:this.header,
						data:{
							net_id:uni.getStorageSync('tokenW'),
							name:this.name,
							map_address:this.map_address,
							link_name:this.link_name,
							link_tel:this.link_tel,
							head_photo:this.id
						},
						success: (res) => {
							if(res.data.code==200){
								uni.showToast({
									title:res.data.data,
									icon:'none'
								})
							}else{
								uni.showToast({
									title:res.data.data,
									icon:'none'
								})
							}
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

<style lang="scss" scoped>
	.content{
		min-height: 100vh;
		background: #F6F6F6;
		padding:0;
		border-top:2upx solid #eee;
	}
	.title{
		height:120upx;
		line-height: 120upx;
		text-align: left;
		font-size: 34upx;
		text:nth-child(1){
			border-left:6upx solid $buttonBg;
			margin-right:20upx;
		}
	}
	.box1,.box2{
		width:100%;
		background: #fff;
		padding:0 40upx;
		margin-top:20upx;
	}
	.box2{
		background: none;
		margin:0;
		text-align: center;
	}
	.card{
		display: flex;
		width:white;
		justify-content: space-between;
		height:100upx;
		line-height: 100upx;
		border-bottom:2upx solid #eee;
		input{
			width:520upx;
			height:100upx;
		}
	}
	image{
		width:500upx;
		height:298upx;
	}
	.btn{
		width:100%;
		height:80upx;
		line-height:80upx;
		text-align:center;
		color:white;
		background:$buttonBg;
		border-radius: 10upx;
		margin:100upx 0;
	}
</style>
