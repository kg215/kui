import React, {Component, Fragment} from "react";
import {Pagination} from "../../../lib/pagination";

export default class Paginations extends Component{

    render(){
        return <Fragment>
            <Pagination total={100} />
        </Fragment>
    }
}