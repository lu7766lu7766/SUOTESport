<template>
  <section>
    <section>
      <section class="grid-container section points-transfer-landing">
        <div class="points-transfer-landing-intro">
          <h2 class="points-transfer-landing-intro-title">
            交易記錄
          </h2>
        </div>
      </section>
    </section>
    <div id="content" class="clearfix">
      <div id="rightContent" class="right-content">
        <div id="wrapper">
          <div class="w-currency">
            <div class="c-line clearfix">
              <div class="cl-wrap c-full">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

