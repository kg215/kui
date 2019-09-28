import React, {FC, useEffect, useState} from "react";
import classNames from "classnames";
import {StyledProps} from "../_type";

interface SwitchProps extends StyledProps{
    onChange?:(val:boolean)=>void;
    defaultValue?:boolean;
}

export const Switch:FC<SwitchProps> = function (
    {
        onChange=()=>{},
        defaultValue=false
    }
) {
    const [innerValue,setInnerValue] = useState<boolean>(defaultValue);
    useEffect(()=>{
        onChange(innerValue);
    },[innerValue]);
    return <button className={classNames("ks-switch_wrapper",{
        "ks-witch_checked":innerValue
    })} onClick={()=>{
        setInnerValue(!innerValue);
    }}>
        <span className={"ks-switch_inner"}>

        </span>
    </button>
};