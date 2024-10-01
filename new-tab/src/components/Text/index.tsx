import { Component, JSX, children, mergeProps, splitProps } from "solid-js";
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
  const [
    local, other
  ] = splitProps(props, ["class", "color", 'colorLevel', 'cursor', 'children']);
  const merge = mergeProps({
    color: ColorEnum.Text,
    colorLevel: 9,
  }, local)
  return (
    <span
      class={`${styles.text} ${merge.class || ''}`}
      style={{
        color: `var(--color-${merge.color}-${merge.colorLevel})`,
        cursor: merge.cursor,
        ...props.style
      }}
      {...other}
    >{merge.children}</span>
  )
};