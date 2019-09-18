export function callBoth<T extends (...args:any[])=>void>(...fns:T[]) : T {
    return ((...args: any[])=>{
        let lastResult: any;
        for (const fn of fns) {
            if (typeof fn === "function") {
                lastResult = fn(...args);
            }
        }
        return lastResult;
    }) as T;
}