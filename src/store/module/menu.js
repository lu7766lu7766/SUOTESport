
import storage from '~/store'

const type = {
  ClearDatas: "Menu/clearDatas",
  ChgSblGuid: "Menu/update_currentSblGuid",
  ChgSraGuids: "Menu/update_currentSraGuids",
  ChgSleGuids: "Menu/update_currentSleGuids",
  sraGuids: "Menu/sraGuids",
  sleGuids: "Menu/sleGuids"
}

export { type as MenuType }

export default {
  namespaced: true,
  state: {
    currentSblGuid: storage.get('currentSblGuid') || '', // 因為不可能看多個球類，所以是唯一值
    currentSraGuids: storage.get('currentSraGuids') || [], // 僅處理是否高亮與是否顯示底下聯盟
    currentSleGuids: storage.get('currentSleGuids') || {}, // {sra: [sle]} // 可直接做sra & sle binding
  },
  mutations: {
    clearDatas(state) {
      state.currentSblGuid = ''
      state.currentSraGuids = []
      state.currentSleGuids = {}
      storage.set('currentSblGuid', state.currentSblGuid)
      storage.set('currentSraGuids', state.currentSraGuids)
      storage.set('currentSleGuids', state.currentSleGuids)
    },
    update_currentSblGuid(state, payload) { // 點擊該球類時
      if (state.currentSblGuid != payload.sbl_guid) {
        state.currentSblGuid = payload.sbl_guid
        state.currentSraGuids = []
        state.currentSleGuids = {}
        storage.set('currentSblGuid', state.currentSblGuid)
        storage.set('currentSraGuids', state.currentSraGuids)
        storage.set('currentSleGuids', state.currentSleGuids)
      }
    },
    update_currentSraGuids(state, payload) { // 點擊該地區時
      if (state.currentSblGuid == payload.sbl_guid) { // 是否在同球類下
        const index = state.currentSraGuids.indexOf(payload.sra_guid)
        if (index == -1) { // 已存在於currentSraGuids中
          state.currentSraGuids.push(payload.sra_guid)
        } else { // 不存在於currentSraGuids中
          state.currentSraGuids.splice(index, 1)
          state.currentSleGuids = _.omit(state.currentSleGuids, payload.sra_guid)
          storage.set('currentSleGuids', state.currentSleGuids)
        }
        storage.set('currentSraGuids', state.currentSraGuids)
      }
    },
    update_currentSleGuids(state, payload) { // 點擊聯盟時

      if (state.currentSblGuid != payload.sbl_guid) { // 切到其他球類，或從球類所有聯盟切成單一聯盟(暫時沒有用)
        state.currentSraGuids = []
        state.currentSleGuids = {}
      }

      // sbl，球類處理
      state.currentSblGuid = payload.sbl_guid

      // sra，地區處理
      if (state.currentSraGuids.indexOf(payload.sra_guid) == -1) {
        state.currentSraGuids.push(payload.sra_guid)
      }

      // sle，聯盟處理
      let len = 0
      _.forEach(Object.keys(state.currentSleGuids), x => {
        len += state.currentSleGuids[x].length
      })
      if (payload.sra_guid in state.currentSleGuids) { // 判斷是否有該屬性
        if (state.currentSleGuids[payload.sra_guid].indexOf(payload.sle_guid) > -1) { // 存在就移除
          if (len != 1) { // 如果該球類只剩下一個聯盟點選中
            state.currentSleGuids[payload.sra_guid].splice(state.currentSleGuids[payload.sra_guid].indexOf(payload.sle_guid), 1)
            if (!state.currentSleGuids[payload.sra_guid].length) {
              delete state.currentSleGuids[payload.sra_guid]
              // state.currentSleGuids = _.omit(state.currentSleGuids, payload.sra_guid) // remove key，屬性異動需取得新物件
            }
          }
        } else { // 有屬性但沒有該聯盟
          state.currentSleGuids[payload.sra_guid].push(payload.sle_guid) //
        }
      } else { // 沒有直接丟入一串陣列
        // function tmp() {
        //   this[payload.sra_guid] = [payload.sle_guid]
        // }
        state.currentSleGuids[payload.sra_guid] = [payload.sle_guid]
        //state.currentSleGuids = _.assign({}, state.currentSleGuids, new tmp) // 屬性異動需取得新物件才會觸發getter跟時空旅行，參考vuex mutations
      }
      state.currentSleGuids = _.assign({}, state.currentSleGuids) // 統一在這返回一個新物件

      storage.set('currentSblGuid', state.currentSblGuid)
      storage.set('currentSraGuids', state.currentSraGuids)
      storage.set('currentSleGuids', state.currentSleGuids)
    },
  },
  getters: {
    sraGuids: state => Object.keys(state.currentSleGuids), // 目前選取的聯盟，所屬的地區
    sleGuids: state => { // 目前選取的聯盟
      let res = []
      _.forEach(Object.keys(state.currentSleGuids), sra => {
        _.forEach(state.currentSleGuids[sra], sle => {
          res.push(sle)
        })
      })
      return res
    }
  }
}