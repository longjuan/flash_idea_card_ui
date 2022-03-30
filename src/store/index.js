import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo:{
      avatar: "",
      nickname: "",
      userid: -1
    },
    roles: []
  },
  mutations: {
    modifyUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },
    modifyRoles(state,roles){
      state.roles = roles;
    }
  },
  actions: {
    modifyUserInfo({commit},userInfo){
      return commit('modifyUserInfo',userInfo);
    },
    modifyRoles({commit},roles){
      return commit('modifyRoles', roles);
    }
  },
  modules: {
  },
  getters:{
  }
})
