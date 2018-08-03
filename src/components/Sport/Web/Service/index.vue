<template>
  <div class="BO_box">
    <h1 class="sports-news">{{ $t('serviceCenter') }}</h1>

    <div class="member_s_box clearfix">
      <ul class="n_item">
        <router-link active-class="active" exact :to="{ name: 'sport-website-protocol' }" tag="li">
          <a>{{ $t('websiteProtocol') }}</a>
        </router-link>
      </ul>

      <router-view class="member_content"></router-view>
      <p></p>
    </div>
  </div>
</template>
