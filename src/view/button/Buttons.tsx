import React,{Fragment} from "react";
import {Button} from "../../../lib/button";
import Row from "../../../lib/grid/Row";
import Col from "../../../lib/grid/Col";

class Buttons extends React.Component{

    render():React.ReactNode{
        return <Fragment>
            <Row>
                <Col span={2}>
                    <Button>默认</Button>
                </Col>
                <Col span={2}>
                    <Button type="dashed">虚线边框</Button>

                </Col>
                <Col span={2}>
                    <Button type="primary">主要按钮</Button>
                </Col>
                <Col span={2}>
                    <Button type="danger">错误按钮</Button>
                </Col>
                <Col span={2}>
                    <Button type="link">链接按钮</Button>
                </Col>
            </Row>
        </Fragment>;
    }
}

export default Buttons;