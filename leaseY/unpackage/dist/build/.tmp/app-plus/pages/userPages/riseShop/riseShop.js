(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userPages/riseShop/riseShop"],{"392d":function(t,e,a){},"5bf2":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"content"},[a("view",{staticClass:"box1"},[t._m(0),a("view",{staticClass:"card"},[a("text",[t._v("姓名:")]),a("input",{attrs:{type:"text",value:"",disabled:"",placeholder:t.shang.link_name,"placeholder-style":"color:#999;"}})]),a("view",{staticClass:"card"},[a("text",[t._v("联系方式:")]),a("input",{attrs:{type:"number",value:"",disabled:"",placeholder:t.shang.link_tel,"placeholder-style":"color:#999;"}})]),a("view",{staticClass:"card"},[a("text",[t._v("地址:")]),a("input",{attrs:{type:"text",value:"",disabled:"",placeholder:t.shang.address,"placeholder-style":"color:#999;"}})])]),a("view",{staticClass:"box1"},[t._m(1),a("view",{staticClass:"card"},[a("text",[t._v("网点名称:")]),a("input",{attrs:{type:"text",value:"",placeholder:t.info.name,"placeholder-style":"color:#999;",eventid:"48681eb0-0"},on:{input:function(e){t.getInfo(e,"name")}}})]),a("view",{staticClass:"card"},[a("text",[t._v("网点地址:")]),a("input",{attrs:{type:"text",value:"",placeholder:t.info.map_address,"placeholder-style":"color:#999;",eventid:"48681eb0-1"},on:{input:function(e){t.getInfo(e,"address")}}})]),a("view",{staticClass:"card"},[a("text",[t._v("联系人:")]),a("input",{attrs:{type:"text",value:"",placeholder:t.info.link_name,"placeholder-style":"color:#999;",eventid:"48681eb0-2"},on:{input:function(e){t.getInfo(e,"link_name")}}})]),a("view",{staticClass:"card"},[a("text",[t._v("联系方式:")]),a("input",{attrs:{type:"number",value:"",placeholder:t.info.link_tel,"placeholder-style":"color:#999;",eventid:"48681eb0-3"},on:{input:function(e){t.getInfo(e,"link_tel")}}})])]),a("view",{staticClass:"box2"},[t._m(2),a("image",{attrs:{src:""==t.src.length?"../../../static/image/upload.png":t.src,mode:"",eventid:"48681eb0-4"},on:{click:function(e){t.uploadImg()}}}),a("view",{staticClass:"btn",attrs:{eventid:"48681eb0-5"},on:{click:function(e){t.submit()}}},[t._v("保存")])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"title"},[a("text"),a("text",[t._v("隶属运营中心")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"title"},[a("text"),a("text",[t._v("店铺信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"title"},[a("text"),a("text",[t._v("门头照片上传")])])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},a2ee:function(t,e,a){"use strict";a("5c69");var n=s(a("b0ce")),i=s(a("d97f"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},c32b:function(t,e,a){"use strict";a.r(e);var n=a("c88f"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},c88f:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{info:"",shang:"",name:"",map_address:"",link_name:"",link_tel:"",src:"",id:""}},onLoad:function(){var e=this;t.request({url:e.http+"net/getNetInfo",header:e.header,data:{net_id:t.getStorageSync("tokenW")},method:"POST",success:function(t){console.log(t),200==t.data.code&&(t.data.data.link_tel=t.data.data.link_tel.toString(),e.info=t.data.data,e.src=t.data.data.head_src,e.name=t.data.data.name,e.link_name=t.data.data.link_name,e.link_tel=t.data.data.link_tel,e.map_address=t.data.data.map_address,e.id=t.data.data.head_photo)},fail:function(){t.showToast({title:"网络延迟，请刷新后重试！",icon:"none"})}}),t.request({url:e.http+"net/getOperator",header:e.header,data:{net_id:t.getStorageSync("tokenW")},method:"POST",success:function(t){console.log(t),200==t.data.code&&(t.data.data.link_tel=t.data.data.link_tel.toString(),e.shang=t.data.data)},fail:function(){t.showToast({title:"网络延迟，请刷新后重试！",icon:"none"})}})},methods:{getInfo:function(t,e){var a=this;"name"==e?a.name=t.detail.value:"address"==e?a.map_address=t.detail.value:"link_name"==e?a.link_name=t.detail.value:"link_tel"==e&&(a.link_tel=t.detail.value)},submit:function(){var e=this;""==e.name||""==e.map_address||""==e.link_name||""==e.link_tel||""==e.id?t.showToast({title:"请完善网点信息!",icon:"none"}):t.request({url:this.http+"net/setNetInfo",method:"POST",header:this.header,data:{net_id:t.getStorageSync("tokenW"),name:this.name,map_address:this.map_address,link_name:this.link_name,link_tel:this.link_tel,head_photo:this.id},success:function(e){e.data.code,t.showToast({title:e.data.data,icon:"none"})}})},uploadImg:function(){var e=this;t.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:function(a){t.showLoading({title:"上传中..."}),plus.zip.compressImage({src:a.tempFilePaths[0],dst:"_doc/a.jpg",overwrite:!0,format:"jpg",quality:100},function(a){var n=new plus.io.FileReader;n.onloadend=function(a){var n=a.target.result;t.request({url:e.http+"index/imgupload",header:e.header,method:"POST",data:{file:n},success:function(a){t.hideLoading(),200==a.data.code?(e.src=a.data.path,e.id=a.data.id):t.showToast({title:a.data.info,icon:"none"})},fail:function(){t.showToast({title:"上传时网络延迟，请刷新后重试!",icon:"none"})}})},n.readAsDataURL(a.target)},function(t){plus.nativeUI.alert("未知错误！",function(){})})},fail:function(){t.showToast({title:"打开相册失败，请重试！",icon:"none"})}})}}};e.default=a}).call(this,a("6e42")["default"])},d50c:function(t,e,a){"use strict";var n=a("392d"),i=a.n(n);i.a},d97f:function(t,e,a){"use strict";a.r(e);var n=a("5bf2"),i=a("c32b");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("d50c");var o=a("2877"),l=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"f2a2b70a",null);e["default"]=l.exports}},[["a2ee","common/runtime","common/vendor"]]]);