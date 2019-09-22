import React, {FC} from "react";
import classNames from "classnames";
import {StyledProps} from "../_type";

export interface TextProps extends StyledProps{
    theme?:"danger"|"warn"|"primary"|"default";
}

export const Text:FC<TextProps> = function (props) {
    const {theme="default"}=props;
    return <div className={classNames("ks-text",props.className,{
        [`text-${theme}`]:theme
    })}>
        {props.children}
    </div>
};