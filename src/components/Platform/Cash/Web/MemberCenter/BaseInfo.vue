<template>
  <div class="col-md-9 col-md-offset-1 form-horizontal member_form">
    <div class="member_title clearfix">
      <span>個人資料</span>

      <ul id="myTab" class="nav nav-tabs tab_list pull-right">
        <li :class="{ active: $route.query.s != 'bank' }">
          <a href="#tab1" data-toggle="tab" aria-expanded="true">基本設定</a>
        </li>
        <li class="clearfix" :class="{ active: $route.query.s == 'bank' }">
          <a href="#tab2" data-toggle="tab" aria-expanded="false">銀行資訊</a>
        </li>
      </ul>
    </div>
    <div id="myTabContent" class="tab-content" v-if="userInfo.account">

      <div class="tab-pane fade" :class="{ active: $route.query.s != 'bank', in: $route.query.s != 'bank' }" id="tab1">
        <div class="form-group">
          <label for="userId" class="col-md-2 col-md-offset-1 control-label clearfix">會員暱稱</label>

          <div class="col-md-9">
            <input type="text" v-model="info.p33_ant_profile_name" value="暱稱" class="form-control2" id="userName" placeholder="(6~15碼英文數字組合)">
          </div>
        </div>

        <div class="form-group">
          <label for="userId" class="col-md-2 col-md-offset-1 control-label">會員帳號</label>

          <div class="col-md-9">
            <input type="text" v-model="info.account" class="form-control2" id="userId" placeholder="(6~15碼英文數字組合)" disabled>

          </div>
        </div>
        <div class="form-group">
          <label for="pwd" class="col-md-2 col-md-offset-1 control-label">舊密碼</label>
          <div class="col-md-9">
            <input type="password" v-model="info.old_passwd" class="form-control2" id="pwd" placeholder="(6~15碼英文數字組合)">
          </div>
        </div>
        <div class="form-group">
          <label for="pwd" class="col-md-2 col-md-offset-1 control-label">新密碼</label>

          <div class="col-md-9">
            <input type="password" v-model="info.p33_ant_passwd" class="form-control2" id="pwdConfirm" placeholder="(6~15碼英文數字組合)">

          </div>
        </div>
        <div class="form-group">
          <label for="check_pwd" class="col-md-2 col-md-offset-1 control-label">確認密碼</label>

          <div class="col-md-9">
            <input type="password" v-model="info.p33_ant_passwd_confirm" class="form-control2">

          </div>
        </div>
        <div class="form-group">
          <label for="check_pwd" class="col-md-2 col-md-offset-1 control-label">Line ID</label>

          <div class="col-md-9">
            <input type="text" v-model="info.p33_ant_profile_lineId" class="form-control2">

          </div>
        </div>
        <div class="form-group">
          <label for="check_pwd" class="col-md-2 col-md-offset-1 control-label">WeChat ID</label>

          <div class="col-md-9">
            <input type="text" v-model="info.p33_ant_profile_wechatId" class="form-control2">

          </div>
        </div>
        <div class="form-group">
          <label for="phone" class="col-md-2 col-md-offset-1 control-label">會員手機</label>

          <div class="col-md-5">
            <input type="text" :value="userInfo.account.p33_ant_mobile | hideStr" disabled class="form-control2" id="phone">

          </div>
        </div>
        <div class="form-group">
          <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>

          <div class="col-md-9 meber-impt">
            <p class="imp">帳戶修改注意</p>

            <p>如遇不可抗拒因素，需變更手機號碼，請洽詢
              <a target="_blank" @click="checkService2Link()">客服人員</a>!</p>
          </div>

        </div>
        <div class="form-group">
          <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>

          <div class="col-md-9">
            <button type="button" @click="postData()" class="btn submit_btn">確定修改</button>
          </div>

        </div>
      </div>

      <div class="tab-pane fade" :class="{ active: $route.query.s == 'bank', in: $route.query.s == 'bank' }" id="tab2">
        <table class="member_table member_transfer" cellpadding="0">
          <tbody>
            <tr>
              <th>銀行</th>
              <th>分行名稱</th>
              <th>帳號</th>
              <th>戶名</th>
              <th>狀態</th>
            </tr>
            <tr v-for="item in myBankList">
              <td data-th="銀行">{{ item.p91_blt_code + '-' + getBankName(item.p91_blt_code) }}</td>
              <td data-th="分行名稱">{{item.p91_blt_sub_bank}}</td>
              <td data-th="帳號">{{ item.p91_blt_number | hideStr }}</td>
              <td data-th="戶名">{{ item.p91_blt_name | hideStr(-1) }}</td>
              <td data-th="狀態">
                <span v-if="item.p91_blt_status === 1" class="label label-warning">
                  待審核
                </span>
                <span v-if="item.p91_blt_status === 3" class="label label-success">
                  通過
                </span>
                <span v-if="item.p91_blt_status === -2" class="label label-danger">
                  未通過
                </span>
              </td>
            </tr>
            <tr v-if="myBankList.length === 0">
              <td colspan="5">查無帳戶</td>
            </tr>
          </tbody>
        </table>

        <div class="form-group">
          <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>
          <div class="col-md-9 meber-impt">
            <p class="imp">注意事項：</p>
            <span class="upload-info">
              銀行帳戶只能新增五筆
            </span>
          </div>
        </div>

        <button v-if="myPassBanks.length < 5" @click="insertBankAccount = true" class="btn submit_btn">新增銀行帳戶</button>

        <section v-if="myPassBanks.length < 5 && insertBankAccount">
          <div class="banksetting_form">
            <div class="member_txt">新增銀行帳號資訊</div>

            <div class="form-group">
              <label class="col-md-2 col-md-offset-1 control-label">銀行代碼</label>

              <div class="col-md-9">
                <select v-model="searchData.p91_blt_code" class="form-control2">
                  <option v-for="data in BankList" :value="data.code">{{ data.code + '-' + data.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="bankId" class="col-md-2 col-md-offset-1 control-label">分行名稱</label>

              <div class="col-md-9">
                <input type="text" v-model="searchData.p91_blt_sub_bank" class="form-control2" placeholder="台北分行">
                <p v-if="errorMsg.p91_blt_sub_bank" class="input-error">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{errorMsg.p91_blt_sub_bank[0]}}</p>
              </div>
            </div>
            <div class="form-group">
              <label for="bankId" class="col-md-2 col-md-offset-1 control-label">銀行帳號</label>

              <div class="col-md-9">
                <input type="text" v-model="searchData.p91_blt_number" class="form-control2" id="bankId" placeholder="12345678900">
                <p v-if="errorMsg.p91_blt_number" class="input-error">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{errorMsg.p91_blt_number[0]}}</p>
              </div>
            </div>
            <div class="form-group">
              <label for="bankName" class="col-md-2 col-md-offset-1 control-label">銀行戶名</label>

              <div class="col-md-9">
                <input type="text" v-model="searchData.p91_blt_name" class="form-control2" id="bankName" placeholder="王小明">
                <p v-if="errorMsg.p91_blt_name" class="input-error">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{errorMsg.p91_blt_name[0]}}</p>
              </div>
            </div>
            <div class="form-group">
              <label for="bankName" class="col-md-2 col-md-offset-1 control-label">上傳檔案</label>

              <div class="col-md-9">
                <form id="imgUpload" method="post">
                  <input type="file" ref="fileUpload" @change="onFileChange" id="file_upload" name="file_upload" class="form-control2 file-form-control">
                </form>
                <span class="upload-info2" style="color: #ff756b">請上傳銀行封面圖片，以利完成帳戶驗證 (大小限制5MB)</span>
                <p v-if="errorMsg.files_guid" class="input-error">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{errorMsg.files_guid[0]}}</p>
              </div>
            </div>
            <div class="form-group">
              <label for="bankName" class="col-md-2 col-md-offset-1 control-label"></label>

              <div class="col-md-9">
                <button type="button" v-if="!uploading" @click="postBankData" class="btn submit_btn">確定送出</button>
                <button type="button" v-if="uploading" class="btn submit_btn">圖片上傳中</button>
              </div>

            </div>
            <div class="form-group">
              <label for="code" class="col-md-2 col-md-offset-1 control-label"></label>
              <div class="col-md-9 meber-impt">
                <p class="imp">注意事項：</p>
                <span class="upload-info">
                  1. 因網路詐騙手法推成出新，為保障會員點數託售安全，需通過帳戶驗証才會開放給配合之點數交易平台，提供購買遊戲幣及託售遊戲幣。 <br> 2. 本網站取得的個人資料，僅供配合之遊戲交易平台託售使用，本網不得將會員個資提供給第三人、或移作其他目的使用。
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
      <!--tab2-->

    </div>
  </div>
</template>

<script>
import BaseInfo from 'src/mixins/Platform/BaseInfo'
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [BaseInfo, Link]
}
</script>
