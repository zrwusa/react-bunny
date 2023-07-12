import React, {useState} from 'react';
import {Button, Input} from '@mui/material';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from '../../stores/models';
import {loginAction, logoutAction} from '../../stores/user/actions';
import {IThunkDispatch} from '../../stores/thunk';

interface ILoginProps {
    title?: string;
}

const Login: React.FC<ILoginProps> = ({title}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const location = useLocation();
    const access_token = useSelector((state: IRootState) => state.userState.user.access_token);
    const dispatch = useDispatch<IThunkDispatch>();
    const navigate = useNavigate();

    const handleEmailChange = (value: string): void => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string): void => {
        setPassword(value);
    };

    const handleLogin = (): void => {
        dispatch(loginAction({email, password})).then(() => {
            setRedirectToReferrer(true);
        });
    };

    const handleLogout = (): void => {
        dispatch(logoutAction({email}));
    };

    const {from} = location.state || {from: {pathname: ''}};

    if (redirectToReferrer && from.pathname !== '') {
        navigate(from.pathname);
        return null; // Render null during the redirection
    }

    return (
        <div>
            <h1 className={'demo-home__title--des'}>{title || 'Login Page'}</h1>
            <Input
                value={email}
                onChange={(e) => handleEmailChange(e.currentTarget.value)}
            />
            <Input
                value={password}
                onChange={(e) => handlePasswordChange(e.currentTarget.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleLogout}>Logout</Button>

            <span>{access_token}</span>
            <p>
                This demo shows you how to use a Private Redirect Component to redirect
                from an unauthorized page to this Login Page. And after authorizing,
                this will automatically redirect to the original page.
            </p>
        </div>
    );
};

export default Login;
