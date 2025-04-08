import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import type { RootState } from './rootReducer';

export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
