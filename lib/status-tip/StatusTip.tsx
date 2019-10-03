import React, {FC, Fragment} from "react";
import {Icon} from "../icon";
import {StyledProps} from "../_type";
interface StatusTipProps extends StyledProps{
    status?:"loading"|"error"|"success"|"empty";
    loadingText?:string;
    errorText?:string;
    successText?:string;
    emptyText?:string;
}
export const StatusTip:FC<StatusTipProps> = function (props) {
    const {status,loadingText,errorText,successText,emptyText} = props;
    return <span className={props.className}>
        {
            status==="loading"
                ?
                <Fragment>
                    <span className={"ks-text"}>
                        {loadingText}
                    </span>
                    <Icon type="spinner" animated="pulse" size="lg" />
                </Fragment>
                :
                (
                    status==="error"
                        ?
                        <span className="ks-text text-danger">
                            {errorText}
                        </span>
                        :
                        (
                            status==="success"
                                ?
                                <span className="ks-text text-lv">
                                    {successText}
                                </span>
                                :
                                (
                                    status==="empty"
                                        ?
	                                    <span className={"ks-text"}>
                                            {emptyText}
                                        </span>
                                        :
                                        <Fragment />
                                )
                        )

            )
        }
    </span>
};