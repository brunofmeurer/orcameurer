
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
      { component: () => import('../pages/FinanceiroBasicoForm'), path: '/' }
    ]
  },
  {
    path: '/financeiro/edit/:doc',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/FinanceiroBasicoForm'), path: '/' }
    ]
  },
  {
    path: '/financeiro/add-grupo',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/FinanceiroGrupoForm'), path: '/' }
    ]
  },
  {
    path: '/financeiro/edit-grupo/:doc',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/FinanceiroGrupoForm'), path: '/' }
    ]
  },
  {
    path: '/financeiro/view/:doc',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/FinanceiroView'), path: '/' }
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
    path: '/recorrencia',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Recorrencia'), path: '/' }
    ]
  },
  {
    path: '/carteira',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Carteira'), path: '/' }
    ]
  },
  {
    path: '/grupo',
    component: () => import('../layouts/default'),
    children: [
      { component: () => import('../pages/Grupo'), path: '/' }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
