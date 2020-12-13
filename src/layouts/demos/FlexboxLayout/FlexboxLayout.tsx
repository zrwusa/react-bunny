import "./FlexboxLayout.scss";
import React from "react";
import {Link} from "react-router-dom";

interface IProps {
    title?: string,
}

const FlexboxLayout: React.FunctionComponent<IProps> = ({title, children}) => {
    return (
        <div className="flexbox-layout__container">
            <header className="flexbox-layout__header flexbox-layout-panel">
                <h1 className={"flexbox-layout__title--des"}>Header section</h1>
                <h1 className={"flexbox-layout__title--des"}>{title}</h1>
            </header>
            <nav className="flexbox-layout__sidebar flexbox-layout__nav flexbox-layout-panel">
                <h1 className={"flexbox-layout__title--des"}>Nav bar section</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/demo-home">Demo home page</Link>
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
            <article className="flexbox-layout__content flexbox-layout-panel">
                <h1 className={"flexbox-layout__title--des"}>Content section</h1>
                {children}
            </article>

            {/*<aside className="flexbox-layout__sidebar flexbox-layout__ad flexbox-layout-panel">*/}
            {/*    <h1 className={"flexbox-layout__title--des"} >Advertising section</h1>*/}
            {/*</aside>*/}
            <footer className="flexbox-layout__footer flexbox-layout-panel">
                <h1 className={"flexbox-layout__title--des"}>Footer section</h1>
            </footer>
        </div>
    );
}

export default FlexboxLayout;
