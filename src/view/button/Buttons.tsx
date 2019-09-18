import React,{Fragment} from "react";
import {Button} from "../../../lib/button";

class Buttons extends React.Component{

    render():React.ReactNode{
        return <Fragment>
            <Button>默认</Button>
            <Button type="dashed">虚线边框</Button>
            <Button type="primary">主要按钮</Button>
            <Button type="danger">错误按钮</Button>
            <Button type="link">链接按钮</Button>
        </Fragment>;
    }
}

export default Buttons;