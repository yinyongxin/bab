import { Component, JSX } from "solid-js";
import styles from "./index.module.less";
type BoxProps = {
  children?: JSX.Element
} & JSX.HTMLAttributes<HTMLSpanElement>
const Text: Component<BoxProps> = (props) => {
  const {
    children,
    class: className,
    ...rest
  } = props
  return <span class={`${styles.text} ${className}`} {...rest}>{children}</span>
};
export default Text;