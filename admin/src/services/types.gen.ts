// This file is auto-generated by @hey-api/openapi-ts

export type SignInDto = {
    /**
     * 管理人员名称
     */
    username: string;
    /**
     * 密码
     */
    password: string;
};

export type ResultAdmintorDto = {
    /**
     * 创建日期
     */
    createdTime: string;
    /**
     * 更新日期
     */
    updatedTime: string;
    /**
     * 管理人员名称
     */
    username: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 年龄
     */
    age?: number;
    /**
     * 电话号码
     */
    phone?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 状态
     */
    status: 'Open' | 'Close';
    /**
     * 唯一值
     */
    _id: string;
};

/**
 * 状态
 */
export type status = 'Open' | 'Close';

export type CreateAdmintorBodyDto = {
    /**
     * 管理人员名称
     */
    username: string;
    /**
     * 密码
     */
    password: string;
};

export type DeleteIdsDto = {
    /**
     * 删除Id列表
     */
    ids: Array<(string)>;
};

export type IntersectionUpdateResDtoDeleteResDto = {
    /**
     * 是否成功
     */
    acknowledged: boolean;
    /**
     * 更新数量
     */
    modifiedCount?: number;
    /**
     * 更新插入id
     */
    upsertedId?: string;
    /**
     * 更新插入数量
     */
    upsertedCount?: number;
    /**
     * 符合更新条件的数量
     */
    matchedCount?: number;
    /**
     * 匹配数量
     */
    deletedCount?: number;
};

export type UpdateAdmintorDto = {
    /**
     * 更新日期
     */
    updatedTime?: string;
    /**
     * 管理人员名称
     */
    username?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 年龄
     */
    age?: number;
    /**
     * 电话号码
     */
    phone?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 状态
     */
    status?: 'Open' | 'Close';
};

export type UpdateResDto = {
    /**
     * 是否成功
     */
    acknowledged: boolean;
    /**
     * 更新数量
     */
    modifiedCount?: number;
    /**
     * 更新插入id
     */
    upsertedId?: string;
    /**
     * 更新插入数量
     */
    upsertedCount?: number;
    /**
     * 符合更新条件的数量
     */
    matchedCount?: number;
};

export type QueryAdmintorDto = {
    /**
     * 创建日期
     */
    createdTime?: string;
    /**
     * 更新日期
     */
    updatedTime?: string;
    /**
     * 管理人员名称
     */
    username?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 姓名
     */
    name?: string;
    /**
     * 年龄
     */
    age?: number;
    /**
     * 电话号码
     */
    phone?: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 状态
     */
    status?: 'Open' | 'Close';
};

export type AdmintorPaginationQueryResultDto = {
    /**
     * 当前页面
     */
    pageNo: number;
    /**
     * 分页大小
     */
    pageSize: number;
    /**
     * 所有数量
     */
    total: number;
    /**
     * 所有数量
     */
    list: Array<ResultAdmintorDto>;
};

export type CreateRoleBodyDto = {
    /**
     * 角色名称
     */
    name: string;
    /**
     * 角色名称
     */
    description?: string;
    /**
     * 图标
     */
    icon?: string;
};

export type ResultRoleDto = {
    /**
     * 创建日期
     */
    createdTime: string;
    /**
     * 更新日期
     */
    updatedTime: string;
    /**
     * 角色名称
     */
    name: string;
    /**
     * 角色名称
     */
    description?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 唯一值
     */
    _id: string;
};

export type UpdateRoleDto = {
    /**
     * 更新日期
     */
    updatedTime?: string;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 角色名称
     */
    description?: string;
    /**
     * 图标
     */
    icon?: string;
};

export type QueryRoleDto = {
    /**
     * 创建日期
     */
    createdTime?: string;
    /**
     * 更新日期
     */
    updatedTime?: string;
    /**
     * 角色名称
     */
    name?: string;
    /**
     * 角色名称
     */
    description?: string;
    /**
     * 图标
     */
    icon?: string;
};

export type RolePaginationQueryResultDto = {
    /**
     * 当前页面
     */
    pageNo: number;
    /**
     * 分页大小
     */
    pageSize: number;
    /**
     * 所有数量
     */
    total: number;
    /**
     * 所有数量
     */
    list: Array<ResultRoleDto>;
};

export type CreateMenuBodyDto = {
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 菜单名称
     */
    description?: string;
    /**
     * 菜单路径
     */
    path: string;
    /**
     * 页面权限
     */
    pageAuthority?: 'Open' | 'Delete' | 'Update' | 'Query';
    /**
     * 图标
     */
    icon?: string;
    /**
     * 图标
     */
    parent?: string;
};

/**
 * 页面权限
 */
export type pageAuthority = 'Open' | 'Delete' | 'Update' | 'Query';

export type ResultMenuDto = {
    /**
     * 创建日期
     */
    createdTime: string;
    /**
     * 更新日期
     */
    updatedTime: string;
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 菜单名称
     */
    description?: string;
    /**
     * 菜单路径
     */
    path: string;
    /**
     * 页面权限
     */
    pageAuthority?: 'Open' | 'Delete' | 'Update' | 'Query';
    /**
     * 图标
     */
    icon?: string;
    /**
     * 图标
     */
    parent?: string;
    /**
     * 唯一值
     */
    _id: string;
};

export type UpdateMenuDto = {
    /**
     * 更新日期
     */
    updatedTime?: string;
    /**
     * 菜单名称
     */
    name?: string;
    /**
     * 菜单名称
     */
    description?: string;
    /**
     * 菜单路径
     */
    path?: string;
    /**
     * 页面权限
     */
    pageAuthority?: 'Open' | 'Delete' | 'Update' | 'Query';
    /**
     * 图标
     */
    icon?: string;
    /**
     * 图标
     */
    parent?: string;
};

