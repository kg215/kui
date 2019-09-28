import React,{Component} from "react";
import {Message} from "../../../lib/message";
import {Button} from "../../../lib/button";

export default class Messages extends Component{

    handleOnClick=()=>{
        Message.alert({
            message:"Message"
        });
    };

    render(){
        return <div>
            <Button onClick={this.handleOnClick}>
                点击弹出
            </Button>
        </div>;
    }
}