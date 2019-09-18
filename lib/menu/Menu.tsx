import React,{useState} from "react"
import {RocketProps} from "../_utils/create-rocket";
import {withStatics} from "../_utils/with-statics"
import {useDefault} from "../_utils/use-default";
import classNames from "classnames"
import {MenuItem} from "./MenuItem";
import {SubMenu} from "./SubMenu";
export interface MenuProps extends RocketProps{
    mode?:"inline"|"vertical"|"horizontal",
    title?:string
    theme?: "light" | "dark",
    defaultCollapsed?:boolean,
    collapsed?:boolean,
    onCollapsedChange?:(collapsed:boolean)=>void
}


export const Menu=withStatics(
    function Menu({
        theme,
        mode="horizontal",
        title,
        children,
        className,
        style,
        defaultCollapsed,
        collapsed,
        onCollapsedChange
    }:MenuProps) {
        [collapsed, onCollapsedChange] = useDefault(
            collapsed,
            defaultCollapsed,
            onCollapsedChange
        );
        const [hovered, setHovered] = useState<boolean>(false);
        return <>
            <div
                className={classNames("ks-menu","ks-menu-"+mode, className, {
                    "ks-menu--light": theme !== "dark",
                    "ks-menu-is-locked": collapsed,
                    "ks-menu-is-collapsed": collapsed && !hovered,
                })}
                style={style}
            >
                <div
                    className="ks-menu__header"
                    onMouseEnter={() => collapsed && setHovered(true)}
                    onMouseLeave={() => collapsed && setHovered(false)}
                >
                    {!!title && (
                        <div className="ks-menu__title">
                            <h2 className="ks-h2">
                                {title}
                            </h2>
                        </div>
                    )}
                </div>
                <div
                    className="ks-menu__body"
                    onMouseEnter={() => collapsed && setHovered(true)}
                    onMouseLeave={() => collapsed && setHovered(false)}
                >
                    <ul className="ks-menu__list">{children}</ul>
                </div>

            </div>
        </>
    },
    {
        Item:MenuItem,
        SubMenu
    }
);
