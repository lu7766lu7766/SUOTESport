import storage from '~/store'

const type = {
  Get: "Favorite/getFavorites",
  onChange: "Favorite/onFavoriteChange"
}

export { type as FavoriteType } 

export default {
  namespaced: true,
  state: {
    datas: [] //sep_guids 賽事guid
  },
  mutations: {
    getFavorites(state) { // 不同帳號要的資料可能要不一樣，尚未有此需求
      // storage.clear()
      state.datas = storage.get('favorites') || []
    },
    onFavoriteChange(state, setData) {
      const set_guid = setData.set_guid
      const pos = _.indexOf(state.datas, set_guid)
      
      if (pos > -1) {
        state.datas = _.without(state.datas, set_guid)
      } else {
        state.datas = _.concat(state.datas, set_guid)
      }
      state.datas = _.filter(state.datas, x => typeof x == "string")
      storage.set('favorites', state.datas)
    }
  }
}