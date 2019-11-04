import React from "react";
import ReactDOM from "react-dom";
import App from "./view/App";
import 'font-awesome/css/font-awesome.css'
import "../lib/style/style.less";

ReactDOM.render(
    <App />,
    document.querySelector("#root") as HTMLElement
);