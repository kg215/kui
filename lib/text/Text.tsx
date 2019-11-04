import React, {FC} from "react";
import classNames from "classnames";
import {TextProps} from "../_type";

export const Text:FC<TextProps> = function (props) {
    const {theme="default"}=props;
    return <div className={classNames("ks-text",props.className,{
        [`text-${theme}`]:theme
    })}>
        {props.children}
    </div>
};