import router from '@/router'
import { setTokenTime } from '@/utils/tokentime'
import { login as loginApi } from '@/api/login'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    userdata: localStorage.getItem('userdata') || '',
    siderType: true,
    userlist: localStorage.getItem('userlist') || '',
    lang: localStorage.getItem('lang') || 'zh'
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUser(state, userdata) {
      state.userdata = userdata
      localStorage.setItem('userdata', userdata)
    },
    adduser(state, userlist) {
      state.userlist = userlist
      localStorage.setItem('userlist', userlist)
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changelang(state, lang) {
      state.lang = lang
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        commit(
          'setUser',
          JSON.stringify({ id: new Date() * 1, username: userInfo.username })
        )
        commit(
          'adduser',
          JSON.stringify({ id: new Date() * 1, username: userInfo.username })
        )
        loginApi(userInfo)
          .then((res) => {
            commit('setToken', res.token)
            setTokenTime()
            router.push('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      // localStorage.clear()
      router.replace('/login')
    }
  }
}
