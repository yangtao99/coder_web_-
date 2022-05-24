export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          { name: '登录', path: '/user/login', component: './user/Login' },
          { name: '注册', path: '/user/register', component: './user/Register' },
        ],
      },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/Auction', name: '拍卖品一览', icon: 'table', component: './AuctionDisplay' },
  {
    path: '/Admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理',
        icon: 'smile',
        component: './Admin/UserManage',
      },      {
        path: '/admin/Auction',
        name: '拍卖物管理',
        icon: 'smile',
        component: './Admin/AuctionManage',
      },{
        path: '/admin/AuctionAddManage',
        name: '拍卖物新增',
        icon: 'smile',
        component: './Admin/AuctionAddManage',
      },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
