import "./styles.css";

type SidebarItemProps = {
    title: string;
    handlePress: () => void;
    active: boolean;
}

export function SidebarItem({title, handlePress, active}: SidebarItemProps): JSX.Element {
    const classes = ["sidebar-item"];

    if(active) {
        classes.push("sidebar-item-active");
    }

    return (
        <li onClick={handlePress} className={classes.join(" ")}>
            {title}
        </li>
    )
}
