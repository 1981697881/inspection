export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'resource': () => import('@/views/resource/index'),
  'inspection': () => import('@/views/inspection/index'),
  'dashboard': () => import('@/views/dashboard/index'),

  'category': () => import('@/views/resource/category/index'),
  'examine': () => import('@/views/resource/examine/index'),
  'problem': () => import('@/views/resource/problem/index'),
  'project': () => import('@/views/resource/project/index'),
  'framework': () => import('@/views/resource/framework/index'),
  'clerk': () => import('@/views/resource/clerk/index'),

  'plan': () => import('@/views/inspection/plan/index'),
  'record': () => import('@/views/inspection/record/index'),
  'statement': () => import('@/views/inspection/statement/index'),

  'system': () => import('@/views/system/index'),
  'users': () => import('@/views/system/users/index'),
}
