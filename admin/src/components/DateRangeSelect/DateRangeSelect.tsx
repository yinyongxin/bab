import {
  Combobox,
  ComboboxItem,
  Input,
  InputBase,
  Select,
  rem,
  useCombobox,
} from '@mantine/core';
import { IconCalendarCog } from '@tabler/icons-react';
import { time } from 'console';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
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
];

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
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const { onChange, defaultValue, toDate = false } = props;
  const defaultRange = dateRangeSelectData.find(
    (dateRangeSelectDataItem) => dateRangeSelectDataItem.value === defaultValue,
  );
  const [range, setRange] = useState<Dayjs[]>(defaultRange?.range || []);
  const [value, setValue] = useState<string | null>(defaultValue);

  useEffect(() => {
    const option = dateRangeSelectData.find((item) => item.value === value);
    if (option) {
      setRange(option.range);
      const range = option?.range.map((item) =>
        toDate ? item.toDate() : item,
      ) as unknown as T extends true
        ? [Date, Date]
        : (typeof dateRangeSelectData)[number]['range'];
      onChange?.(range.length > 0 ? range : undefined);
    }
  }, [value]);

  const getValueRender = () => {
    const option = dateRangeSelectData.find((item) => item.value === value);
    return `${option?.label}`;
  };
  const options = dateRangeSelectData.map((item) => {
    const rangeRender = item?.range.map((item) => item.format('YYYY-MM-DD'));
    return (
      <Combobox.Option
        value={item.value}
        key={item.value}
        bg={
          item.value === value
            ? 'var(--mantine-primary-color-light)'
            : 'transparent'
        }
      >
        {item.label}
      </Combobox.Option>
    );
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
      shadow="md"
    >
      <Combobox.Target>
        <InputBase
          w={rem(200)}
          leftSection={<IconCalendarCog size={14} />}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {getValueRender() || <Input.Placeholder>选择日期</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default DateRangeSelect;
