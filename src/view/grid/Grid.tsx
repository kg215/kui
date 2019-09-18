import React,{Fragment} from "react";
import {Row,Col} from "../../../lib/grid";


class Grid extends React.Component {
    render():React.ReactNode{
        let arr1 = new Array(24);
        for(let i=0;i<=arr1.length;i++){
            arr1.fill(i+1,i,i+1);
        }
        return <Fragment>
            <Row style={{backgroundColor:"#EEEEEE",marginBottom:10,padding:6,color:"#FFF"}}>
                {
                    arr1.map((v)=>{
                        return <Col key={"col"+v} span={1} style={{backgroundColor:"#DBDBDB"}}>
                            {v}
                        </Col>
                    })
                }
            </Row>
            <Row style={{backgroundColor:"#EEEEEE",marginBottom:10,padding:6,color:"#FFF"}}>
                {
                    arr1.slice(0,12).map((v)=>{
                        return <Col key={"col"+v} span={2} style={{backgroundColor:"#DBDBDB"}}>
                            {v}
                        </Col>
                    })
                }
            </Row>
            <Row style={{backgroundColor:"#EEEEEE",marginBottom:10,padding:6,color:"#FFF"}}>
                <Col span={4} start={1} end={4} style={{backgroundColor:"#DBDBDB"}} >
                    span4
                </Col>
                <Col span={16} style={{backgroundColor:"#DBDBDB"}}>
                    span16
                </Col>
                <Col span={4} style={{backgroundColor:"#DBDBDB"}}>
                    span4
                </Col>
                <Col span={8} style={{backgroundColor:"#DBDBDB"}}>
                    span8
                </Col>
                <Col span={4} start={2} end={4} style={{backgroundColor:"#DBDBDB"}}>
                    span4
                </Col>
                <Col span={4} start={2} end={4} style={{backgroundColor:"#DBDBDB"}}>
                    span4
                </Col>
                <Col span={4} start={2} end={4} style={{backgroundColor:"#DBDBDB"}}>
                    span4
                </Col>
            </Row>
            <Row style={{backgroundColor:"#EEEEEE",marginBottom:10,padding:6,color:"#FFF"}}>
                {
                    arr1.slice(0,2).map((v)=>{
                        return <Col key={"col"+v} span={12} style={{backgroundColor:"#DBDBDB"}}>
                            {v}
                        </Col>
                    })
                }
            </Row>
            <Row style={{backgroundColor:"#EEEEEE",marginBottom:10,padding:6,color:"#FFF"}}>
                <Col span={24} style={{backgroundColor:"#abcdef",height:50,lineHeight:"50px"}} >
                    header
                </Col>
                <Col span={3} style={{backgroundColor:"#97ac9a",height:300,lineHeight:"300px"}}>
                    menu
                </Col>
                <Col span={21} style={{backgroundColor:"#e4a9a9",height:300,lineHeight:"300px"}}>
                    body
                </Col>
                <Col span={24} style={{backgroundColor:"#585858",height:50,lineHeight:"50px"}} >
                    footer
                </Col>
            </Row>
        </Fragment>;
    }
}

export default Grid;
