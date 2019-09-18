import React,{FC} from "react"
import classNames from "classnames";
import {StyledProps} from "../_type/StyledProps"
interface RowProps extends StyledProps{};

const Row:FC<RowProps> = function({children,className,...props}){
    return <div className={classNames("row",className)} {...props}>
        {children}      
    </div>
}

export default Row;