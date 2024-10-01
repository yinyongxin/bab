// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { AuthControllerSignInData, AuthControllerSignInError, AuthControllerSignInResponse, AuthControllerGetProfileError, AuthControllerGetProfileResponse, AdmintorsControllerAddOneData, AdmintorsControllerAddOneError, AdmintorsControllerAddOneResponse, AdmintorsControllerDeleteByIdsData, AdmintorsControllerDeleteByIdsError, AdmintorsControllerDeleteByIdsResponse, AdmintorsControllerUpdateOneData, AdmintorsControllerUpdateOneError, AdmintorsControllerUpdateOneResponse, AdmintorsControllerFindByIdData, AdmintorsControllerFindByIdError, AdmintorsControllerFindByIdResponse, AdmintorsControllerFindAllByFieldsData, AdmintorsControllerFindAllByFieldsError, AdmintorsControllerFindAllByFieldsResponse, AdmintorsControllerGetPageListData, AdmintorsControllerGetPageListError, AdmintorsControllerGetPageListResponse, RolesControllerAddOneData, RolesControllerAddOneError, RolesControllerAddOneResponse, RolesControllerDeleteByIdsData, RolesControllerDeleteByIdsError, RolesControllerDeleteByIdsResponse, RolesControllerUpdateOneData, RolesControllerUpdateOneError, RolesControllerUpdateOneResponse, RolesControllerFindByIdData, RolesControllerFindByIdError, RolesControllerFindByIdResponse, RolesControllerFindAllByFieldsData, RolesControllerFindAllByFieldsError, RolesControllerFindAllByFieldsResponse, RolesControllerGetPageListData, RolesControllerGetPageListError, RolesControllerGetPageListResponse, MenusControllerAddOneData, MenusControllerAddOneError, MenusControllerAddOneResponse, MenusControllerDeleteByIdsData, MenusControllerDeleteByIdsError, MenusControllerDeleteByIdsResponse, MenusControllerUpdateOneData, MenusControllerUpdateOneError, MenusControllerUpdateOneResponse, MenusControllerFindByIdData, MenusControllerFindByIdError, MenusControllerFindByIdResponse, MenusControllerGetTreeDataError, MenusControllerGetTreeDataResponse, MenusControllerGetAllMenusError, MenusControllerGetAllMenusResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * 登录
 * 登录
 */
export const authControllerSignIn = <ThrowOnError extends boolean = false>(options: Options<AuthControllerSignInData, ThrowOnError>) => { return (options?.client ?? client).post<AuthControllerSignInResponse, AuthControllerSignInError, ThrowOnError>({
    ...options,
    url: '/auth/login'
}); };

export const authControllerGetProfile = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<AuthControllerGetProfileResponse, AuthControllerGetProfileError, ThrowOnError>({
    ...options,
    url: '/auth/profile'
}); };

/**
 * 添加一个管理人员
 * 添加一个管理人员
 */
export const admintorsControllerAddOne = <ThrowOnError extends boolean = false>(options: Options<AdmintorsControllerAddOneData, ThrowOnError>) => { return (options?.client ?? client).put<AdmintorsControllerAddOneResponse, AdmintorsControllerAddOneError, ThrowOnError>({
    ...options,
    url: '/admintors/addOne'
}); };

/**
 * 通过Id删除管理人员
 * 通过Ids删除管理人员
 */
export const admintorsControllerDeleteByIds = <ThrowOnError extends boolean = false>(options: Options<AdmintorsControllerDeleteByIdsData, ThrowOnError>) => { return (options?.client ?? client).delete<AdmintorsControllerDeleteByIdsResponse, AdmintorsControllerDeleteByIdsError, ThrowOnError>({
    ...options,
    url: '/admintors/deleteByIds'
}); };

/**
 * 更新单条数据
 * 更新单条数据
 */
export const admintorsControllerUpdateOne = <ThrowOnError extends boolean = false>(options: Options<AdmintorsControllerUpdateOneData, ThrowOnError>) => { return (options?.client ?? client).patch<AdmintorsControllerUpdateOneResponse, AdmintorsControllerUpdateOneError, ThrowOnError>({
    ...options,
    url: '/admintors/updateOne'
}); };

/**
 * 通过Id查找管理人员
 * 通过Id查找管理人员
 */
export const admintorsControllerFindById = <ThrowOnError extends boolean = false>(options: Options<AdmintorsControllerFindByIdData, ThrowOnError>) => { return (options?.client ?? client).get<AdmintorsControllerFindByIdResponse, AdmintorsControllerFindByIdError, ThrowOnError>({
    ...options,
    url: '/admintors/findById'
}); };

/**
 * 通过字段值查询所有数据
 * 通过字段值查询所有数据
 */
export const admintorsControllerFindAllByFields = <ThrowOnError extends boolean = false>(options: Options<AdmintorsControllerFindAllByFieldsData, ThrowOnError>) => { return (options?.client ?? client).post<AdmintorsControllerFindAllByFieldsResponse, AdmintorsControllerFindAllByFieldsError, ThrowOnError>({
    ...options,
    url: '/admintors/findAllByFields'
}); };

