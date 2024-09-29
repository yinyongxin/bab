import { Component, mergeProps, splitProps } from "solid-js"
import styles from "./index.module.less"
import { RadiusSizeEnum, SizeEnum } from "../enum"
export type AvatarProps = {
  src: string,
  size?: SizeEnum
  radius?: RadiusSizeEnum
}
export const Avatar: Component<AvatarProps> = (props) => {
  const merge = mergeProps({
    radius: RadiusSizeEnum.Default,
    size: SizeEnum.Default
  }, props)
  return (
    <div class={styles.avatar}
      style={{
        "border-radius": `var( --border-radius-${merge.radius})`,
        width: `var(--size-${merge.size})`,
        height: `var(--size-${merge.size})`,
      }}
    >
      <img src={props.src} onError={(e) => e.currentTarget.src = 'https://avatars.githubusercontent.com/u/10290406?v=4'} />
    </div>
  )
}