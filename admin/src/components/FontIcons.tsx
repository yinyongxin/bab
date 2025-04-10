type FontIconsProps = {
  style?: React.CSSProperties;
  name?: string;
  size?: string | number;
  color?: string;
  className: string;
};
const FontIcons = (props: FontIconsProps) => {
  const { style, name, size, color, className } = props;
  return (
    <i
      style={{ fontSize: size, color: color, ...style }}
      className={`ti ti-${name} ${className}`}
    />
  );
};

export default FontIcons;
