import { FilterType } from '@/@types';
import AppSelect from '@/components/AppSelect';
import { Chip, CloseButton, Group, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { UseFormInput } from '@mantine/form/lib/types';
import { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';

function useFilter<P extends Record<string, unknown | undefined>>(
  params: UseFormInput<P>,
  filters: FilterType<P>[],
  options?: {
    onDelete?: (values: P) => void;
  },
) {
  const { onDelete } = options || {};
  const form = useForm(params);
  const inputArea = filters.map((item) => {
    let input = (
      <TextInput
        {...form.getInputProps(item.name)}
        label={item.label}
        placeholder={item.placeholder}
      />
    );
    if (item.options || item.optionsObj) {
      input = (
        <AppSelect
          label={item.label}
          clearable
          inputProps={form.getInputProps(item.name)}
          data={item.options}
          objData={item.optionsObj}
          placeholder={item.placeholder}
        />
      );
    }
    return <Fragment key={item.name as string}>{input}</Fragment>;
  });

  const selccted = filters.map((item) => {
    const value = form.values[item.name];
    let renderContent: ReactNode | P[keyof P] = value;
    if (!value) {
      return null;
    }
    if (item.optionsObj || item.options) {
      if (item.optionsObj) {
        renderContent = item.optionsObj[value as string].renderContent;
      }
      if (item.options) {
        renderContent = item.options?.find(
          (item) => item.value === value,
        )?.renderContent;
      }
    }
    return (
      <Chip
        key={item.name as string}
        variant="light"
        checked
        icon={
          <CloseButton
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              form.setValues({ [item.name]: undefined } as P);
              onDelete?.({ [item.name]: undefined } as P);
            }}
            variant="transparent"
          />
        }
      >
        <Group pl="xs" gap="xs">
          {item.label && <Text>{item.label}：</Text>}

          <>{renderContent}</>
        </Group>
      </Chip>
    );
  });
  return {
    form,
    values: form.values,
    inputArea,
    selccted,
  };
}
export default useFilter;
