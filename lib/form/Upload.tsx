import React, {FC,useRef,Fragment, Ref, useCallback} from 'react';
import {Button} from "../button";

export const Upload:FC = function () {
    const inputRef:Ref<HTMLInputElement> = useRef(null);
    const open = useCallback(function(){
        inputRef.current.click();
    },[]);

    return <Fragment>
        <input ref={inputRef} type="file"/>
        <Button onClick={open}>上传文件</Button>
    </Fragment>
};