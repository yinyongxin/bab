// 导入 Redux 相关模块
import { configureStore, Action, Reducer, Store } from '@reduxjs/toolkit';
// 导入 redux-persist 相关模块，用于持久化存储
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// 导入本地存储模块
import storage from 'redux-persist/lib/storage';
// 导入应用常量
import { PERSIST_STORE_NAME } from '@/constants/app.constant';
// 导入根 reducer 和状态类型
import rootReducer, { RootState, AsyncReducers } from './rootReducer';

// 配置持久化存储
const persistConfig = {
  key: PERSIST_STORE_NAME,
  keyPrefix: '',
  storage,
  whitelist: ['auth', 'locale'],
};

// 定义自定义 store 接口，扩展了 Store 接口
interface CustomStore extends Store<RootState, Action> {
  asyncReducers?: AsyncReducers;
}

// 配置 Redux store
const store: CustomStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer() as Reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

// 初始化异步 reducers
store.asyncReducers = {};

// 创建并导出持久化器
export const persistor = persistStore(store);

/**
 * 动态注入 reducer
 * @param {string} key Reducer 的唯一键值
 * @param {Reducer<S, Action>} reducer 要注入的 reducer
 * @returns {CustomStore} 返回 store
 */
export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
  if (store.asyncReducers) {
    if (store.asyncReducers[key]) {
      return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
      persistReducer(
        persistConfig,
        rootReducer(store.asyncReducers) as Reducer,
      ),
    );
  }
  persistor.persist();
  return store;
}

// 导出 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;

// 默认导出 store
export default store;
