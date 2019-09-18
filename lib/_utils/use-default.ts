import { useState } from "react";
const noop = ()=>{};

export interface ChangeHandler<T, P extends any[]> {
    (value: T, ...args: P):void;
}

export function useDefault<T,P extends any[]>(
    value:T,
    defaultValue:T,
    onChange:ChangeHandler<T,P>
):[T,ChangeHandler<T,P>]{
    // 受控模式
    if (typeof value !== "undefined") {
        return [value, onChange || noop];
    }

    // 非受控模式
    const [internalValue, setInternalValue] = useState(defaultValue);
    return [
        internalValue,
        (newValue,...args)=>{
            setInternalValue(newValue);
            if (typeof onChange === "function") {
                onChange(newValue, ...args);
            }
        }
    ];


}