export type TreeMenuDataDto = {
    /**
     * 删除时间
     */
    readonly deletedTime?: string;
    /**
     * 创建日期
     */
    createdTime: string;
    /**
     * 更新日期
     */
    updatedTime: string;
    /**
     * 菜单名称
     */
    name: string;
    /**
     * 菜单名称
     */
    description?: string;
    /**
     * 菜单路径
     */
    path: string;
    /**
     * 页面权限
     */
    pageAuthority?: 'Open' | 'Delete' | 'Update' | 'Query';
    /**
     * 图标
     */
    icon?: string;
    /**
     * 图标
     */
    parent?: string;
    /**
     * 唯一值
     */
    _id: string;
    /**
     * 唯一值
     */
    children: Array<TreeMenuDataDto>;
};

export type AuthControllerSignInData = {
    body: SignInDto;
};

export type AuthControllerSignInResponse = (ResultAdmintorDto);

export type AuthControllerSignInError = unknown;

export type AuthControllerGetProfileResponse = (unknown);

export type AuthControllerGetProfileError = unknown;

export type AdmintorsControllerAddOneData = {
    body: CreateAdmintorBodyDto;
};

export type AdmintorsControllerAddOneResponse = (ResultAdmintorDto);

export type AdmintorsControllerAddOneError = unknown;

export type AdmintorsControllerDeleteByIdsData = {
    body: DeleteIdsDto;
};

export type AdmintorsControllerDeleteByIdsResponse = (IntersectionUpdateResDtoDeleteResDto);

export type AdmintorsControllerDeleteByIdsError = unknown;

export type AdmintorsControllerUpdateOneData = {
    body: UpdateAdmintorDto;
    query: {
        /**
         * 唯一值
         */
        id: string;
    };
};

export type AdmintorsControllerUpdateOneResponse = (UpdateResDto);

export type AdmintorsControllerUpdateOneError = unknown;

export type AdmintorsControllerFindByIdData = {
    query: {
        /**
         * 唯一值
         */
        id: string;
    };
};

export type AdmintorsControllerFindByIdResponse = (ResultAdmintorDto);

export type AdmintorsControllerFindByIdError = unknown;

export type AdmintorsControllerFindAllByFieldsData = {
    body: QueryAdmintorDto;
};

export type AdmintorsControllerFindAllByFieldsResponse = (Array<ResultAdmintorDto>);

export type AdmintorsControllerFindAllByFieldsError = unknown;

export type AdmintorsControllerGetPageListData = {
    body: QueryAdmintorDto;
    query: {
        /**
         * 当前页面
         */
        pageNo: number;
        /**
         * 分页大小
         */
        pageSize: number;
    };
};

export type AdmintorsControllerGetPageListResponse = (AdmintorPaginationQueryResultDto);

export type AdmintorsControllerGetPageListError = unknown;

export type RolesControllerAddOneData = {
    body: CreateRoleBodyDto;
};

export type RolesControllerAddOneResponse = (ResultRoleDto);

export type RolesControllerAddOneError = unknown;

export type RolesControllerDeleteByIdsData = {
    body: DeleteIdsDto;
};

export type RolesControllerDeleteByIdsResponse = (IntersectionUpdateResDtoDeleteResDto);

export type RolesControllerDeleteByIdsError = unknown;

export type RolesControllerUpdateOneData = {
    body: UpdateRoleDto;
    query: {
        /**
         * 唯一值
         */
        id: string;
    };
};

export type RolesControllerUpdateOneResponse = (UpdateResDto);

export type RolesControllerUpdateOneError = unknown;

export type RolesControllerFindByIdData = {
    query: {
        /**
         * 唯一值
         */
        id: string;
    };
};

export type RolesControllerFindByIdResponse = (ResultRoleDto);

export type RolesControllerFindByIdError = unknown;

export type RolesControllerFindAllByFieldsData = {
    body: QueryRoleDto;
};

export type RolesControllerFindAllByFieldsResponse = (Array<ResultRoleDto>);

export type RolesControllerFindAllByFieldsError = unknown;

export type RolesControllerGetPageListData = {
    body: QueryRoleDto;
    query: {
        /**
         * 当前页面
         */
        pageNo: number;
        /**
         * 分页大小
         */
        pageSize: number;
    };
};

export type RolesControllerGetPageListResponse = (RolePaginationQueryResultDto);

export type RolesControllerGetPageListError = unknown;

export type MenusControllerAddOneData = {
    body: CreateMenuBodyDto;
};

export type MenusControllerAddOneResponse = (ResultMenuDto);

export type MenusControllerAddOneError = unknown;

export type MenusControllerDeleteByIdsData = {
    body: DeleteIdsDto;
};

export type MenusControllerDeleteByIdsResponse = (IntersectionUpdateResDtoDeleteResDto);

export type MenusControllerDeleteByIdsError = unknown;

export type MenusControllerUpdateOneData = {
    body: UpdateMenuDto;
    query: {
        /**
         * 唯一值
         */
        id: string;
    };
};

export type MenusControllerUpdateOneResponse = (UpdateResDto);

export type MenusControllerUpdateOneError = unknown;

export type MenusControllerFindByIdData = {
    query: {
        /**
         * 唯一值
         */
        id: string;
    };
};

export type MenusControllerFindByIdResponse = (ResultMenuDto);

export type MenusControllerFindByIdError = unknown;

export type MenusControllerGetTreeDataResponse = (Array<TreeMenuDataDto>);

export type MenusControllerGetTreeDataError = unknown;

export type MenusControllerGetAllMenusResponse = (Array<TreeMenuDataDto>);

export type MenusControllerGetAllMenusError = unknown;