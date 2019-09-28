import React, {Component} from "react";
import {Modal} from "../../../lib/modal";
import {Button} from "../../../lib/button";

export default class Modals extends Component{

    state={
        visible:false
    };

    render(){
        console.log(this.state.visible);
        return <div>
            <Button onClick={()=>{this.setState({visible:true})}}>弹出Modal</Button>
            <Modal visible={this.state.visible} onClose={()=>{this.setState({visible:false})}}>
                <Modal.Header> Basic Modal </Modal.Header>
                <Modal.Body>
                    Body
                </Modal.Body>
                <Modal.Footer style={{textAlign:"right"}}>
                    <Button onClick={()=>this.setState({visible:false})} style={{marginRight:10}}>
                        取消
                    </Button>
                    <Button type={"primary"}>
                        确认
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    }
}