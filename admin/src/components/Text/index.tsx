import { Component, JSX } from "solid-js";
import {
  ColorEnum
} from '../enum'
import styles from "./index.module.less";
export type TextProps = {
  children?: JSX.Element,
  color?: ColorEnum,
  colorLevel?: GlobalNS.ColorLevelType
  cursor?: JSX.CSSProperties['cursor']
  style?: JSX.CSSProperties
} & Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'style'>
export const Text: Component<TextProps> = (props) => {
  const {
    children,
    class: className,
    color = ColorEnum.Text,
    colorLevel = 9,
    cursor,
    style,
    ...rest
  } = props
  return (
    <span
      class={`${styles.text} ${className || ''}`}
      style={{
        color: `var(--color-${props.color}-${colorLevel})`,
        cursor,
        ...style
      }}
      {...rest}
    >{children}</span>
  )
};