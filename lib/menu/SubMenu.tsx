import React from "react";
import {StyledProps} from "../_type";
import classNames from "classnames";
import {Icon} from "../icon"
import {useDefault} from "../_utils/use-default";

type keyType = string|number;
interface titleClick<T>{
    key?:T;
    domEvent?:React.MouseEvent;
}
interface SubMenuProps extends StyledProps{
    children?:JSX.Element |  JSX.Element[];
    disabled?:boolean;
    defaultOpen?:boolean;
    opened?:boolean;
    title?:string;
    onOpenedChange?:(opened: boolean) => void;
}

export function SubMenu(
    {
        title,
        children,
        defaultOpen=false,
        opened,
        onOpenedChange,
        disabled,
    } : SubMenuProps
): JSX.Element {
    // eslint-disable-next-line no-param-reassign
    [opened, onOpenedChange] = useDefault(opened,defaultOpen,onOpenedChange);
    return <li>
        <a className={"ks-menu__item ks-menu-submenu"} onClick={() => onOpenedChange(!opened)}>
            {title}
            <Icon className={classNames("ks-menu-submenu__icon",{"ks-menu-submenu__down":opened})} type={"angle-right"} />
        </a>
        <ul className={"ks-menu menu-sub"} style={{display:opened?"block":"none"}}>
            {children}
        </ul>
    </li>
}
SubMenu.displayName="SubMenu";