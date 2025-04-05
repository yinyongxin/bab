type FontIconsProps = {
  style?: React.CSSProperties;
  name: string;
};
const FontIcons = (props: FontIconsProps) => {
  const { style, name } = props;
  return <i style={style} className={`ti ti-${name}`} />;
};

export default FontIcons;
