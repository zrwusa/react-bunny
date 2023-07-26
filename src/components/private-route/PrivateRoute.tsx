import * as React from 'react';
import {RouteProps, useLocation, useNavigate} from 'react-router';
import {Navigate} from 'react-router-dom'
import store from '../../stores/root';

type IProps = RouteProps & {
    redirectPath: string;
    children: React.ReactNode;
}
const Protected: React.FC<IProps> = ({children}) => {
    const navigate = useNavigate();
    // const isAuth = !!localStorage.getItem(`access_token`);
    const isAuth = !!store.getState().userState.user.access_token;

    const location = useLocation();

    if (!isAuth) {
        // return <Route {...props}
        //               Component={() => {
        //                   navigate(props.redirectPath, {state: {from: location}});
        //                   return null;
        //               }}/>;

        return <Navigate to="/login" replace/>
    }
    return children;
}
export default Protected

