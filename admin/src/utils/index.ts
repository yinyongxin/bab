import dayjs, { Dayjs, isDayjs } from "dayjs";

export const DefaultDateFormat = "YYYY-MM-DD";
export const DefaultTimeFormat = "HH:mm:ss";
export const DefaultDateTimeFormat = `${DefaultDateFormat} ${DefaultTimeFormat}`;

/**
 * 格式化日期字符串或Dayjs对象为特定格式
 * @param date - 日期字符串或Dayjs对象
 * @returns 格式化后的日期字符串
 *
 * 此函数旨在将给定的日期字符串或Dayjs对象格式化为一个特定的格式
 * 如果输入为无效日期格式，则返回当前日期和时间作为默认值
 */
export const getFormattedDate = (date: string | Dayjs): string => {
	try {
		// 判断输入是否为Dayjs对象
		if (isDayjs(date)) {
			return date.format(DefaultDateTimeFormat);
		} else {
			// 验证字符串是否符合日期格式
			const parsedDate = dayjs(date);
			if (!parsedDate.isValid()) {
				console.error(`Invalid date format: ${date}`);
				return dayjs().format(DefaultDateTimeFormat); // 返回当前时间作为默认值
			}
			return parsedDate.format(DefaultDateTimeFormat);
		}
	} catch (error) {
		console.error(`Error formatting date: ${error}`);
		return dayjs().format(DefaultDateTimeFormat); // 返回当前时间作为默认值
	}
};
