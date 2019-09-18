import React from "react";
import classNames from "classnames";

interface IconProps extends React.HTMLAttributes<HTMLElement>{
    type:string;
    size?:
        |"5x"
        |"4x"
        |"3x"
        |"2x"
        |"lg";
    fw?:boolean;
    animated?:
        |"spin"
        |"pulse";
    stack?:"1x"|"2x";
}

export function Icon(props:IconProps) : JSX.Element{
    const {type,size,stack="",className,fw=false,animated,...otherProps} = props;
    return <i {...otherProps}
              className={
                  classNames("fa",`fa-${type}`,{
                      "fa-fw":fw,
                      [`fa-${size}`]:size,
                      [`fa-${animated}`]:animated,
                      [`fa-stack-${stack}`]:stack
                  },className)
              }
    />;
}
Icon.displayName = "Icon";
interface StackProps extends React.HTMLAttributes<HTMLSpanElement>{
    size?:
        |"5x"
        |"4x"
        |"3x"
        |"2x"
        |"lg";
    inverse?:boolean
}

Icon.IconStack = function (props:StackProps) {
    const {inverse=false,size="lg",className=""} = props;
    return <span className={
        classNames("fa-stack",`fa-${size}`,{
        "fa-inverse":inverse
    },className)
    }>{props.children}</span>;
};