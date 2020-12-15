import React, {Component} from "react";
import {Button, Input} from "@material-ui/core";
import {RouteComponentProps, Redirect} from "react-router-dom";
import {StaticContext} from "react-router";
import {IRootState} from "../../stores/models";
import {IThunkDispatch} from "../../stores/thunk";
import {IReqLoginPayload} from "../../stores/user/payloads";
import {loginAction} from "../../stores/user/actions";
import {connect} from "react-redux";

const mapStateToProps = (rootState: IRootState) => ({access_token: rootState.user.access_token});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
    loginAction: (data: IReqLoginPayload) => dispatch(loginAction(data)),
});

interface IPropsWithRouteProps extends RouteComponentProps<never, StaticContext, { from: { pathname: string } }> {title?: string}

type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IPropsWithRouteProps;
type IStates = { name: string, email: string, password: string, redirectToReferrer: boolean, }

class Login extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: "",
            email: "bruno@email.com",
            password: "bruno",
            redirectToReferrer: false,
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleEmailChange(value: string): void {
        this.setState({email: value});
    }

    handlePasswordChange(value: string): void {
        this.setState({password: value});
    }

    handleThunk(): void {
        this.props.loginAction(this.state)
            .then(() => {
                this.setState({redirectToReferrer: true})
            });
    }

    render(): React.ReactNode {
        const {from} = this.props.location.state ? this.props.location.state : {from: {pathname: ""}};
        const {access_token} = this.props;
        if (this.state.redirectToReferrer && from.pathname !== "") {
            return <Redirect to={from} />
        }
        return (<div>
            <h1 className={"demo-home__title--des"}>Login Page</h1>
            <Input value={this.state.email}
                   onChange={(e) =>
                       this.handleEmailChange(e.currentTarget.value)
                   }
            />
            <Input value={this.state.password}
                   onChange={(e) =>
                       this.handlePasswordChange(e.currentTarget.value)
                   }/>
            <Button onClick={this.handleThunk}>Login</Button>
            <span>{access_token}</span>
            <p>This demo shows you how to use a Private Redirect Component to redirect from an unauthorized page to this Login Page.And after authorizing this will automatically redirect to original page.</p>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


