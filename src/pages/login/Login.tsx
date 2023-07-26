import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, logoutAction} from '../../actions/user';
import type {BunnyThunkDispatch, RootState} from '../../types';

interface ILoginProps {
    title?: string;
}

const Login: React.FC<ILoginProps> = ({title}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const location = useLocation();
    const access_token = useSelector((state: RootState) => state.userState.user.access_token);
    const dispatch = useDispatch<BunnyThunkDispatch>();
    const navigate = useNavigate();

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
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
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
