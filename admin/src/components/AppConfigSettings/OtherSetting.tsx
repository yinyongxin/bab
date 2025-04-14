import { LayoutTypes } from '@/@types/layout';
import { useAppDispatch, useAppSelector } from '@/store';
import useAppConfig from '@/store/hook/useAppConfig';
import { setAppConfig } from '@/store/slices/appConfig';
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Paper,
  Slider,
  Stack,
  Title,
} from '@mantine/core';
import React from 'react';

const OtherSetting = () => {
  const [appConfig, updateAppConfig] = useAppConfig();

  return (
    <Stack>
      <Title order={5}>开发中尽请期待</Title>
      <Divider />
    </Stack>
  );
};

export default OtherSetting;
