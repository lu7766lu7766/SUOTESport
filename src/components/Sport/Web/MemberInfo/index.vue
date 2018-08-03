<template>
  <section style="width:100%">
    <div class="AD_box">
      <a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
    </div>
    <div class="BO_box">
      <h1 class="sports-news">{{ $t('memberInfo') }}</h1>
      <div class="member_s_box clearfix">
        <ul class="n_item">
          <!--<router-link :to="{ name: 'sport-game-setting' }" tag="li" active-class="active" exact>
            <a>{{ $t('baseInfo') }}</a>
          </router-link>-->
          <router-link :to="{ name: 'sport-game-setting' }" tag="li" active-class="active" exact>
            <a>{{ $t('gameSetting') }}</a>
            <!--/memberInfo/gameSetting-->
          </router-link>
          <router-link :to="{ name: 'sport-custom-currency' }" tag="li" active-class="active" exact>
            <a>{{ $t('customChips') }}</a>
          </router-link>
        </ul>

        <router-view transition="slide" class="member_content"></router-view>

      </div>
    </div>
  </section>
</template>


