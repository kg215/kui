import React, {FC, RefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import classNames from "classnames";
import {Select} from "../form/Select";
import {Input} from "../form";
import {Icon} from "../icon";
import {Button} from "../button";

interface PaginationProps {
    total?:number;
    size?:number;
    current?:number;
    gap?:number;
    onChange?:(current:PaginationProps["current"])=>void
}

export const Pagination:FC<PaginationProps> = function(props){
    const {total=0,size=10,current=1,gap=5,onChange=()=>{}}=props,
        jumpRef = useRef<null>(null),
        [pageIndex,setPageIndex] = useState<number>(current),
        [pageSize,setPageSize] = useState(size),
        [start,setStart] = useState(0),
        [end,setEnd] = useState(0);
    const totalPage = useMemo(()=>Math.ceil(total/pageSize),[total,pageSize]);
    const step = useMemo(()=>Math.floor(gap/2),[gap]);
    const pageSpan = useMemo(()=>{
        let newPageIndex = Math.min(totalPage,pageIndex);
        setPageIndex(newPageIndex);
        let start = Math.max(1,newPageIndex-step),
            end = Math.min(start+gap-1,totalPage);
        if(end+gap-step>=totalPage){
            start = Math.max(end-gap+1,1);
        }
        setStart(start);
        setEnd(end);
        return Object.keys(new Array(end + 1).fill("")).slice(start, end + 1);
    },[pageIndex,totalPage]);
    /**
     * 监听表单回车
     */
    useEffect(()=>{
        function keyDown(e:HTMLElementEventMap["keydown"]) {
            if(e.key==="Enter"){
                setPageIndex(Number((e.target as HTMLInputElement).value));
            }
        }
        (jumpRef as RefObject<HTMLInputElement>).current.addEventListener("keydown",keyDown);
        return function () {
            (jumpRef as RefObject<HTMLInputElement>).current.removeEventListener("keydown",keyDown);
        }
    },[]);
    /**
     * 当前页变化
     */
    useEffect(function(){
        setPageIndex(Math.max(1,Math.min(pageIndex,totalPage)))
    },[pageIndex]);
    const prev = useCallback(()=>{
        let index = Math.max(1,pageIndex-1);
        setPageIndex(index);
    },[pageIndex]);
    const next = useCallback(()=>{
        let index = Math.min(pageIndex+1,totalPage);
        onChange(index);
        setPageIndex(index);
    },[pageIndex]);
    /**
     * 每页条数
     */
    const pageSizeChange = useCallback((v)=>{
        setPageSize(v);
    },[]);
    return <div className={"ks-page"}>
            <div className={"ks-page_box"}>
                <Button disabled={pageIndex===1||totalPage===0}  onClick={()=>setPageIndex(1)} className={classNames("ks-page_item",{
                    "disabled":pageIndex===1||totalPage===0
                })} >
                    <Icon type={"angle-double-left"} />
                </Button>
                <Button disabled={pageIndex===1||totalPage===0} onClick={prev} className={classNames("ks-page_item",{
                    "disabled":pageIndex===1||totalPage===0
                })} >
                    <Icon type={"angle-left"} />
                </Button>
                {start>1&&<span onClick={()=>{setPageIndex(pageIndex-gap)}} className={"ks-page_batch ks-page_batch_prev"}>
                    <Icon type={"angle-double-left"} />
                    <span className={"dot"}>•••</span>
                </span>}
                {
                    pageSpan.map(page=><span key={"page"+page} className={
                            classNames("ks-page_item",{
                                "ks-page_active":Number(pageIndex)===Number(page)
                            })
                        } onClick={()=>{
                            setPageIndex(Number(page));
                    }}>
                        {page}
                    </span>)
                }
                {end<totalPage&&<span onClick={()=>{setPageIndex(pageIndex+gap)}} className={"ks-page_batch ks-page_batch_next"}>
                    <Icon type={"angle-double-right"} />
                    <span className={"dot"}>•••</span>
                </span>}
                <Button disabled={pageIndex===totalPage} onClick={next} className={classNames("ks-page_item",{
                    "disabled":pageIndex===totalPage
                })} >
                    <Icon type={"angle-right"} />
                </Button>
                <Button disabled={pageIndex===totalPage} onClick={()=>setPageIndex(totalPage)} className={classNames("ks-page_item",{
                    "disabled":pageIndex===totalPage
                })} >
                    <Icon type={"angle-double-right"} />
                </Button>
                <Select defaultOption={false} onChange={pageSizeChange} defaultValue={10} className={"ks-page_item"} options={[
                    {text:"10 条每页",value:"10"},
                    {text:"20 条每页",value:"20"},
                    {text:"30 条每页",value:"30"},
                    {text:"40 条每页",value:"40"},
                    {text:"50 条每页",value:"50"},
                ]} />
                <span className={"ks-page_jump"}>
                    跳至
                    <Input value={pageIndex} ref={jumpRef} />
                    页
                </span>
            </div>

        </div>
};