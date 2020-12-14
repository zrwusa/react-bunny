import React, {Component} from 'react';
import {RouteComponentProps} from "react-router-dom"

type IProps = { id: string, };
type IStates = { name: string, }

class DemoRoute extends Component<RouteComponentProps<IProps>, IStates> {
    constructor(props: RouteComponentProps<IProps>) {
        super(props);
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={"demo-home__title--des"}>Demo Route Page id = {this.props.match.params.id}</h1>
        </div>);
    }
}

export default DemoRoute
