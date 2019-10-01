import React, {
    ChangeEvent,
    RefAttributes,
    RefForwardingComponent,
    forwardRef,
    Ref,
    ReactNode,
    useState,
    useEffect, useCallback
} from "react";
import {StyledProps} from "../_type";
import classNames from "classnames";
import {CheckBox} from "./CheckBox";
import {func} from "prop-types";
export interface optionsProps<T=string|number>{
    text?:T;
    component?:ReactNode;
    value?:T;
}
export interface InputProps extends StyledProps,Omit<
        React.InputHTMLAttributes<HTMLInputElement> &
        React.TextareaHTMLAttributes<HTMLTextAreaElement> &
        RefAttributes<null>,
        "onChange" | "size" | 'defaultValue'
    >{
    defaultValue?:string|number;
    value?:string|number;
    status?:"error"|"success"|"none";
    onChange?:(value:string,{event}?:{event:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>})=>void;
}

export const Input:RefForwardingComponent<HTMLInputElement|HTMLTextAreaElement,InputProps> = forwardRef(function (props,ref) {
    const {onChange=()=>{},status="none",type="text",children,className,value="",defaultValue="",...inputProps} = props;
    const [innerValue,setInnerValue] = useState<string|number>(defaultValue);
    useEffect(function () {
        setInnerValue(value);
    },[value]);
    const handleChange = useCallback(function (event) {
        setInnerValue(event.target.value);
        onChange(event.target.value,{event});
    },[]);
    return type==="textarea"? <textarea
        className={classNames("ks-input",className)}
        ref={ref as Ref<HTMLTextAreaElement>}
        onChange={handleChange}
        {...inputProps}
    />:type==="checkbox"?<CheckBox />:<input
        type={type}
        onChange={handleChange}
        className={classNames("ks-input",{
            [`ks-input-${status}`]:status&&status!=="none"
        },className)}
        ref={ref as Ref<HTMLInputElement>}
        value={String(innerValue)}
        {...inputProps}
    />;
});


