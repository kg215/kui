import React, {useState, Fragment, ReactNode, FC} from "react";
import _ from "lodash";
import {InputProps} from "./Input";

let checkBoxName=_.uniqueId("checkbox");
export interface optionsProps{
    text:string|ReactNode,
    value?:string
}
interface CheckBoxProps extends Omit<InputProps,"defaultValue"|"value">{
    defaultValue?:string[];
    value?:string[];
    options?:optionsProps[]
}

export const CheckBox:FC<CheckBoxProps>=function(props){
    const {name,defaultValue=[],value=[],options=[]}=props;
    const [values,setValues] = useState(
        defaultValue.length  && defaultValue
        || props.value
    );
    return <Fragment>
        {
            options.map((item,i)=>{
                return <div className="ks-check-group" key={i}>
                    <label>
                        <input onChange={(e)=>{
                            console.log(e.target.value,"e.target.value");
                        }} name={name||checkBoxName} className="ks-input" type="checkbox" />
                        <span className="checkbox" />
                        {item.text}
                    </label>
                </div>
            })
        }

    </Fragment>
};


