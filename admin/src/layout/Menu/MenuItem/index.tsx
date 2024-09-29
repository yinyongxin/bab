import styles from './index.module.less'
import { Component } from 'solid-js';
export type MenuItemProps = {
    icon: string,
    title: string
}
const MenuItem: Component<MenuItemProps> = (props) => {
    return (
        <div
            class={styles.item}
        >
            <div class={styles.icon}>
                {props.icon}
            </div>
        </div >
    )
};

export default MenuItem;