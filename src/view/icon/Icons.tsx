import React from "react";
import {Icon} from "../../../lib/icon";

class Icons extends React.Component{

    render():React.ReactNode{
        return <React.Fragment>
            <Icon type="camera-retro" size="lg" />
            <Icon type="camera-retro" size="2x" />
            <Icon type="camera-retro" size="3x" />
            <Icon type="camera-retro" size="4x" />
            <Icon type="camera-retro" size="5x" />
            <br />
            <Icon type="refresh" animated="spin" size="2x" />
            <Icon type="circle-o-notch" animated="spin" size="2x" />
            <Icon type="cog" animated="spin" size="2x" />
            <Icon type="spinner" animated="pulse" size="2x" />
            <Icon.IconStack>
                <Icon type="camera-retro" stack="1x" />
                <Icon type="ban" stack="2x" className={"text-danger"} />
            </Icon.IconStack>
        </React.Fragment>;
    }
}

export default Icons;