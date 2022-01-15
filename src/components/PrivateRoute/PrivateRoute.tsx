import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import {useLocation} from 'react-router-dom';
import store from '../../stores';

export interface IProps extends RouteProps {
    redirectPath: string;
}

export const PrivateRoute: React.FC<IProps> = props => {

    // const isAuth = !!localStorage.getItem(`access_token`);
    const isAuth = !!store.getState().userState.user.access_token;

    const location = useLocation();
    if (isAuth) {
        return <Route {...props} />;
    } else {
        return <Route {...props}
                      component={() => <Redirect to={{pathname: props.redirectPath, state: {from: location}}}/>}/>;
    }
};

export default PrivateRoute;

