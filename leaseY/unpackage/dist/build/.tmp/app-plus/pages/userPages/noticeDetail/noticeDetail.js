(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userPages/noticeDetail/noticeDetail"],{2216:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content"},[n("rich-text",{attrs:{nodes:t.string,mpcomid:"0ac79be8-0"}})],1)},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},"52af":function(t,e,n){"use strict";n.r(e);var a=n("2216"),u=n("591c");for(var c in u)"default"!==c&&function(t){n.d(e,t,function(){return u[t]})}(c);n("c3f6");var i=n("2877"),r=Object(i["a"])(u["default"],a["a"],a["b"],!1,null,"dfb2df44",null);e["default"]=r.exports},"591c":function(t,e,n){"use strict";n.r(e);var a=n("f0f1"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);e["default"]=u.a},c3f6:function(t,e,n){"use strict";var a=n("cb4e"),u=n.n(a);u.a},cb4e:function(t,e,n){},dae8:function(t,e,n){"use strict";n("5c69");var a=c(n("b0ce")),u=c(n("52af"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(u.default))},f0f1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{string:""}},onLoad:function(e){var n=this;t.request({url:n.http+"index/getNewInfo",header:n.header,method:"POST",data:{new_id:e.id},success:function(e){t.hideLoading(),n.string=e.data.data.content},fail:function(){t.showToast({title:"网络延迟，请刷新后重试!"})}})}};e.default=n}).call(this,n("6e42")["default"])}},[["dae8","common/runtime","common/vendor"]]]);