import { useState } from 'react';
import {
  Box,
  BoxProps,
  FloatingIndicator,
  UnstyledButton,
} from '@mantine/core';
import classes from './FloatingTabs.module.css';

type FloatingTabsProps = {
  options: {
    label: React.ReactNode;
    content: React.ReactNode;
    value: string;
  }[];
  defaultValue?: string;
} & BoxProps;

export default function FloatingTabs(props: FloatingTabsProps) {
  const {
    options,
    defaultValue,
    className,
    w = 'fit-content',
    ...boxProps
  } = props;
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(defaultValue || options[0].value);

  const setControlRef = (value: string) => (node: HTMLButtonElement) => {
    controlsRefs[value] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = options.map((item) => (
    <UnstyledButton
      key={item.value}
      className={classes.control}
      ref={setControlRef(item.value)}
      onClick={() => setActive(item.value)}
      mod={{ active: active === item.value }}
    >
      <span className={classes.controlLabel}>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <>
      <Box
        className={`${classes.root} ${className}`}
        ref={setRootRef}
        w={w}
        {...boxProps}
      >
        {controls}

        <FloatingIndicator
          target={controlsRefs[active]}
          parent={rootRef}
          className={classes.indicator}
        />
      </Box>
      {options.find((item) => item.value === active)?.content}
    </>
  );
}
