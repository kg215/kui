import React, {FC, useState, Fragment, InputHTMLAttributes, ReactNode, useEffect} from "react";
import _ from "lodash";
import {StyledProps} from "../_type";


interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>,"onClick">{
    text?:ReactNode,
    onClick?:()=>void
}

const RadioOne:FC<RadioProps>=function ({
    defaultChecked,
    text,
    name,
    value,
}) {
    return <label className={"ks-radio_wrapper"}>
        <span className={"ks-radio"}>
            <input name={name} defaultChecked={defaultChecked} type="radio" value={value} />
            <span className={"ks-radio_inner"} />
        </span>
        <span className={"ks-radio_text"}>
            {text||value}
        </span>
    </label>
};
RadioOne.displayName="Radio";

interface RadioGroupProps<T=string|number> extends StyledProps{
    options:RadioProps[];
    onChange?:(value:T)=>void;
    defaultValue?:T;
    name?:string;
}

const RadioGroup:FC<RadioGroupProps> = function (
    {
        options=[],
        defaultValue,
        onChange=()=>{},
        name=_.uniqueId("radio_group")
    }
) {
    const [innerValue,setInnerValue] = useState<string|number>(defaultValue);
    useEffect(function () {
        if(innerValue){
            onChange(innerValue);
        }
    },[innerValue]);
    return <Fragment>
        {
            options.map((item,index)=>{
                return <span className={"ks-radio_group"} key={String(item.value)+index} onClick={()=>{
                    setInnerValue(String(item.value));
                }}>
                    <RadioOne name={name} text={item.text}  defaultChecked={item.defaultChecked || innerValue==item.value} value={item.value} />
                </span>
            })
        }
    </Fragment>;
};
RadioGroup.displayName="RadioGroup";

export const Radio = Object.assign(
    RadioOne,
    {
        Group:RadioGroup
    }
    );

