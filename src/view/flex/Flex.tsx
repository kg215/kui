import React,{FC,Fragment} from "react";
import {Frow,Fcol} from "../../../lib/flex";

const Flex:FC=function(){
    return <Fragment>
        <Frow style={{marginBottom:20}} justify="space-between" alignItems="center">
            <Fcol style={{padding:10}} theme="primary" height={150}>不换行flex</Fcol>
            <Fcol style={{padding:10}} theme="danger">flex2</Fcol>
            <Fcol style={{padding:10,marginRight:"auto"}} align="flex-start" theme="primary">flex3</Fcol>
        </Frow>
        <Frow wrap="wrap">
            <Fcol style={{padding:10,marginBottom:1}} theme="primary" width="100%" span={10}>换行flex</Fcol>
            <Fcol style={{padding:10,marginBottom:1}} theme="danger">flex2</Fcol>
            <Fcol style={{padding:10,marginBottom:1}} theme="primary">flex3</Fcol>
        </Frow>
    </Fragment>
};

export default Flex;