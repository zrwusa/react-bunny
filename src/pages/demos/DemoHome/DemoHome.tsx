import "./DemoHome.scss";
import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import FCCard from "../../../components/demos/FCCard";
import CCClock from "../../../components/demos/CCClock";
import Request from "../../../components/demos/Request";

type IProps = { title?: string }
type IStates = { name: string }

class DemoHome extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (<div className={"demo-home"}>
            <h1 className={"demo-description"}>DemoHome page</h1>
            <div className="demo-component__panel">
                <FCCard title="FCCard is a FunctionComponent" paragraph="I am paragraph"/>
            </div>
            <div className="demo-component__panel">
                <CCClock title="CCClock is a ClassComponent"/>
            </div>
            <div className="demo-component__panel">
                <Button variant="contained">Third part component</Button>
            </div>
            <div className="demo-component__panel">
                <Request title={"Request is a http request component"}/>
            </div>
            <div className="demo-component__panel">
                <input type="text" placeholder={"I am placeholder"}/>
                {/*<div className="demo-autoprefixer"/>*/}
            </div>
            <div className="demo-component__panel">
                <h1 className={"demo-description"}>If the width of the view less than 500px i will be a svg image</h1>
                <div className="demo-image"/>
                <div className="demo-autoprefixer">Demo Autoprefixer</div>
            </div>

        </div>);
    }
}

export default DemoHome
