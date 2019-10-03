import React from "react";
import {Table} from "../../../lib/table"
import {Button} from "../../../lib/button";

export default class Tables extends React.Component{

    render(){
        let header = [
            {key:"key1",title:"头部1",width:"500px",render:(item:any)=>{
                    return <p style={{wordBreak:"break-all"}}>
                        {item["key1"]}
                    </p>;
                }},
            {key:"key2",title:"头部2"},
            {key:"key3",title:"头部3"},
            {key:"key4",title:"头部4"},
            {key:"set",title:"操作",render:()=>{
                return <Button type={"link"}>操作</Button>;
            }},
        ];
        let list = [
            {key1:"zimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimuzimu",key2:"key2",key3:"key3",key4:"key4"},
            {key1:"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",key2:"key2",key3:"key3",key4:"key4"},
            {key1:"中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文",key2:"key2",key3:"key3",key4:"key4"},
            {key1:"中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文",key2:"key2",key3:"key3",key4:"key4"},
            {key1:"中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文",key2:"key2",key3:"key3",key4:"key4"},
        ];
        return <div>
            <Table scrollAble={{height:400}} cols={header} records={list} />
        </div>
    }
}