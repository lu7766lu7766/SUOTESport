<template>
  <nav class="push-sidebar hidden" id="sidebar-left">
    <ul class="nav nav-pills nav-stacked sidebar">
      <!-- Right sidebar header -->
      <!-- <router-link tag="li" v-if="!isLogin" :to="{ name: 'sport-mobile-login' }" active-class="active" exact>
        <a><i></i>登入</a>
      </router-link> -->
      <!-- Main links -->
      <router-link tag="li" :to="{ name: 'sport-mobile-news' }" active-class="active">
        <a>
          <i></i>{{ $t('news') }}</a>
      </router-link>
      <router-link tag="li" :to="{ name: 'sport-mobile-bet-detail' }" active-class="active">
        <a>
          <i></i>{{ $t('betDetail') }}</a>
      </router-link>
      <router-link tag="li" :to="{ name: 'sport-mobile-game-results' }" active-class="active">
        <a>
          <i></i>{{ $t('gameResults') }}</a>
      </router-link>
      <router-link tag="li" :to="{ name: 'sport-mobile-custom-currency' }" active-class="active">
        <a>
          <i></i>{{ $t('betSetting') }}</a>
      </router-link>
      <router-link tag="li" :to="{ name: 'sport-mobile-game-setting' }" active-class="active">
        <a>
          <i></i>{{ $t('gameSetting') }}</a>
      </router-link>
      <router-link tag="li" :to="{ name: 'sport-mobile-service-rule' }" active-class="active">
        <a>
          <i></i>{{ $t('rules') }}</a>
      </router-link>
      <router-link tag="li" :to="{ name: 'sport-mobile-service-relate' }" active-class="active">
        <a>
          <i></i>{{ $t('relateWebsite') }}</a>
      </router-link>
      <router-link tag="li" :to="$platformHost()">
        <a>
          <i></i>返回娛樂城</a>
      </router-link>

      <!-- <li>
        <a href="language.html">
          <i></i>語言
        </a>
      </li> -->
      <!-- <li>
        <a v-if="isLogin" @click="mLogout">
          <i></i>登出
        </a>
      </li> -->
    </ul>
  </nav>
</template>
