<template>
    <div id="app">
        <div class="page-container join">
            <div class="container">
                <div class="col-md-8 col-md-offset-2 form-horizontal member_form">
                    <div class="reg_title">
                        <span>會員條款</span>
                    </div>

                    <div class="form-group">

                        <div class="col-md-12 p-box">
                            <h3>皇璽會娛樂城會員條款 </h3>

                            <p>歡迎您加入【皇璽會娛樂城】會員並使用【皇璽會娛樂城】所提供之各項會員服務。為保障您的權益，請詳細閱讀本服 務條款所有內容，尤其當您在勾選「同意會員條款」，並註冊完成或開始使用本服務時，即視為您已經詳細閱讀、了解 本服務條款，並同意遵守以下服務條款之約定。

                                <p>一、遵守會員規範及法律規定：您了解您註冊成為會員後，即可使用【皇璽會娛樂城】所提供之各項服務(以下稱本服務)。當會員使用本服務時，即 表 示除了同意遵守本服務條款外，還同意接受【皇璽會娛樂城】對【皇璽會娛樂城】會員規範（包括遊戲規則、公告及注意事 項等）及相關法令規定之拘束。</p>

                                <p>二、服務簡介： （一）本平台為遊戲點數交易平台，僅提供遊戲點數交易；會員如因遊戲產生點數增減或任何不法情事，純屬會員個人 之行為，與本平台無關。 （二）接受本服務之會員必須自行配備上網所需之各項電腦設備，並負擔包括但不限「網際網路連線費用」、「電話費 用」等之電信相關費用。 </p>
                        </div>

                    </div>
                    <div class="form-group">

                        <div class="checkbox">
                            <label><input v-model="checkLaw" type="checkbox" value="true"> 確定本人已滿18歲，且在本網站的所有活動，並沒有抵觸本人所在國家之法律本人也同意並接受上述各項 條款與隱私權聲明。
                            </label>
                        </div>

                    </div>
                    <div class="form-group">
                        <button :disabled="!checkLaw" @click="checkLaw ? $router.push({name: 'cash-register-step1'}): ''" class="btn submit_btn">確定註冊
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
  <script>
export default {
	name: '',
	data: () => ({
		checkLaw: false
	})
}
</script>
  
  <style scoped>

</style>