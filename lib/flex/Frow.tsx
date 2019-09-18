import React,{FC,PropsWithChildren,HTMLAttributes}  from "react";
import classNames from "classnames";
import {StyledProps} from "../_type/StyledProps"

interface FrowProps {
    direction?:"row" | "row-reverse" | "column" | "column-reverse";
    wrap?:"nowrap" | "wrap" | "wrap-reverse";
    justify?:"start" | "end" | "center" | "space-between" | "space-around";
    alignItems?:"start" | "end" | "center" | "baseline" | "stretch";
    alignContent?:"start" | "end" | "center" | "space-between" | "space-around" | "stretch";
}

const Frow:FC<PropsWithChildren<FrowProps>&StyledProps> = function(props){
    const  {direction,wrap,justify,alignItems,alignContent,style} = props;
    return <div style={style} className={classNames("flex-box",{
        [`flex-${direction}`]:direction,
        [`flex-items-${alignItems}`]:alignItems,
        [`flex-${wrap}`]:wrap,
        [`flex-justify-${justify}`]:justify,
        [`flex-content-${alignContent}`]:alignContent,
    },props.className)}>
        {props.children}
    </div>
}

export default Frow;