import { Component, JSX } from "solid-js";
import styles from "./index.module.less";
type BoxProps = {
  children?: JSX.Element
} & JSX.HTMLAttributes<HTMLDivElement>
const Box: Component<BoxProps> = (props) => {
  const {
    children,
    class: className,
    ...rest
  } = props
  return <div class={`${styles.box} ${className}`} {...rest}>{children}</div>
};
export default Box;