import "./DemoRedirect.scss";
import React, {Component} from "react";
import {RouteComponentProps, Redirect} from "react-router-dom";
import {StaticContext} from "react-router";

type IStates = { redirectToReferrer: boolean, }
interface IProps extends RouteComponentProps<never, StaticContext, { from: { pathname: string } }> {title?: string}

class DemoRedirect extends Component<IProps,IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            redirectToReferrer: true,
        };
    }

    render(): React.ReactNode {
        const {from} = this.props.location.state ? this.props.location.state : {from: {pathname: ""}};
        if (this.state.redirectToReferrer && from.pathname !== "") {
            return <Redirect to={from} />
        }
        return (<div>
            <h1 className={"demo-redirect__title"}>Demo Redirect Page</h1>
            <p>If not login this page will redirect to login page,After login it will back redirect from login page to here.</p>
        </div>);
    }
}

export default DemoRedirect;


