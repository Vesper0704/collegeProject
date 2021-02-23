
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './permission';
import Argon from './plugins/argon-kit';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';

import ImageViewer from 'vue2-viewer';
Vue.use(ImageViewer);

Vue.use(BootstrapVue);
Vue.use(element);
Vue.config.productionTip = false;
Vue.use(Argon);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app'); //挂载 app
