import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 组织列表
export function getDepartmentList(data, query) {
  // 查询分页数据
  const url = '/department/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 组织新增
export function addDepartment(data) {
  // 查询分页数据
  const url = '/department/add'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}// 组织修改
export function updateDepartment(data) {
  // 查询分页数据
  const url = '/department/update'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 组织删除
export function delDepartment(data) {
  // 查询分页数据
  const url = '/department/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
// 职员列表
export function getEmployeeList(data, query) {
  // 查询分页数据
  const url = '/employee/employee/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 职员新增
export function addEmployee(data) {
  // 查询分页数据
  const url = '/employee/add'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}// 职员修改
export function updateEmployee(data) {
  // 查询分页数据
  const url = '/employee/update'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'put',
    data: data
  })
}
// 职员删除
export function delEmployee(data) {
  // 查询分页数据
  const url = '/employee/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
// 检查项目列表
export function getProjectList(data, query) {
  // 查询分页数据
  const url = '/project/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 检查项目新增&修改
export function updateProject(data) {
  // 查询分页数据
  const url = '/project/saveOrUpdate'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
// 检查项目删除
export function delProject(data) {
  // 查询分页数据
  const url = '/project/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
// 问题隐患列表
export function getConcernsList(data, query) {
  // 查询分页数据
  const url = '/concerns/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 问题隐患新增&修改
export function updateConcerns(data) {
  // 查询分页数据
  const url = '/concerns/saveOrUpdate'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
// 问题隐患删除
export function delConcerns(data) {
  // 查询分页数据
  const url = '/concerns/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
// 项目类别列表
export function getProjectTypeList(data, query) {
  // 查询分页数据
  const url = '/project-type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 项目类别新增&修改
export function updateProjectType(data) {
  // 查询分页数据
  const url = '/project-type/saveOrUpdate'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
// 项目类别删除
export function delProjectType(data) {
  // 查询分页数据
  const url = '/project-type/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
/*
// 项目信息列表
export function getProjectTypeList(data, query) {
  // 查询分页数据
  const url = '/project/list/' + data.pageNum + '/' + data.pageSize
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: query
  })
}
// 项目信息新增&修改
export function updateProjectType(data) {
  // 查询分页数据
  const url = '/project-type/saveOrUpdate'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}
// 项目信息删除
export function delProjectType(data) {
  // 查询分页数据
  const url = '/project-type/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
*/
