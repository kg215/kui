import React, {FC, Fragment, MouseEvent, MouseEventHandler, useCallback, useEffect, useState} from "react";
import ReactDom from "react-dom";
import {StyledProps} from "../_type";
import {createRocket} from "../_utils/create-rocket";
import {func} from "prop-types";

interface ModalWrapperProps  extends StyledProps{
    visible?:any;
    onClose?:()=>void;
}

const ModalWrapper:FC<ModalWrapperProps> = function (props) {
    const  {children,visible=false,onClose=()=>{},...attrs} = props;
    const [display,setDisplay] = useState<boolean>(visible);
    const handleSetDisplay = useCallback(function (visible) {
        setDisplay(visible);
        if(!visible){
            onClose();
        }
    },[]);
    useEffect(function(){
        handleSetDisplay(visible);
    },[visible]);
    let C = children?
        React.Children.map(children,
            (child:React.ReactElement)=>{
                return typeof child==="string"?child:React.cloneElement(child,{
                    setDisplay:handleSetDisplay,
                    ...attrs
                })
            })
        :
        void 0;
    return display?ReactDom.createPortal(<div className={"modal-layer"}>
        <div className={"modal-layer_mask"} />
        <div className={"modal-pad"} />
        <div className={"modal-box"}>
            <div className={"modal"}>
                {C}
            </div>
        </div>
        <div className={"modal-pad"} />
    </div>,document.querySelector("#modal-root")):<Fragment />;
};
ModalWrapper.displayName="Modal";
interface ModalHeaderProps extends StyledProps{
    title?:string;
    readonly setDisplay?:(visible:boolean)=>void;
}
const ModalHeader:FC<ModalHeaderProps>=function (
    {
        setDisplay=()=>{},
        title,
        children
    }
) {
    const handleOnClose = useCallback(function () {
        setDisplay(false);
    },[]);
    return <div className={"modal-header"}>
            <span className={'modal-header_title'}>
                {children||title}
            </span>
        <span onClick={handleOnClose} className={"modal-close"}> X </span>
    </div>
};


interface ModalFooterProps extends StyledProps{
    onOk?:(e?:MouseEvent<HTMLButtonElement>)=>void;
    onClose?:()=>void;
    readonly setDisplay?:(visible?:boolean)=>void;
}

const ModalFooter:FC<ModalFooterProps> = function(
    {
        children,
        style
    }
){
    return <div className={"modal-footer"} style={style}>
        {children}
    </div>
};
const Modal=Object.assign(ModalWrapper,{
    Header:ModalHeader,
    Body:createRocket("ModalBody","div.modal-body"),
    Footer:ModalFooter,
});
export {Modal};