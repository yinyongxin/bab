import { AppShell } from '@mantine/core';
import Views from '../Views';

export const AddMain = () => {
  return (
    <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
      <Views />
    </AppShell.Main>
  );
};
