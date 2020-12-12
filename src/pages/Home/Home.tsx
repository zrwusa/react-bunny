import React, {Component} from "react";

type IProps = { title?: string, }
type IStates = { name: string, }

class Home extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: "Home page name default"
        }
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={"demo-description"}>{this.props.title}</h1>
            <span>{this.state.name}</span>
        </div>);
    }
}

export default Home
