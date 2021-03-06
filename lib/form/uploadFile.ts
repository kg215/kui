export interface ProgressInfo {
    /**
     * 文件总大小
     */
    total: number;

    /**
     * 已上传部分大小
     */
    loaded: number;

    /**
     * 百分比
     */
    percent: number;
}

export interface UploadEventContext {
    /**
     * 进度事件
     */
    event: ProgressEvent;

    /**
     * XHR 对象
     */
    xhr: XMLHttpRequest;

    /**
     * 当前文件
     */
    file: File;
}

export interface UploadOption {
    action: string;
    file: File;
    filename: string;
    data?: {[key:string]:any};
    headers?: {[key:string]:any};
    withCredentials?: boolean;
    onProgress?: (progress: ProgressInfo, context: UploadEventContext) => void;
    onSuccess?: (result: object | string, context: UploadEventContext) => void;
    onError?: (error: Error, context: UploadEventContext) => void;
}

export function upload({
                           action,
                           file,
                           filename,
                           data = {},
                           headers = {},
                           withCredentials = false,
                           onProgress = () => null,
                           onSuccess = () => null,
                           onError = () => null,
                       }: UploadOption) {
    const formData = new FormData();
    formData.append(filename, file);

    const xhr = new XMLHttpRequest();

    xhr.onload = event => {
        if (!(xhr.status >= 200 && xhr.status < 300)) {
            const error = new Error(`${xhr.status} ${xhr.statusText}`);
            onError(error, { event, xhr, file });
            return;
        }

        const text = xhr.responseText || xhr.response;
        try {
            const data = JSON.parse(text);
            onSuccess(data, { event, xhr, file });
        } catch (err) {
            onSuccess(text, { event, xhr, file });
        }
    };

    xhr.onerror = event =>
        onError(new Error("Http Request Error"), { event, xhr, file });

    if (onProgress && xhr.upload) {
        xhr.upload.onprogress = event => {
            if (event.lengthComputable && event.total) {
                onProgress(
                    {
                        total: event.total,
                        loaded: event.loaded,
                        percent: (event.loaded / event.total) * 100,
                    },
                    { event, xhr, file }
                );
            }
        };
    }

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    xhr.open("POST", action, true);

    xhr.withCredentials = withCredentials;

    Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
    });

    xhr.send(formData);

    return xhr;
}
