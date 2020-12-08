import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
 {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true ,
      }
    }]
  }, {
    path: '/resource',
    component: Layout,
    name: 'Resource',
    meta: {
      title: '基础资料',
      icon: "component"
    },
    children: [{
      path: 'framework',
      component: () => import('@/views/resource/framework/index'),
      name: 'Framework',
      meta: {
        title: '组织架构'
      },
    },{
      path: 'clerk',
      component: () => import('@/views/resource/clerk/index'),
      name: 'Clerk',
      meta: {
        title: '职员信息'
      },
    },{
      path: 'project',
      component: () => import('@/views/resource/project/index'),
      name: 'Project',
      meta: {
        title: '项目信息'
      },
    },{
      path: 'category',
      component: () => import('@/views/resource/category/index'),
      name: 'Category',
      meta: {
        title: '项目类别'
      },
    },{
      path: 'examine',
      component: () => import('@/views/resource/examine/index'),
      name: 'Examine',
      meta: {
        title: '检查项目'
      },
    },{
      path: 'problem',
      component: () => import('@/views/resource/problem/index'),
      name: 'Problem',
      meta: {
        title: '问题隐患'
      },
    },]
  }, {
    path: '/inspection',
    component: Layout,
    name: 'Inspection',
    meta: {
      title: '巡检管理',
      icon: "component"
    },
    children: [{
      path: 'plan',
      component: () => import('@/views/inspection/plan/index'),
      name: 'Plan',
      meta: {
        title: '巡检计划'
      },
    },{
      path: 'record',
      component: () => import('@/views/inspection/record/index'),
      name: 'Record',
      meta: {
        title: '巡检记录'
      },
    },{
      path: 'abarbeitung',
      component: () => import('@/views/inspection/abarbeitung/index'),
      name: 'Abarbeitung',
      meta: {
        title: '整改记录'
      },
    },{
      path: 'statement',
      component: () => import('@/views/inspection/statement/index'),
      name: 'Statement',
      meta: {
        title: '巡检统计表'
      },
    },]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统设置',
      icon: "bug"
    },
    children: [{
      path: 'users',
      component: () => import('@/views/system/users/index'),
      name: 'Users',
      meta: {
        title: '用户管理'
      },
    }
    ]
  },
  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
