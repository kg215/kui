import React,{FC} from "react"
import classNames from "classnames";
import {StyledProps} from  "../_type/StyledProps"
interface ColProps extends StyledProps{
    span?:number,
    start?:number,
    end?:number
}

const Col:FC<ColProps> = function(props){
    const {span=1,children,className,style={},start=null,end=null,...others} = props
    if(start){
        style["gridRowStart"] = start;
    }
    if(end){
        style["gridRowEnd"] = end;
    }
    return <div {...others} style={style} className={classNames(className,`col-${span}`)}>
        {children}
    </div>
}

export default Col;