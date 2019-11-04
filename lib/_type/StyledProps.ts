import React from "react";

export interface StyledProps{
    className?:string,
    style?:React.CSSProperties
}

export interface TextProps extends StyledProps{
	theme?:"danger"|"warn"|"primary"|"default";
}