import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function page(pageRoute) {
  return () =>
    import ('@/pages/' + pageRoute)
}

export default new Router({

  routes: [
    {
      path: '',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: page('Home/Home'),
      meta: {
        showTab: true //如果需要显示就加上这个
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: page('Mine/Mine'),
      meta: {
        showTab: true //如果需要显示就加上这个
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: page('Login/Login')
    },
    {
      path: '/OrderForm',
      name: 'OrderForm',
      component: page('MyOrder/OrderForm'),
      meta: {
        keepAlive: true // 页面内容默认缓存
      }
    },
    {
      path: '/ContactList',
      name: 'ContactList',
      component: page('Mine/ContactList')
    },
    // 保险列表
    {
      path: '/InsuranceList',
      name: 'InsuranceList',
      component: page('Insurance/InsuranceList')
    },
    // 保险详情
    {
      path: '/InsuranceDetail',
      name: 'InsuranceDetail',
      component: page('Insurance/InsuranceDetail')
    },
    // 消息列表
    {
      path: '/MessageList',
      name: 'MessageList',
      component: page('Message/MessageList')
    },
    // 理赔通知
    {
      path: '/ClaimNotice',
      name: 'ClaimNotice',
      component: page('Claim/ClaimNotice')
    },
    // 理赔发起
    {
      path: '/ClaimLaunch',
      name: 'ClaimLaunch',
      component: page('Claim/ClaimLaunch')
    },
    // 理赔审核
    {
      path: '/ClaimAudit',
      name: 'ClaimAudit',
      component: page('Claim/ClaimAudit')
    },
    // 我的订单
    {
      path: '/OrderList',
      name: 'OrderList',
      component: page('Mine/OrderList')
    },
    // 订单详情
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: page('Mine/OrderDetail')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    return { x: 0, y:0 }
  }
})



