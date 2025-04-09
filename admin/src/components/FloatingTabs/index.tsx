import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './FloatingTabs.module.css';

type FloatingTabsProps = {
  options: {
    label: React.ReactNode;
    value: string;
  }[];
  defaultValue?: string;
};

export default function FloatingTabs(props: FloatingTabsProps) {
  const { options, defaultValue } = props;
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
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}
