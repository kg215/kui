import React, {FC, ReactNode} from "react";
import classNames from "classnames";
import {Text,TextProps} from "../text";
import {StyledProps} from "../_type";

interface ItemProps extends StyledProps{
    required?:boolean;
    label:string|React.ComponentType;
    status?:"error"|"success"|"none";
    message?:string|ReactNode;
}
export const Item:FC<ItemProps>=function(props){
    const {label,children,status="none",message="",required=false}=props;
    let theme:TextProps["theme"]="default";
    if(status==="error"){
        theme="danger";
    }
    if(status==="success"){
        theme="primary";
    }
    return <div className={classNames("ks-form__item",{required})}>
        <div className="ks-form__label-col">
            <label>{label}</label>
        </div>
        <div className={classNames("ks-form__controller",{
            [`ks-form__controller-${status}`]:status&&status!=="none"
        })}>
            {React.Children.map(children,(child:React.ReactElement) => child&&React.cloneElement(child,{required,status}))}
            {status==="none"?
                null
                :
                <Text theme={theme}>
                    {message}
                </Text>
            }
        </div>
    </div>
};
