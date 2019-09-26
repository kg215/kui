import React, {FC, useCallback} from "react";
import {StyledProps} from "../_type";

interface PreImageProps extends StyledProps{
    src:string;
    alt?:string;
}
export const PreImage:FC<PreImageProps> = function({
    src,
    alt
}){
    let openImgWindow = useCallback(function () {
        let img = document.createElement("img");
        img.src=src;
        let doc=window.open("","_blank").document;
        doc.head.outerHTML="<style>html,body{width:100%;height: 10%;margin: 0;padding-top:50px;background: #0e0e0e;text-align: center;}body>img{width: 50%;}</style>";
        doc.body.append(img);
    },[]);
    return <div onClick={openImgWindow} className={"ks-img_pre_reader"}>
        <div className={"kr-img_pre"}>
            <img src={src}  alt={alt}/>
        </div>
    </div>
};