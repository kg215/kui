import React, {FC, useRef, Fragment, Ref, useCallback, useEffect, ChangeEventHandler} from 'react';

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
    onLoad?:(event:ProgressEvent)=>void;
    onError?:(event:ProgressEvent)=>void;
}

export const Upload:FC<UploadProps> = function ({
    children,
    accept,
    onChange=()=>{},
    onProgress=()=>{},
    onLoad=()=>{},
    onError=()=>{},
    multiple=true,
}) {
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
        let files:FileList = e.target.files;
        for(let [,file] of Object.entries(files)){

            let reader=new FileReader();
            /**
             * 文件mime类型是image类型就读取文件数据ulri
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
                onLoad(event)
            };
            //这里处理错误
            reader.onerror=function (event:ProgressEvent) {
                onError(event);
            };
        }
    },[]);

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
    </Fragment>
};