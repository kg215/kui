import React, {Fragment,Component} from "react";
import {Tab} from "../../../lib/tab";
import {TabPane} from "../../../lib/tab/Tab";

export default class Tabs extends Component{
    render(){
        return <Fragment>
            <Tab checkedKey="3">
                <Tab.Pane key="1" tab="Tab1">
                    <div style={{padding: "16px 24px"}}>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                    </div>
                </Tab.Pane>
                <TabPane key="2" disabled tab="Tab2">
                    <div style={{padding: "16px 24px"}}>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                    </div>
                </TabPane>
                <TabPane key="3" tab="Tab3">
                    <div style={{padding: "16px 24px"}}>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                    </div>
                </TabPane>
                <TabPane key="4" tab="Tab4">
                    <div style={{padding: "16px 24px"}}>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                        <div>热烈庆祝中华人名共和国成立70周年!</div>
                    </div>
                </TabPane>
            </Tab>
        </Fragment>
    }
}