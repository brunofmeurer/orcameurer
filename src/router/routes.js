
export default [
  {
    path: '/login',
    component: () => import('pages/Login'),
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { component: () => import('pages/Home'), path: '/' }
    ]
  },
  {
    path: '/financeiro',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Financeiro'), path: '/' }
    ]
  },
  {
    path: '/financeiro/add',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/FinanceiroAdd'), path: '/' }
    ]
  },
  {
    path: '/financeiro/movimento/:doc',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Movimento'), path: '/' }
    ]
  },
  {
    path: '/categoria',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Categoria'), path: '/' }
    ]
  },
  {
    path: '/planejamento',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Planejamento'), path: '/' }
    ]
  },
  {
    path: '/carteira',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Carteira'), path: '/' }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
