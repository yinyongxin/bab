import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';

const iconProps = {
  stroke: 1.5,
  opacity: 0.6,
  size: 18,
};
export const sexIcons: Record<string, React.ReactNode> = {
  Male: <IconGenderMale color="blue" {...iconProps} />,
  Female: <IconGenderFemale color="red" {...iconProps} />,
};
