import React from "react";
import {StatusTip} from "../../../lib/status-tip"

export default class StatusTips extends React.Component{

    render(){
        return <div>
            <div>
                <StatusTip status={"loading"} loadingText={"加载中"} />
            </div>
            <div>
                <StatusTip status={"error"} errorText={"错误"} />
            </div>
            <div>
                <StatusTip status={"success"} successText={"加载完成"} />
            </div>
            <div>
                <StatusTip status={"empty"} emptyText={"空数据"} />
            </div>
        </div>
    }
}