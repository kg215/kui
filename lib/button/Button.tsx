import React, {ReactNode, MouseEvent,ReactElement} from "react";
import classNames from "classnames";

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement>{
    type?: "dashed"|"primary"|"danger"|"link"|"default",
    className?:string,
    onClick?:(e:MouseEvent<HTMLElement>)=>void,
    children?:ReactNode,
    style?:React.CSSProperties
}
export {Button};

const Button:React.FC<ButtonProps>=React.forwardRef((props,ref:React.Ref<HTMLElement>)=>{
    const {type="default",className,onClick,style} = props;
    return React.createElement("button",{style:style,ref:ref,onClick:onClick,className:classNames("ks-btn","ks-btn-"+type,className)},props.children) as ReactElement<any>;
});
Button.displayName="Button";



