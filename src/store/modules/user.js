import { login, getInfo,changePassword, getPermissions} from '@/api/user'
import { getToken, setToken, removeToken, setUserName, setPassword,setUserInfo, setPer} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken('insrx'),
  name: '',
  url: 'http://xyy.gzfzdev.com:8082',
  avatar: '',
  insper: '',
  username: '',
  password: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PER: (state, insper) => {
    state.insper = insper
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_PASSWORD: (state, password) => {
    state.password = password
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
       const { data } = response
        /* commit('SET_TOKEN', data.fid)
         setToken(data.fid)*/
        commit('SET_USERNAME', username)
        commit('SET_PASSWORD', password)
        /*setUserInfo(response.data.userId)*/
        setUserName(username)
        setPassword(password)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //修改密码
  changePassword({ commit }, info) {
    return new Promise((resolve, reject) => {
      changePassword(info).then(response => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getPermissions({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPermissions(state.token).then(response => {
        const { data } = response
        console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        } else {
          if(data.length <= 0) {
            setPer('')
            commit('SET_TOKEN', '')
            resolve(data)
          } else {
            const { insper } = data
            // 转unicode
            let res = []
            let str = data[0]['permissionName']
            for (let i = 0; i < str.length; i++) {
              res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4)
            }
            let cot = "\\u" + res.join("\\u")
            setPer(cot)
            //commit('SET_TOKEN', insper)
            resolve(data)
          }
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      //logout({ fid: state.token }).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_PER', '')
      removeToken('insper')
      removeToken('insrx')
      removeToken('insps')
      removeToken('insun')
      removeToken('userInfo')
      resetRouter()
      resolve()
      /*}).catch(error => {
        reject(error)
      })*/

      /* commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      localStorage.removeItem('routes')
      router */
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken('insrx')
      removeToken()
      resolve()
    })
  },
  // add token
  addToken({ commit },state) {
    return new Promise(resolve => {
      commit('SET_TOKEN', state)
      setToken(state)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

