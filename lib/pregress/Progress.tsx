import React,{FC} from "react";
import classNames from "classnames";
import {StyledProps} from "../_type";

interface ProgressProps extends StyledProps{
    percent?:number;
    status?:"primary"|"danger"|"warn"|"lv",
}

export const Progress:FC<ProgressProps> = function(
    {
        percent=0,
        status="lv",
        style
    }
){
    style = Object.assign(style,{lineHeight:parseInt(style.height as string)+"px"});
    percent=Math.min(Math.max(percent,0),100);
    return <div className={"ks-progress"} style={style}>
        <div className={"ks-progress_wrapper"}>
            <div className={classNames("ks-progress_inner",{
                [`bg-${status}`]:status
            })} style={{width:percent+"%"}} />
        </div>
        <span className={"ks-progress_text"}>
            10%
        </span>
    </div>
};