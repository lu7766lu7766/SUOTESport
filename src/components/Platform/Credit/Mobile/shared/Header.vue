<template>
	<section>
		<nav id="sidebar">
			<a href="#sidebar" class="button plus">
				<img src="/resource/static/platform-credit-mobile/img/arrow_R.png">
			</a>
			<a id="menuClose" href="#" class="button minus">
				<img src="/resource/static/platform-credit-mobile/img/arrow_L.png">
			</a>
			<div class="sidebar-content">
				<div class="admin">
					<div class="admin-icon">
						<img src="/resource/static/platform-credit-mobile/img/admin.png">
					</div>
					<section v-if="isLogin">
						<div class="admin-user">{{ userID }}</div>
					</section>
				</div>
				<ul class="sidebar">
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<router-link :to="{ name: 'credit-mobile-news' }">最新公告</router-link>
					</li>
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<router-link :to="{ name: 'credit-mobile-faq' }">常見問題</router-link>
					</li>
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<a @click="menuClose(); checkLogin2Video()">影音平台</a>
					</li>
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<router-link :to="{ name: 'credit-mobile-about' }">關於我們</router-link>
					</li>
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<router-link :to="{ name: 'credit-mobile-privacy' }">隱私權政策</router-link>
					</li>
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<router-link :to="{ name: 'credit-mobile-dowonload-teach'}">
							APP下載
						</router-link>
					</li>
					<li>
						<i class="fa fa-square sidebar-icon"></i>
						<a @click="windowOpenNoStatus('//iwin0800.com')">備用網址</a>
					</li>
				</ul>
			</div>
		</nav>
		<div class="header">
			<div class="top">
				<router-link :to="{ name: 'credit-mobile-index' }">
					<img src="/resource/static/platform-credit-mobile/img/logo.png" class="logo">
				</router-link>
			</div>
			<div class="login">
				<ul>
					<section v-if="!isLogin">
						<li>
							<router-link :to="{ name: 'credit-mobile-login' }">
								<span class="icon-user"></span> 會員登錄</router-link>
						</li>
					</section>
					<section v-if="isLogin">
						<li>
							<router-link :to="{name: 'credit-mobile-message'}">
								站內訊息
								<span class="message" v-if="unRead">{{ unRead }}</span>
							</router-link>
							<a @click="logout">登出</a>
						</li>
					</section>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import Login from 'src/mixins/Platform/Login'
import UnRead from 'src/mixins/Platform/UnRead'
import Link from 'src/mixins/Platform/Link'

export default {
	mixins: [Login, UnRead, Link],
	methods: {
		menuClose2Route(route) {
			this.menuClose()
			if (route) {
				this.$router.push(route)
			}
		},
		menuClose() {
			document.getElementById('menuClose').click()
		}
	},
	computed: {
		search() {
			return location.search
		}
	},
	watch: {
		'$route.path'() {
			this.menuClose()
		}
	},
	mounted() {
		$.getScript('/resource/static/sport/js/jquery.min.js').then(() => {
			$.getScript('/resource/static/platform-cash/bootstrap/js/bootstrap.min.js')
		})
		this.$bus.on('close.menu', this.menuClose)
	},
	destroyed() {
		this.$bus.off('close.menu')
	}
}
</script>

<style scoped>
.logout {
	position: relative;
	top: 0;
	left: 0;
	color: #fff;
	text-align: right;
	display: block;
	margin-right: 5px;
}

.money {
	position: relative;
	top: 0px;
	right: 0;
	color: #ffff00;
	margin-right: 5px;
}

.login ul li {
	margin-top: -7px;
	text-align: left;
	display: inline-block;
	margin-left: 2px;
	vertical-align: top;
}
</style>
