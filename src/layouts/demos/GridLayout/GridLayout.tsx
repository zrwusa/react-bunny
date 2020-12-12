import "./GridLayout.scss";
import React from "react";
import Home from "../../../pages/Home";
import DemoHome from "../../../pages/demos/DemoHome";
import Login from "../../../pages/Login";
import DemoRoute from "../../../pages/demos/DemoRoute";
import DemoFCReduxHook from "../../../pages/demos/DemoFCReduxHook";
import {PrivateRoute} from "../../../components/PrivateRoute";
import DemoThunkCC from "../../../pages/demos/DemoThunkCC";
import DemoRedirect from "../../../pages/demos/DemoRedirect";
import cs from 'classnames';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
// BrowserRouter or HashRouter.If BrowserRouter,
// When developing configure the webpack config devServer "historyApiFallback: true".
// When deploying the catch-all must be configured,/* to index.html,
// In this case we use the http-server,just config "?" as catch-all config at the end of the starting script E.g. http-server -P http://localhost:8080? ./build/
// More details visit link https://stackoverflow.com/a/36623117/14710617

interface IProps {
    title?: string,
}

const GridLayout: React.FunctionComponent<IProps> = ({title}) => {
    return (
        <Router>
            <div className={cs({"grid-layout__container": true, "grid-layout-with-side": false})}>
                <header className="grid-layout__header grid-layout__panel"><h1 className={"grid-layout__title--des"}>Header</h1>
                    <h1 className={"grid-layout__title--des"}>{title}</h1></header>
                <nav className="grid-layout__nav grid-layout__panel">
                    <h1 className={"grid-layout__title--des"}>Nav bar</h1>
                    <ul className={"grid-layout__nav-root"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/demo-home">Demo Home</Link>
                        </li>
                        <li>
                            <Link to="/demo-route-cate/1">Demo Route Cate A</Link>
                        </li>
                        <li>
                            <Link to="/demo-route-cate/2">Demo Route Cate B</Link>
                        </li>
                        <li>
                            <Link to="/demo-fc-redux-hook">Demo FC Redux Hook</Link>
                        </li>
                        <li>
                            <Link to="/demo-thunk-cc">Demo Thunk CC</Link>
                        </li>
                        <li>
                            <Link to="/demo-redirect">Demo Redirect</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>

                <article className="grid-layout__content grid-layout__panel">
                    <h1 className={"grid-layout__title--des"}>Content</h1>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/demo-home" exact component={DemoHome}/>
                        <Route path="/demo-route-cate/:id" component={DemoRoute}/>
                        <Route path="/demo-fc-redux-hook" component={DemoFCReduxHook}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/demo-thunk-cc" component={DemoThunkCC}/>
                        <PrivateRoute path="/demo-redirect" component={DemoRedirect} redirectPath="login"/>
                    </Switch>
                </article>


                {/*<aside className="grid-layout__sidebar grid-layout__panel">Side bar section</aside>*/}
                {/*<div className="grid-layout__ad grid-layout__panel">Advertising section</div>*/}

                <footer className="grid-layout__footer grid-layout__panel">
                    <h1 className={"grid-layout__title--des"}>Footer</h1>
                </footer>
            </div>
        </Router>
    );
}

export default GridLayout;
