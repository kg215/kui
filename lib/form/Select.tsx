import React, {
    RefForwardingComponent,
    Ref,
    Fragment,
    ChangeEvent,
    SelectHTMLAttributes, forwardRef, useState
} from "react";
import classNames from "classnames";
import {StyledProps} from "../_type";

interface SelectProps extends StyledProps,Omit<SelectHTMLAttributes<HTMLSelectElement>,"options"|"onChange">{
    options?:Partial<HTMLOptionElement>[];
    onChange?:(value:string,{event}:{event:ChangeEvent<HTMLSelectElement>})=>void;
}

export const  Select:RefForwardingComponent<HTMLSelectElement,SelectProps> = forwardRef(function({
    className,
    required,
    defaultValue,
    options=[],
    onChange=()=>{}
},ref){
    const [value,setValue] = useState(defaultValue);
    return <Fragment>
        <select className={classNames("ks-select",className)} defaultValue={value} onChange={(event)=>{
            onChange(event.target.value,{event});
            setValue(event.target.value);
        }} ref={ref as Ref<HTMLSelectElement>}>
            <option disabled={required&&value!==undefined}>请选择</option>
            {options.map((item,i)=>{
                let {text,value,disabled}=item;
                return <option key={"selected"+i} disabled={disabled} value={value||text}>{text}</option>
            })}
        </select>
    </Fragment>
});

