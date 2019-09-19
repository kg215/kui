import React, {FC,PropsWithChildren} from "react";
import {StyledProps} from "../_type";

interface ItemProps extends StyledProps{
    label:string|React.ComponentType
}
export const Item:FC<ItemProps>=function(props){
    const {label}=props;
    return <div className="ks-form__item required">
        <div className="ks-form__label-col">
            <label>{label}</label>
        </div>
        <div className="ks-form__controller">
            {props.children}
        </div>
    </div>
};
