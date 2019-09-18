import React from 'react'
import {RouteComponentProps} from "react-router";

interface AsyncComponentState {
    Component?:any
}
const AsyncComponent = (loadComponent:()=>Promise<any>) => (
    class AsyncComponent extends React.Component<{},AsyncComponentState> {
        state:AsyncComponentState = {
            Component: null,
        };

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then((module:any) => module.default)
                .then((Component:React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>) => {
                    this.setState({Component});
                })
                .catch((err:any) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const {Component} = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);

export default AsyncComponent;