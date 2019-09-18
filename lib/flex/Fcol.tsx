import React,{FC,PropsWithChildren} from "react";
import classNames from "classnames";
import {StyledProps} from "../_type/StyledProps"


interface FcolProps{
    span?:number;
    theme?:"primary" | "danger" | "default";
    length?:number|"auto";
    order?:number;
    height?:number|string;
    width?:number|string;
    align?:"auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
}

const Fcol:FC<PropsWithChildren<FcolProps>&StyledProps> = function(props){
    const {span=1,theme,length,order,align,height,width}=props;
    let style = {
        "flexBasis":length,
        order,
        height,
        width,
        "alignSelf":align
    };
    return <div style={{...props.style,...style}} className={classNames(`flex-grow-${span}`,{
        [`bg-${theme}`]:theme
    })}>
        {props.children}
    </div>
}

export default Fcol;