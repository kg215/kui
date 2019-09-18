import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {routers} from "../config/menus"

export function AppRouter(){
    return <HashRouter>
        <Route path="/">
            {routers}
        </Route>
    </HashRouter>
}