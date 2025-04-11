import { ComboboxItem, Select } from '@mantine/core';
import { IconCalendarCog } from '@tabler/icons-react';
import dayjs, { Dayjs, extend } from 'dayjs';
import { useState } from 'react';
const dateRangeSelectData = [
  { value: 'all', label: '全部', range: [] },
  {
    value: 'today',
    label: '今日',
    range: [dayjs().startOf('day'), dayjs().endOf('day')],
  },
  {
    value: 'week',
    label: '本周',
    range: [dayjs().startOf('week'), dayjs().endOf('week')],
  },
  {
    value: 'month',
    label: '本月',
    range: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    value: 'year',
    label: '本年',
    range: [dayjs().startOf('year'), dayjs().endOf('year')],
  },
] as const;

type DataRangeSelect<T> = {
  onChange?: (
    value?: T extends true
      ? [Date, Date]
      : (typeof dateRangeSelectData)[number]['range'],
  ) => void;
  defaultValue: (typeof dateRangeSelectData)[number]['value'];
  toDate?: T;
};

function DateRangeSelect<T extends boolean>(props: DataRangeSelect<T>) {
  const { onChange, defaultValue, toDate = false } = props;
  const defaultRange =
    dateRangeSelectData.find(
      (dateRangeSelectDataItem) =>
        dateRangeSelectDataItem.value === defaultValue,
    ) || dateRangeSelectData[0];
  const [value, setValue] = useState<ComboboxItem>(defaultRange);
  return (
    <Select
      leftSection={<IconCalendarCog size={14} />}
      data={dateRangeSelectData}
      value={value ? value.value : null}
      onChange={(_value, option) => {
        setValue(option);
        if (option) {
          const range = dateRangeSelectData
            .find(
              (dateRangeSelectDataItem) =>
                dateRangeSelectDataItem.value === option.value,
            )
            ?.range.map((item) => {
              return toDate ? item.toDate() : item;
            }) as unknown as T extends true
            ? [Date, Date]
            : (typeof dateRangeSelectData)[number]['range'];
          onChange?.(range.length > 0 ? range : undefined);
        }
      }}
    />
  );
}

export default DateRangeSelect;
