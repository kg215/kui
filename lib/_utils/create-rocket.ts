import React, {Ref, forwardRef, ReactNode} from "react";
import {StyledProps} from "../_type";

export interface RocketProps extends StyledProps{
    /**
     * 组件内容
     */
    children?:ReactNode;
}

/**
 * 快速创建DOM容器组件
 * @param displayName 组件名称
 * @param paths 组件容器的路径 css选择器 例如 div.bg-blue
 */
export const createRocket = <P extends RocketProps = RocketProps>(
    displayName:string,
    ...paths:string[]
)=>{
    const parentOf=(children:React.ReactNode,path:string)=>{
        const [tag,...classNames] = path.split(".");
        return React.createElement(
            tag,
            {
                className:classNames.join(" "),
            },
            children
        )
    };

    const Rocket = forwardRef((props:P,ref:Ref<HTMLElement>) =>{
        const {children,className,style} = props;
        let element = paths.reduceRight<JSX.Element>(parentOf,children as any);
        if(className || style){
            const {props:elementProps} = element;
            element = React.cloneElement(element,{
                ref,
                className:[elementProps.className,className]
                    .filter(Boolean)
                    .join(" "),
                style
            });
        }
        return element;
    });

    Rocket.displayName=displayName;
    return Rocket;
};



