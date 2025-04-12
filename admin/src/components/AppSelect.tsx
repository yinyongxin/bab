import { Option } from '@/@types';
import {
  Box,
  Group,
  Combobox,
  Input,
  InputBase,
  useCombobox,
  ComboboxProps,
  CloseButton,
} from '@mantine/core';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { useDidUpdate } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';

import { useState } from 'react';

type AppSelectProps = ComboboxProps & {
  data: Option<string>[];
  plaseholder?: string;
  clearable?: boolean;
  inputProps?: GetInputPropsReturnType;
  name?: string;
  onChange?: (value?: string) => void;
};
const AppSelect = (props: AppSelectProps) => {
  const { data, plaseholder, name, onChange, inputProps, clearable, ...rest } =
    props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | undefined>(inputProps?.value);
  const valueRender = data.find((item) => item.value === value)?.renderContent;

  const options = data.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <Group w="100%">
        <Box flex={1}>{item.renderContent}</Box>
        {value === item.value && (
          <IconCheck color="var(--mantine-primary-color-filled)" />
        )}
      </Group>
    </Combobox.Option>
  ));

  const getRightSection = () => {
    if (!value) {
      return <Combobox.Chevron />;
    } else if (clearable) {
      return (
        <CloseButton
          size="sm"
          onMouseDown={(event) => event.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            setValue(undefined);
          }}
          aria-label="Clear value"
        />
      );
    }

    return null;
  };

  useDidUpdate(() => {
    onChange?.(value);
    inputProps?.onChange(value);
  }, [value]);

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
      {...rest}
    >
      <Combobox.Target>
        <InputBase
          name={name}
          component="button"
          type="button"
          pointer
          rightSection={getRightSection()}
          onClick={(e) => {
            e.stopPropagation();
            combobox.toggleDropdown();
          }}
        >
          {valueRender || <Input.Placeholder>{plaseholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default AppSelect;
