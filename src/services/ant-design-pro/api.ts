// @ts-ignore
/* eslint-disable */
import { request } from 'umi';


/** 获取拍卖会消息 POST /api/auctionComment/queryAuctionComment */
export async function queryAuctionComment(
  params:string
){
  return request<API.commentValue[]>('/api/auctionComment/queryAuctionComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/** 添加评论 POST /api/auctionComment/addAuctionComment */
export function addAuctionComment(body: API.commentValue, options?: { [key: string]: any }) {
  return request<number>('/api/auctionComment/addAuctionComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 加入预购袋 POST /api/auctionBag/addAuctionBag */
export function AddAuctionBag(body: API.AddAuctionBagParams, options?: { [key: string]: any }) {
  return request<number>('/api/auctionBag/addAuctionBag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 展示预购袋 POST /api/auctionBag */
export async function queryAuctionBag(
  params: { userID: string },
){
  return request<API.AuctionBag[]>('/api/auctionBag/queryAuctionBag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/** 移除购物袋 POST /api/auctionBag/removeAuctionBag */
export async function removeAuctionBag(params: string|null) {
  return request<number>('/api/auctionBag/removeAuctionBag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/** 新增加拍卖品 POST /api/auction/addAuction */
export async function fakeSubmitForm(params: any) {
  return request<number>('/api/auction/addAuction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/** 搜索所有拍卖物 POST /api/auction/searchAllAuction */
export async function searchALlAuction(body: API.SearchAllAuctionParams|null|undefined, options?: { [key: string]: any }) {
  return request<API.AuctionMessage[]>('/api/auction/searchAllAuction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索拍卖品 POST /api/auction/searchAuction */
export async function searchAuction(body: API.SearchAuctionParams|null) {
  return request<API.AuctionMessage[]>('/api/auction/searchAuction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 POST /api/user/search */
export async function searchUsers(body: API.SearchParams, options?: { [key: string]: any }) {
  return request<API.CurrentUser[]>('/api/user/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 删除用户 POST /api/user/delete */
export async function deleteUsers(body: number, options?: { [key: string]: any }) {
  alert('删除成功,请刷新表单');
  return request<API.deleteResult>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重设性别 POST /api/user/changeSex */
export async function changSex(body: number, options?: { [key: string]: any }) {
  alert('设置成功,请刷新表单');
  return request<API.changeSexResult>('/api/user/changeSex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 搜索所有拍卖物 POST /api/auction/searchAllAuction */
//export async function searchALlAuctionTry(body: API.SearchAllAuctionParams|null): Promise<API.AuctionMessage[]>//todo promise 获取值问题

//
// /** 搜索用户 GET /api/user/search */
// export async function searchUsers(options?: { [key: string]: any }) {
//   return request<API.CurrentUser[]>('/api/user/search', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
