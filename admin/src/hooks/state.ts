/* eslint-disable react-hooks/exhaustive-deps */
import { isFunction } from "lodash";
import { useEffect, useRef, useState } from "react";

/**
 * 自定义钩子 useAppState，用于管理应用状态
 *
 * @param initValue 初始化状态值
 * @returns 返回一个数组，包含当前状态值、异步状态值和更新状态的函数
 *
 * 此钩子用于在函数组件中管理状态，特别是处理异步操作时
 * 它提供了一种方法来保持和更新组件的状态，同时通过 useRef 来保存异步操作的状态
 * 这对于需要在异步操作完成前后更新状态的场景特别有用
 */
export const useAppState = <V>(initValue: V, after?: () => void) => {
	// 状态管理部分，用于存储和更新当前值
	const [value, setValue] = useState<V>(initValue);

	// 通过 useRef 来保存异步操作的状态，这样可以在异步操作完成后更新状态
	const asyncValue = useRef<V >(initValue);
	const updateValue = (val: V | ((oldValue: V) => V)) => {
		if (isFunction(val)) {
			const newValue = val(value);
			asyncValue.current = newValue;
			setValue(newValue);
		} else {
			asyncValue.current = val;
			setValue(val);
		}
	};

	useEffect(() => {
		after?.();
	}, [value]);

	// 返回一个数组，包含当前状态值、异步状态值和更新状态的函数
	// 这样可以在组件中直接使用这些值来控制组件的行为
	return [value, asyncValue.current, updateValue] as const;
};
