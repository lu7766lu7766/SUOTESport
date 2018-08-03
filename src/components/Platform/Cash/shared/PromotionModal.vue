<template>
  <div class="modal fade" id="promotionModal" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="admodal-container">
        <div class="modal-header">
          <h4 class="modal-title">{{ propPromotion.name }}</h4>
        </div>
        <div class="modal-body active-form">
          <div class="form-group clearfix">
            <div class="col-md-12 control-label">申請內容</div>
          </div>
          <div class="form-group clearfix">
            <div class="col-md-12">
              <textarea v-model="remark" style="height: 150px" class="form-control2">{{ propPromotion.template }}</textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-12 meber-impt">
              <p class="imp">注意事項：</p>
              <span class="upload-info">
                1. 請務必填寫相關內容，否則將無法通過申請。
              </span>
            </div>
          </div>

          <div class="form-group clearfix">
            <div class="col-md-6">
              <button type="button" class="btn btn-close" data-dismiss="modal">取消參加</button>
            </div>
            <div class="col-md-6">
              <button type="button" class="btn" @click="onJoinPromotions">確認參加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Promotion from 'src/mixins/Platform/Promotions'

export default {
	props: {
		propPromotion: {
			type: Object,
			require: true
		}
	},
	mixins: [Promotion]
}
</script>