import React,{FC} from "react"
import classNames from "classnames";
import {StyledProps} from "../_type/StyledProps"
interface RowProps extends StyledProps{
    center?:boolean
}

const Row:FC<RowProps> = function({children,center=false,className,...props}={}){
    return <div className={classNames("row",className,{
        center
    })} {...props}>
        {children}      
    </div>
};

export default Row;