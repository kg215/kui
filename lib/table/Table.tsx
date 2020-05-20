import React, {FC} from "react";
import classNames from "classnames";
export interface RecordsProps{
    [key:string]:any
}

interface ColsProps {
    key:string;
    title?:string;
    render?:(item:RecordsProps)=>void;
    width?:string|number;
}
interface ScrollAbleProps{
    height?:string|number;
    style?:React.CSSProperties
}
interface TableProps{
    cols:ColsProps[];
    records:RecordsProps[];
    scrollAble?:ScrollAbleProps;
}
export const Table:FC<TableProps> = function(
    {
        cols,
        records,
        scrollAble
    }
){
    let {height,style} = scrollAble,scrollStyle = Object.assign({height},style);
    return <div className={"ks-table"}>
        <div className={"ks-table_header"}>
            <table>
                <colgroup>
                    {
                        cols.map((item,i)=>{
                            return <col key={`colgroup-${i}`} style={item.width?{width:item.width,minWidth:item.width}:{}} />;
                        })
                    }
                </colgroup>
                <thead>
                <tr>
                    {
                        cols.map((item,i)=>{
                            return <th key={`th-${i}`}>{item.title}</th>;
                        })
                    }
                </tr>
                </thead>

            </table>
        </div>

        <div className={classNames({
            "table-scroll":scrollStyle.height
        })} style={scrollStyle}>
            <table>
                <colgroup>
                    {
                        cols.map((item,i)=>{
                            return <col key={`colgroup-${i}`} style={item.width?{width:item.width,minWidth:item.width}:{}} />;
                        })
                    }
                </colgroup>
                <tbody>
                {
                    records.map((item,i)=>{
                        return <tr key={`tbody-${i}`}>
                            {
                                cols.map((one,i)=>{
                                    return <td key={`one-${i}`}>
                                        {
                                            one.render?
                                                one.render(item)
                                                :
                                                item[one.key]
                                        }
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
};