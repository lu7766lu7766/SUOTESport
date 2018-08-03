<template>
    <div class="modal fade" :id="id" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="admodal-container">

                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="modal-body">
                    <div class="modal-text1">{{ content }}</div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import Alert from 'src/mixins/Common/Alert'
export default {
	name: 'alert',
	mixins: [Alert]
}
</script>