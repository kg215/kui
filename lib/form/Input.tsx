import React, {ChangeEvent, RefForwardingComponent, forwardRef, Ref, ReactNode} from "react";
import {StyledProps} from "../_type";
import classNames from "classnames";
import {CheckBox} from "./CheckBox";
export interface optionsProps<T=string|number>{
    text?:T;
    component?:ReactNode;
    value?:T;
}
export interface InputProps extends StyledProps,Omit<
        React.InputHTMLAttributes<HTMLInputElement> &
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        "onChange" | "size"
    >{
    defaultValue?:string;
    value?:string;
    status?:"error"|"success"|"none";
    onChange?:(value:string,{event}?:{event:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>})=>void;
}

export const Input:RefForwardingComponent<HTMLInputElement,InputProps> = forwardRef(function (props,ref) {
    //children属性一定要排除出来,不然会报错,因为input不是闭合标签
    const {onChange,status="none",type="text",children,className,...inputProps} = props;
    return type==="textarea"? <textarea
        className={classNames("ks-input",className)}
        ref={ref as Ref<HTMLTextAreaElement>}
        onChange={(event)=>{
            onChange(event.target.value,{event});
        }}
        {...inputProps}
    />:type==="checkbox"?<CheckBox />:<input
        type={type}
        onChange={(event)=>{
            onChange(event.target.value,{event});
        }}
        className={classNames("ks-input",{
            [`ks-input-${status}`]:status&&status!=="none"
        },className)}
        ref={ref as Ref<HTMLInputElement>}
        defaultValue={props.defaultValue}
        {...inputProps}
    />;
});


