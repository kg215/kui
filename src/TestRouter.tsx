import React, {FC} from "react";
import {Route } from "react-router";
import {HashRouter,BrowserRouter} from "react-router-dom";


class TestRouter extends React.Component<React.HTMLAttributes<HTMLElement>>{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <HashRouter>
            <Route path='/'>
                <Route path='/test' component={Test}/>
            </Route>
        </HashRouter>;
    }
}
const Home:FC<React.PropsWithChildren<{}>> = ()=>{
    return <div>Home</div>
};
const Test:FC<React.PropsWithChildren<{}>> = ()=>{
    return <div>test</div>
};



export default TestRouter;