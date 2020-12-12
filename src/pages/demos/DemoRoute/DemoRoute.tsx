import React, {Component} from 'react';
import {RouteComponentProps} from "react-router-dom"

type IDProps = { id: string,};
type IStates = {name: string,}

class DemoRoute extends Component<RouteComponentProps<IDProps>, IStates> {
    constructor(props: RouteComponentProps<IDProps>) {
        super(props);
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={"demo-description"}>DemoRoute page</h1>
        </div>);
    }
}

export default DemoRoute
