import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
// 挂载Vuex

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		wdId:'',
		dcId:''
	}
})

Vue.prototype.$store = store

Vue.config.productionTip = false

// 域名信息
Vue.prototype.http = 'http://houtai3.cadhx.com/api/'
Vue.prototype.header = {
	'content-type':'application/x-www-form-urlencoded'
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
