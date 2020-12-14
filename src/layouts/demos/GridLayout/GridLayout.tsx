import "./GridLayout.scss";
import React from "react";
import cs from 'classnames';
import { Link} from "react-router-dom";


interface IProps {
    title?: string,
}

const GridLayout: React.FunctionComponent<IProps> = ({title,children}) => {
    return (
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
                    {children}
                </article>


                {/*<aside className="grid-layout__sidebar grid-layout__panel">Side bar section</aside>*/}
                {/*<div className="grid-layout__ad grid-layout__panel">Advertising section</div>*/}

                <footer className="grid-layout__footer grid-layout__panel">
                    <h1 className={"grid-layout__title--des"}>Footer</h1>
                </footer>
            </div>
    );
}

export default GridLayout;
