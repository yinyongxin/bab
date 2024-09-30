import { Component, JSX } from "solid-js"

export type FlexItemProps = {
  flex?: JSX.CSSProperties['flex']
  flexBasis?: JSX.CSSProperties['flex-basis'],
  flexGrow?: JSX.CSSProperties['flex-grow'],
  flexShrink?: JSX.CSSProperties['flex-shrink'],
  children: JSX.Element
}
export const FlexItem: Component<FlexItemProps> = (props) => {
  return (
    <div style={{
      flex: props?.flex,
      'flex-basis': props?.flexBasis,
      'flex-grow': props?.flexGrow,
      'flex-shrink': props?.flexShrink
    }}>{props.children}</div>
  )
}