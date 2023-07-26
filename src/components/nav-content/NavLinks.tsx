import './NavLinks.scss';
import React from 'react';
import {Link} from 'react-router-dom';

const NavLinks: React.FunctionComponent = () => {
    return (
        <ul className={'grid-layout__nav-root'}>
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
                <Link to="/demo-thunk-fc">Demo Thunk FC</Link>
            </li>
            <li>
                <Link to="/demo-redirect">Demo Redirect</Link>
            </li>
            <li>
                <Link to="/algorithm">Algorithm</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/chat">Chat</Link>
            </li>
        </ul>
    );
};

export default NavLinks;
