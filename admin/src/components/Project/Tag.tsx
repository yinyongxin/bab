import {
  Box,
  Button,
  Card,
  Combobox,
  Group,
  Title,
  useCombobox,
  Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
];
const Tag = () => {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));

  // return (
  //   <>
  //

  //   </>
  // );
  return (
    <Card>
      <Card.Section inheritPadding py="md">
        <Group justify="space-between">
          <Title order={4}>标签</Title>
          <Combobox
            store={combobox}
            width={250}
            position="bottom-end"
            withArrow
            onOptionSubmit={(val) => {
              setSelectedItem([...selectedItem.concat(val)]);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target withAriaAttributes={false}>
              <Button
                leftSection={<IconPlus />}
                onClick={() => combobox.toggleDropdown()}
                variant="subtle"
              >
                <Text>添加标签</Text>
              </Button>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Search
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Search groceries"
              />
              <Combobox.Options>
                {options.length > 0 ? (
                  options
                ) : (
                  <Combobox.Empty>Nothing found</Combobox.Empty>
                )}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py="md" mih="120">
        <Box mb="xs">
          <Text span size="sm" c="dimmed">
            Selected item:{' '}
          </Text>

          <Text span size="sm">
            {selectedItem || 'Nothing selected'}
          </Text>
        </Box>
      </Card.Section>
    </Card>
  );
};

export default Tag;
