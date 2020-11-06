import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询巡检计划
export function getPollingPlanList(data, query) {
  // 查询分页数据
  const url = '/polling-plan/list/' + data.pageNum + '/' + data.pageSize
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
// 巡检计划新增
export function addPollingPlan(data) {
  // 查询分页数据
  const url = '/polling-plan/add'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}// 巡检计划修改
export function updatePollingPlan(data) {
  // 查询分页数据
  const url = '/polling-plan/update'
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
