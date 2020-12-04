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
// 查询巡检记录
export function getPollingRecordList(data, query) {
  // 查询分页数据
  const url = '/polling-record/list/' + data.pageNum + '/' + data.pageSize
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
// 巡检计划-反审核
export function pollingPlanAgainstAudit(data) {
  // 查询分页数据
  const url = '/polling-plan/againstAudit/' + data
  return request({
    headers: {
      'authorization': getToken('insrx')
    },
    url: url,
    method: 'get',
  })
}// 巡检计划-审核
export function pollingPlanAudit(data) {
  // 查询分页数据
  const url = '/polling-plan/audit/' + data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'get',
  })
}//  反馈登记
export function recordRectifyAdd(data) {
  // 查询分页数据
  const url = '/record-rectify/add'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}//  反馈历史
export function recordRectifyFindList(data) {
  // 查询分页数据
  const url = '/record-rectify/findList'
  return request({
    headers: {
      'authorization': getToken('insrx'),
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'post',
    data: data
  })
}//  反馈完成
export function completeRectify(data) {
  // 查询分页数据
  const url = '/record-rectify/completeRectify'
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
// 巡检记录删除
export function delPollingrecord(data) {
  // 查询分页数据
  const url = '/polling-record/del/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'delete',
  })
}
//查询巡检登记
export function pollingRecordByPlanId(data) {
  // 查询分页数据
  const url = '/app/pollingRecordByPlanId/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'get',
  })
}
//查询导出PDF数据
export function printRecordRectify(data) {
  // 查询分页数据
  const url = '/print/printRecordRectify/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'get',
  })
}//查询导出PDF数据
export function printPollingPlanReport(data) {
  // 查询分页数据
  const url = '/print/printPollingPlanReport/'+data
  return request({
    headers: {
      'authorization': getToken('insrx'),
    },
    url: url,
    method: 'get',
  })
}
  // 查询巡检统计表
export function pollingPlanReport(data, query) {
  // 查询分页数据
  const url = '/report-form/pollingPlanReport/' + data.pageNum + '/' + data.pageSize
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
