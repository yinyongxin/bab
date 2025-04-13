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
  Stack,
  Text
} from '@mantine/core';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { useDidUpdate } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';

import { useState } from 'react';

type AppSelectProps = ComboboxProps & {
  data?: Option<string>[];
  objData?: Record<string, Option<string>>;
  placeholder?: string;
  clearable?: boolean;
  inputProps?: GetInputPropsReturnType;
  name?: string;
  onChange?: (value?: string) => void;
  label?: string;
};
const AppSelect = (props: AppSelectProps) => {
  const {
    data,
    placeholder,
    name,
    onChange,
    inputProps,
    clearable,
    objData,
    label,
    ...rest
  } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | undefined>(inputProps?.value);
  const valueRender = () => {
    if (!value) {
      return <Input.Placeholder>{placeholder}</Input.Placeholder>;
    }
    if (data) {
      return data.find((item) => item.value === value)?.renderContent;
    } else if (objData) {
      return objData[value]?.renderContent;
    }
  };

  const optionsRender = () => {
    if (data) {
      return data?.map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
          <Group w="100%">
            <Box flex={1}>{item.renderContent}</Box>
            {value === item.value && (
              <IconCheck color="var(--mantine-primary-color-filled)" />
            )}
          </Group>
        </Combobox.Option>
      ));
    } else if (objData) {
      return Object.keys(objData).map((key) => (
        <Combobox.Option value={key} key={key}>
          <Group w="100%">
            <Box flex={1}>{objData[key].renderContent}</Box>
            {value === key && (
              <IconCheck color="var(--mantine-primary-color-filled)" />
            )}
          </Group>
        </Combobox.Option>
      ));
    }
  };

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
        <Stack gap="0">
          {label && <Text component='label' size='sm' lh='md'>{label}</Text>}
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
            {valueRender()}
          </InputBase>
        </Stack>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{optionsRender()}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default AppSelect;
