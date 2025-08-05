import {
  CloseButton,
  Combobox,
  Input,
  InputBase,
  SegmentedControl,
  rem,
  useCombobox,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendarCog } from '@tabler/icons-react';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

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

type DataRangeSelect<T extends boolean> = {
  onChange?: (value?: T extends true ? [Date, Date] : Dayjs[]) => void;
  defaultValue: (typeof dateRangeSelectData)[number]['value'];
  toDate?: T;
};

function DateRangeSelect<T extends boolean>(props: DataRangeSelect<T>) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const { onChange, defaultValue, toDate = false } = props;
  const defaultRange = dateRangeSelectData.find(
    (item) => item.value === defaultValue,
  );

  const [range, setRange] = useState<Dayjs[]>(defaultRange?.range || []);
  const [value, setValue] = useState<string | null>(defaultValue);
  const [inputType, setInputType] = useState<'presets' | 'customize'>(
    'presets',
  );

  const validValueLength = range.filter(Boolean).length;

  useEffect(() => {
    if (validValueLength === 0) {
      onChange?.(undefined);
      combobox.closeDropdown();
    } else if (validValueLength > 1) {
      const newRange = range.map((item) =>
        toDate ? item.toDate() : item,
      ) as T extends true ? [Date, Date] : Dayjs[];
      onChange?.(newRange as any);
      combobox.closeDropdown();
    }
  }, [JSON.stringify(range)]);

  const getValueRender = useMemo(() => {
    if (inputType === 'customize') {
      return range
        .map((item) => (item ? item.format('YYYY-MM-DD') : ''))
        .join('至');
    }
    const option = dateRangeSelectData.find((item) => item.value === value);
    return option?.label || '';
  }, [inputType, range, value]);

  const options = useMemo(() => {
    return dateRangeSelectData.map((item) => (
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
    ));
  }, [value]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        const option = dateRangeSelectData.find((item) => item.value === val);
        if (option) {
          setRange(option.range);
        }
      }}
      shadow="md"
    >
      <Combobox.Target>
        <InputBase
          miw={rem(226)}
          leftSection={<IconCalendarCog size={14} />}
          component="button"
          type="button"
          pointer
          rightSection={
            validValueLength === 0 ? (
              <Combobox.Chevron />
            ) : (
              <CloseButton
                size="sm"
                onClick={() => {
                  setValue('all');
                  setRange([]);
                }}
              />
            )
          }
          onClick={() => {
            combobox.toggleDropdown();
          }}
        >
          {getValueRender || <Input.Placeholder>选择日期</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <SegmentedControl
          value={inputType}
          onChange={(val) => {
            setValue('all');
            setInputType(val as 'presets' | 'customize');
          }}
          mb="sm"
          fullWidth
          data={[
            { label: '预设', value: 'presets' },
            { label: '自定义', value: 'customize' },
          ]}
        />
        {inputType === 'presets' && (
          <Combobox.Options>{options}</Combobox.Options>
        )}
        {inputType === 'customize' && (
          <DatePicker
            size="xs"
            type="range"
            value={[range[0]?.toDate() ?? null, range[1]?.toDate() ?? null]}
            onChange={(val) => {
              if (!val[0] || !val[1]) {
                return;
              }
              setRange([
                dayjs(val[0]).startOf('day'),
                dayjs(val[1]).endOf('day'),
              ]);
            }}
          />
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default DateRangeSelect;
