import { Component, JSX } from "solid-js";
import styles from "./index.module.less";
import { ColorEnum } from "../enum";
export type BoxProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
  children?: JSX.Element,
  radius?: number,
  contentProps?: JSX.HTMLAttributes<HTMLDivElement>
  bgProps?: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & {
    bgColor?: ColorEnum,
    bgColorLevel?: GlobalNS.ColorLevelType,
    style?: JSX.CSSProperties
  }
}
export const Box: Component<BoxProps> = (props) => {
  const {
    children,
    radius = 0,
    class: className,
    contentProps,
    bgProps,
    ...rest
  } = props
  const {
    class: contentClassName,
    ...contentPropsRest
  } = { ...contentProps }

  const {
    class: bgClassName,
    style: bgStyle,
    bgColor = ColorEnum.Bg,
    bgColorLevel = 9,
    ...bgPropsRest
  } = { ...bgProps }

  return (
    <div
      class={`${styles.box} ${className || ''}`}
      {...rest}
    >
      <div
        class={`${styles.bg} ${contentClassName}`}
        style={{
          "border-radius": `${radius}px`,
          'background-color': `var(--color-${bgColor}-${bgColorLevel})`,
          'box-shadow': `0 0 8px 0 var(--color-${bgColor}-3)`,
          ...bgStyle,
        }}
        {...contentPropsRest}

      />
      <div class={`${styles.content} ${bgClassName}`}  {...bgPropsRest}>
        {children}
      </div>
    </div>
  )
};