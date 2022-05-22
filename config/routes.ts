export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user', routes : [
          {name: '登录', path: '/user/login', component: './user/Login'},
          {name: '注册', path: '/user/register', component: './user/Register'}
        ]
      },
      {component: './404'},
    ],
  },
  {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {
    path: '/Admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {path: '/admin/user-manage', name: '用户管理', icon: 'smile', component: './Admin/UserManage'},
      {component: './404'},
    ],
  },
  {
    path: '/Auction',
    name: '拍卖品一览',
    icon: 'crown',
    component: './Auction',
    routes: [
      {path: '/Auction/display', name: '拍卖品一览', icon: 'smile', component: './Auction/Display'},
      {component: './404'},
    ],
  },
  {path: '/', redirect: '/welcome'},
  {component: './404'},
];
