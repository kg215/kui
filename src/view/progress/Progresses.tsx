import React, {Component,Fragment} from "react";
import {Progress} from "../../../lib/pregress";
import {Button} from "../../../lib/button";

export default class Progresses extends Component{

    state={
        dangerPercent:10,
        lvPercent:0,
        warnPercent:20,
        primaryPercent:30
    };

    render(){
        return <Fragment>
            <div style={{margin:10}}>
                <Progress style={{marginBottom:10}} status={"danger"} percent={this.state.dangerPercent} />
                <Button style={{marginLeft:30}} type={"primary"} onClick={()=>{
                    this.setState({dangerPercent:this.state.dangerPercent+10});
                }}>
                    加加加
                </Button>
            </div>

            <div style={{margin:10}}>
                <Progress style={{marginBottom:10,height:16}} status={"lv"} percent={this.state.lvPercent} />
                <Button style={{marginLeft:30}} type={"lv"} onClick={()=>{
                    this.setState({lvPercent:this.state.lvPercent+10});
                }}>
                    加加加
                </Button>
            </div>

            <div style={{margin:10}}>
                <Progress style={{marginBottom:10,height:116}} status={"warn"} percent={this.state.warnPercent} />
                <Button style={{marginLeft:30}} type={"warn"} onClick={()=>{
                    this.setState({warnPercent:this.state.warnPercent+10});
                }}>
                    加加加
                </Button>
            </div>

            <div style={{margin:10}}>
                <Progress style={{marginBottom:10,height:2}} status={"primary"} percent={this.state.primaryPercent} />
                <Button style={{marginLeft:30}} type={"primary"} onClick={()=>{
                    this.setState({primaryPercent:this.state.primaryPercent+10});
                }}>
                    加加加
                </Button>
            </div>

        </Fragment>;
    }
}