import React, {FC, useRef, Fragment, Ref, useCallback, ChangeEventHandler, useState} from 'react';
import {PreImage} from "../image";
import {func} from "prop-types";

interface progressProps extends Partial<ProgressEvent>{
    percent:number;
}

interface UploadProps {
    /**
     * 是否批量上传
     */
    multiple?: boolean;
    /**
     * 接受的文件类型
     */
    accept?: string;

    /**
     * 文件上传表单change事件
     */
    onChange?: (files: any[], event: ChangeEventHandler<HTMLInputElement>) => void;
    /**
     * 上传进度 50ms一次
     */
    onProgress?: (opts:progressProps,{ event, file }:{event:ProgressEvent,file:File}) => void;
    onLoad?:(event:ProgressEvent,fileReader:FileReader)=>void;
    onError?:(event:ProgressEvent,fileReader:FileReader)=>void;
    showFiles?:boolean;
}
interface collections{
    [key:string]:any
}

export const Upload:FC<UploadProps> = function ({
    children,
    accept,
    onChange=()=>{},
    onProgress=()=>{},
    onLoad=()=>{},
    onError=()=>{},
    multiple=true,
    showFiles,
}) {
    const [fileCollection,setFileCollection] = useState<collections>({});
    //给input添加ref属性
    const inputRef:Ref<HTMLInputElement> = useRef(null);
    //通过js触发input的点击事件,打开文件选择窗口
    const open = useCallback(function(){
        inputRef.current.value = null;
        inputRef.current.click();
    },[]);

    //定义文件表单的change事件
    let handleOnChange = useCallback(function (e) {
        //禁止冒泡事件
        e.stopPropagation();
        onChange(e.target.files,e);
        let files:FileList = e.target.files,newFileCollection:collections={};
        for(let [,file] of Object.entries(files)){

            let reader=new FileReader();
            /**
             * 文件mime类型是image类型就读取文件数据uri
             */
            if(/image/.test(file.type)){
                reader.readAsDataURL(file);
            }else{
                reader.readAsText(file);
            }
            //处理进度条
            reader.onprogress=function (event:ProgressEvent):void {
                if (event.lengthComputable && event.total) {
                    onProgress(
                        {
                            total: event.total,
                            loaded: event.loaded,
                            percent: (event.loaded / event.total) * 100,
                        },
                        { event, file }
                    );
                }
            };
            //这里上传好的处理文件
            reader.onload=function (event:ProgressEvent) {
                onLoad(event,this);
                if(showFiles&&/image/.test(file.type)){
                    console.log(fileCollection);
                    newFileCollection[file.name]=this.result;
                    setFileCollection({...fileCollection,...newFileCollection});
                }
            };
            //这里处理错误
            reader.onerror=function (event:ProgressEvent) {
                onError(event,this);
            };
        }
    },[fileCollection]);
    return <Fragment>
        <input
            ref={inputRef}
            multiple={multiple}
            accept={accept}
            className="ks-upload-input"
            onChange={handleOnChange}
            type="file"
        />
        {/**
        *凡是点击Upload组件子元素都会触发文件上传事件
        */}
        {React.Children.map(children,(child:React.ReactElement) => child&&React.cloneElement(child,{onClick:open}))}
        <div className={"ks-pre-img-wrapper"}>
            {fileCollection!={}&&Object.keys(fileCollection).map((name:string)=> {
                return <PreImage key={name} src={fileCollection[name]} alt={name} />
            })}
        </div>
    </Fragment>
};