/**
 * 获取分页列表
 * 获取分页列表
 */
export const admintorsControllerGetPageList = <ThrowOnError extends boolean = false>(options: Options<AdmintorsControllerGetPageListData, ThrowOnError>) => { return (options?.client ?? client).post<AdmintorsControllerGetPageListResponse, AdmintorsControllerGetPageListError, ThrowOnError>({
    ...options,
    url: '/admintors/getPageList'
}); };

/**
 * 添加一个角色
 * 添加一个角色
 */
export const rolesControllerAddOne = <ThrowOnError extends boolean = false>(options: Options<RolesControllerAddOneData, ThrowOnError>) => { return (options?.client ?? client).put<RolesControllerAddOneResponse, RolesControllerAddOneError, ThrowOnError>({
    ...options,
    url: '/roles/addOne'
}); };

/**
 * 通过Id删除角色
 * 通过Ids删除角色
 */
export const rolesControllerDeleteByIds = <ThrowOnError extends boolean = false>(options: Options<RolesControllerDeleteByIdsData, ThrowOnError>) => { return (options?.client ?? client).delete<RolesControllerDeleteByIdsResponse, RolesControllerDeleteByIdsError, ThrowOnError>({
    ...options,
    url: '/roles/deleteByIds'
}); };

/**
 * 更新单条数据
 * 更新单条数据
 */
export const rolesControllerUpdateOne = <ThrowOnError extends boolean = false>(options: Options<RolesControllerUpdateOneData, ThrowOnError>) => { return (options?.client ?? client).patch<RolesControllerUpdateOneResponse, RolesControllerUpdateOneError, ThrowOnError>({
    ...options,
    url: '/roles/updateOne'
}); };

/**
 * 通过Id查找角色
 * 通过Id查找角色
 */
export const rolesControllerFindById = <ThrowOnError extends boolean = false>(options: Options<RolesControllerFindByIdData, ThrowOnError>) => { return (options?.client ?? client).get<RolesControllerFindByIdResponse, RolesControllerFindByIdError, ThrowOnError>({
    ...options,
    url: '/roles/findById'
}); };

/**
 * 通过字段值查询所有数据
 * 通过字段值查询所有数据
 */
export const rolesControllerFindAllByFields = <ThrowOnError extends boolean = false>(options: Options<RolesControllerFindAllByFieldsData, ThrowOnError>) => { return (options?.client ?? client).post<RolesControllerFindAllByFieldsResponse, RolesControllerFindAllByFieldsError, ThrowOnError>({
    ...options,
    url: '/roles/findAllByFields'
}); };

/**
 * 获取分页列表
 * 获取分页列表
 */
export const rolesControllerGetPageList = <ThrowOnError extends boolean = false>(options: Options<RolesControllerGetPageListData, ThrowOnError>) => { return (options?.client ?? client).post<RolesControllerGetPageListResponse, RolesControllerGetPageListError, ThrowOnError>({
    ...options,
    url: '/roles/getPageList'
}); };

/**
 * 添加一个菜单
 * 添加一个菜单
 */
export const menusControllerAddOne = <ThrowOnError extends boolean = false>(options: Options<MenusControllerAddOneData, ThrowOnError>) => { return (options?.client ?? client).put<MenusControllerAddOneResponse, MenusControllerAddOneError, ThrowOnError>({
    ...options,
    url: '/menus/addOne'
}); };

/**
 * 通过Id删除菜单
 * 通过Ids删除菜单
 */
export const menusControllerDeleteByIds = <ThrowOnError extends boolean = false>(options: Options<MenusControllerDeleteByIdsData, ThrowOnError>) => { return (options?.client ?? client).delete<MenusControllerDeleteByIdsResponse, MenusControllerDeleteByIdsError, ThrowOnError>({
    ...options,
    url: '/menus/deleteByIds'
}); };

/**
 * 更新单条数据
 * 更新单条数据
 */
export const menusControllerUpdateOne = <ThrowOnError extends boolean = false>(options: Options<MenusControllerUpdateOneData, ThrowOnError>) => { return (options?.client ?? client).patch<MenusControllerUpdateOneResponse, MenusControllerUpdateOneError, ThrowOnError>({
    ...options,
    url: '/menus/updateOne'
}); };

/**
 * 通过Id查找菜单
 * 通过Id查找菜单
 */
export const menusControllerFindById = <ThrowOnError extends boolean = false>(options: Options<MenusControllerFindByIdData, ThrowOnError>) => { return (options?.client ?? client).get<MenusControllerFindByIdResponse, MenusControllerFindByIdError, ThrowOnError>({
    ...options,
    url: '/menus/findById'
}); };

/**
 * 获取树形结构
 * 获取树形结构
 */
export const menusControllerGetTreeData = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<MenusControllerGetTreeDataResponse, MenusControllerGetTreeDataError, ThrowOnError>({
    ...options,
    url: '/menus/getTreeData'
}); };

/**
 * 获取所有菜单
 * 获取所有菜单
 */
export const menusControllerGetAllMenus = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<MenusControllerGetAllMenusResponse, MenusControllerGetAllMenusError, ThrowOnError>({
    ...options,
    url: '/menus/getAll'
}); };