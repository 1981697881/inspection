import request from '@/utils/request'; // 引入封装好的axios请求
import {
  getToken
} from '@/utils/auth' // get token from cookie
// 查询工序计划
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
