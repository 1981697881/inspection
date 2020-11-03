import Cookies from 'js-cookie'

const TokenKey = 'insrx'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}
export function getPer(insper) {
  return Cookies.get(insper)
}

export function setPer(insper) {
  return Cookies.set('insper', insper)
  // return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}

export function setUserName(username){
  return Cookies.set('insun',username)
}
export function setPassword(password){
  return Cookies.set('insps',password)
}
export function setUserInfo(info){
  return Cookies.set('userInfo',info)
}
