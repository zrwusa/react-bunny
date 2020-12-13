import "./App.scss";
import {hot} from "react-hot-loader/root";
import React from "react";
import GridLayout from "./layouts/demos/GridLayout";
import FlexboxLayout from "./layouts/demos/FlexboxLayout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// BrowserRouter or HashRouter.If BrowserRouter,
// When developing configure the webpack config devServer "historyApiFallback: true".
// When deploying the catch-all must be configured,/* to index.html,
// In this case we use the http-server,just config "?" as catch-all config at the end of the starting script E.g. http-server -P http://localhost:8080? ./build/
// More details visit link https://stackoverflow.com/a/36623117/14710617
import Home from "./pages/Home";
import DemoHome from "./pages/demos/DemoHome";
import DemoRoute from "./pages/demos/DemoRoute";
import DemoFCReduxHook from "./pages/demos/DemoFCReduxHook";
import Login from "./pages/Login/Login";
import DemoThunkCC from "./pages/demos/DemoThunkCC";
import {PrivateRoute} from "./components/PrivateRoute";
import DemoRedirect from "./pages/demos/DemoRedirect";

interface IProps {
    title?: string,
}

const App: React.FunctionComponent<IProps> = () => {
    const flexboxLayout = false;
    const Content = <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/demo-home" exact component={DemoHome}/>
        <Route path="/demo-route-cate/:id" component={DemoRoute}/>
        <Route path="/demo-fc-redux-hook" component={DemoFCReduxHook}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/demo-thunk-cc" component={DemoThunkCC}/>
        <PrivateRoute path="/demo-redirect" component={DemoRedirect} redirectPath="login"/>
    </Switch>

    return (<Router>
        {flexboxLayout ?
            <FlexboxLayout title={"Demo Flexbox Layout"}>{Content}</FlexboxLayout>
            : <GridLayout title={"Demo Grid Layout"}>{Content}</GridLayout>}
    </Router>);
}

export default hot(App);
