import { Component, JSX } from "solid-js";
import styles from "./index.module.less";
type BoxProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
  children?: JSX.Element,
  radius?: number,
  style?: JSX.CSSProperties
}
const Box: Component<BoxProps> = (props) => {
  const {
    children,
    radius = 0,
    style,
    class: className,
    ...rest
  } = props
  return <div class={`${styles.box} ${className}`} style={{
    "border-radius": `${radius}px`,
    ...style,
  }} {...rest}>{children}</div>
};
export default Box;