type FontIconsProps = {
  style?: React.CSSProperties;
  name?: string;
  size?: string | number;
  color?: string;
};
const FontIcons = (props: FontIconsProps) => {
  const { style, name, size, color } = props;
  return (
    <i
      style={{ fontSize: size, color: color, ...style }}
      className={`ti ti-${name}`}
    />
  );
};

export default FontIcons;
