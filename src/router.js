import Vue from 'vue';
import Router from 'vue-router';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';
import Components from './views/Components.vue';
import Landing from './views/Landing.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import PublishArticle from './views/PublishArticle.vue';

import profileHomepage from './views/components/profileHomepage.vue';
import editProfile from './views/components/editProfile.vue';
import MessagesComponent from './views/components/Messages.vue';
import Article from './views/components/Article.vue';
import UploadImage from './views/components/uploadImage.vue';
import EditImage from './views/components/EditImage.vue';
import AssetTransfer from './views/components/AssetTransfer.vue';
import Admin from './views/Admin.vue'
import changePassword from "@/views/changePassword";
import checkAcc from "@/views/checkAcc";
import SearchAsset from "@/views/SearchAsset";
import ShowPic from "@/views/ShowPic";
import ViolationTest from "@/views/ViolationTest";
import TransQuery from "@/views/components/TransQuery";
/*
定义路由
 */
Vue.use(Router);

export default new Router({
	linkExactActiveClass: 'active',
	mode: 'history',
	routes: [
		{
			path: '/', //根路径
			name: 'components',
			components: {
				header: AppHeader,
				default: Components,
				footer: AppFooter,
			},
		},
		{
			path: '/landing',
			name: 'landing',
			components: {
				header: AppHeader,
				default: Landing,
				footer: AppFooter,
			},
		},
		{
			path: '/login',
			name: 'login',
			components: {
				header: AppHeader,
				default: Login,
				footer: AppFooter,
			},
		},
		{
			path:'/admin',
			name:Admin,
			components:{
				Admin
			}

		},
		{
			path: '/register',
			name: 'register',
			components: {
				header: AppHeader,
				default: Register,
				footer: AppFooter,
			},
		},
		{
			path:'/violation',
			name:'violation',
			components:{
				header:AppHeader,
				default:ViolationTest,
				footer:AppFooter
			}
		},
		{
			path: '/checkAcc',
			name: 'checkAcc',
			components: {
				header: AppHeader,
				default: checkAcc,
				footer: AppFooter,
			},
		},
		{
			path: '/changePassword',
			name: 'changePassword',
			components: {
				header: AppHeader,
				default:changePassword,
				footer: AppFooter,
			},
		},
		{
			path: '/TransQuery',
			name: 'TransQuery',
			components:{
				header:AppHeader,
				default: TransQuery,
				footer: AppFooter
			}
		},
		{
			path:'/search',
			name: 'search',
			components: {
				header: AppHeader,
				default: SearchAsset,
				footer: AppFooter
			},
		},
		{
			path:'/ShowPic',
			name: 'ShowPic',
			components: {
				header: AppHeader,
				default: ShowPic,
				footer: AppFooter
			},
		},
		{
			path: '/editarticle',
			name: 'editarticle',
			components: {
				header: AppHeader,
				default: PublishArticle,
				footer: AppFooter,
			},
		},
		{
			path: '/profile',
			components: {
				header: AppHeader,
				default: Profile,
				footer: AppFooter,
			},
			children: [
				{
					path: '',
					name: 'profilehome',
					components: {
						default: profileHomepage,
					},
				},
				{
					path: 'editProfile',
					name: 'edit',
					components: {
						default: editProfile,
					},
				},
				{
					path: 'messages',
					name: 'message',
					components: {
						default: MessagesComponent,
					},
				},
				{
					path: 'article/:id',
					name: 'article',
					components: {
						default: Article,
					},
				},
				{
					path: 'image/:id',
					name: 'imageEditing',
					components:
					{
						default: EditImage,
					},
				},
				{
					path: 'uploadImage',
					name: 'uploadImage',
					components: {
						default: UploadImage,
					},
				},
				{
					path: 'assetTransfer',
					name: 'assetTransfer',
					components: {
						default: AssetTransfer,
					},
				}
			],
		},
	],
	scrollBehavior: (to) => {
		if (to.hash) {
			return { selector: to.hash };
		} else {
			return { x: 0, y: 0 };  //页面滚到顶部
		}
	},
});
