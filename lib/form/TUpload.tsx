import React, {forwardRef, Fragment, Ref, RefForwardingComponent} from "react";
import {useDropzone} from "react-dropzone";
import {upload,UploadEventContext,ProgressInfo} from "./uploadFile";
import {injectValue} from "../_utils/inject-value";
import {StyledProps} from "../_type";

interface UploadProps extends StyledProps{
    /**
     * 子元素用来打开上传窗口
     * *  - `open`: 打开文件选择
     *  - `getDraggerProps(props?)`: 在需要执行拖拽的根元素传递这些 props
     *  - `isDragging`: 是否有文件拖拽至可拖拽区域
     */
    children:
        | React.ReactNode
        | ((props: {
        open: () => void;
        getDraggerProps: (props?: object) => object;
        isDragging: boolean;
    }) => React.ReactNode);
    accept?:string|string[];
    maxSize?:number;
    name?:string;
    beforeUpload?: (file: File, fileList: File[], isAccepted: boolean) => boolean;
    /**
     * 上传开始时回调
     */
    onStart?: (file: File, context: { xhr: XMLHttpRequest }) => void;

    /**
     * 上传进度更新时回调
     */
    onProgress?: (progress: ProgressInfo, context: UploadEventContext) => void;

    /**
     * 上传成功时回调
     */
    onSuccess?: (result: object | string, context: UploadEventContext) => void;

    /**
     * 上传失败时回调
     */
    onError?: (error: Error, context: UploadEventContext) => void;
    action?: string;
    /**
     * 附加请求参数
     */
    data?: object | ((file: File) => object);
    /**
     * 设置请求头部
     */
    headers?: object | ((file: File) => object);
    /**
     * 请求时是否携带 cookie
     * @default false
     */
    withCredentials?: boolean;
}
export const TUpload:RefForwardingComponent<HTMLInputElement,UploadProps> = forwardRef(function ({
    accept,
    action,
    data,
    headers,
    maxSize,
    name="file",
    children,
    className,
    style,
    beforeUpload,
    withCredentials,
    onProgress,
    onSuccess,
    onError,
    onStart
}, ref) {
    const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
        accept,
        maxSize,
        noClick: true,
        noKeyboard: true,
        onDrop: uploadFiles,
    });


    function uploadFiles(acceptedFiles: File[], rejectedFiles: File[]) {
        const fileList = [...acceptedFiles, ...rejectedFiles];

        acceptedFiles.forEach(file => {
            uploadFile(file, fileList, true);
        });

        rejectedFiles.forEach(file => {
            uploadFile(file, fileList, false);
        });
    }

    function uploadFile(file: File, fileList: File[], isAccepted: boolean) {
        const couldUpload = beforeUpload(file, fileList, isAccepted);
        if (!couldUpload) {
            return;
        }
        setTimeout(() => request(file), 0);
    }

    function request(file: File) {
        const xhr = upload({
            action,
            filename: name,
            file,
            data: injectValue(data)(file),
            headers: injectValue(headers)(file),
            withCredentials,
            onProgress,
            onSuccess,
            onError,
        });

        onStart(file, { xhr });
    }

    return <Fragment>
        <input ref={ref as Ref<HTMLInputElement>} type="file"/>
    </Fragment>
});

