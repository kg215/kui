import React, {useState, Fragment, ReactNode, FC, ChangeEvent, forwardRef, RefForwardingComponent, Ref} from "react";
import _ from "lodash";
import {InputProps,optionsProps} from "./Input";
let checkBoxName=_.uniqueId("checkbox");
export interface checkboxProps extends Omit<InputProps,"onChange"|"defaultValue"|"value">{
    text?:string;
    component?:ReactNode;
    onChange?:(value:boolean,{event}:{event?:ChangeEvent<HTMLInputElement>})=>void;
}
const CheckBoxOne:RefForwardingComponent<HTMLInputElement,checkboxProps> = forwardRef(function({
    text,
    component,
    onChange=()=>{},
    ...props
},ref){
    const [checked,setChecked] = useState(props.checked||false);
    return <div className="ks-check">
        <label>
            <input {...props} ref={ref as Ref<HTMLInputElement>} checked={checked} onChange={(event)=>{
                onChange(event.target.checked,{event});
                setChecked(event.target.checked);
            }} className="ks-input" type="checkbox" />
            <span className="checkbox" />
            {text||component}
        </label>
    </div>
});
CheckBoxOne.displayName="CheckBox";

interface CheckBoxGroupProps<T=string|number> extends Omit<InputProps,"onChange"|"defaultValue"|"value">{
    defaultValue?:T[];
    value?:T[];
    options?:optionsProps<T>[];
    onChange?:(value:T[],{event}:{event?:ChangeEvent<HTMLInputElement>})=>void;
}

export const CheckBoxGroup:FC<CheckBoxGroupProps>=function({
    name,
    defaultValue=[],
    value=[],
    options=[],
    onChange=()=>{}
}){
    const [values,setValues] = useState(
        defaultValue.length  && defaultValue.map(String)
        || value.map(String)
    );
    return <Fragment>
        {
            options.map((item,i)=>{
                let v = String(item.value||item.text);
                return <div className="ks-check-group ks-check" key={i}>
                    <label>
                        <input checked={values.map(String).includes(v)} onChange={(event)=>{
                            if(v){
                                let valuesSet = new Set(values);
                                event.target.checked?valuesSet.add(v):valuesSet.delete(v);
                                let newValues = [...valuesSet];
                                setValues(newValues);
                                onChange(newValues,{event});
                            }
                        }} name={name||checkBoxName} className="ks-input" type="checkbox" />
                        <span className="checkbox" />
                        {item.text||item.component}
                    </label>
                </div>
            })
        }
    </Fragment>
};

export const CheckBox=Object.assign(
    CheckBoxOne,
    {
        Group:CheckBoxGroup
    }
);



