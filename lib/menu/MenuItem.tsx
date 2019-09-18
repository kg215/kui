import React,{Fragment} from "react";
import classNames from "classnames"
import {StyledProps} from "../_type";
import {callBoth} from "../_utils/call-both";

interface MenuItemProps extends React.PropsWithChildren<StyledProps>{
    title?:string;
    selected?:boolean;
    path?:string;
    onClick?:(e:React.MouseEvent)=>void,
    render?:(children:JSX.Element)=>JSX.Element,
}

export function MenuItem(
    {
        title,
        selected,
        onClick=()=>null,
        path,
        render = children => <a href={`#${path||''}`}>{children}</a>,
        className,
        style,
        children
    }:MenuItemProps
) {

    const ele = render(<Fragment>
        <div className="ks-menu__text">{children||title}</div>
    </Fragment>);

    return (
        <li className={className}>
            {React.cloneElement(ele, {
                style,
                className: classNames({ "ks-menu-item-selected": selected },"ks-menu__item", ele.props.className),
                onClick: callBoth(onClick, ele.props.onClick),
            })}
        </li>
    );
}

