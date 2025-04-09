// 导入 Redux 相关的类型和函数
import { combineReducers, Action, Reducer } from 'redux';
// 导入 auth 模块及其状态类型
import auth, { AuthState } from './slices/auth';
// 导入 base 模块及其状态类型
import base, { BaseState } from './slices/base';
// 导入 locale 模块及其状态类型
import locale, { LocaleState } from './slices/locale/localeSlice';
// 导入 theme 模块及其状态类型
import appConfig, { AppConfigState } from './slices/appConfig/appConfigSlice';

// 定义根状态类型，包含所有子模块的状态
export type RootState = {
  auth: AuthState;
  base: BaseState;
  locale: LocaleState;
  appConfig: AppConfigState;
};

// 定义异步 reducer 的接口
export interface AsyncReducers {
  [key: string]: Reducer<any, Action>;
}

// 定义静态 reducer 对象，包含所有静态的子模块 reducer
const staticReducers = {
  auth,
  base,
  locale,
  appConfig,
};

// 定义动态合并 reducer 的函数
// 该函数允许在运行时添加异步 reducer
const rootReducer =
  (asyncReducers?: AsyncReducers) => (state: RootState, action: Action) => {
    // 使用 combineReducers 函数合并静态和动态 reducer
    const combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
    // 调用合并后的 reducer 函数并返回新的状态
    return combinedReducer(state, action);
  };

// 导出动态合并 reducer 的函数
export default rootReducer;
