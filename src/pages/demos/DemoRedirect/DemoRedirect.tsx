import './DemoRedirect.scss';
import React from 'react';
import {useLocation, useNavigate} from 'react-router';

interface IProps {
    title?: string;
}

const DemoRedirect: React.FC<IProps> = ({title}) => {
    const location = useLocation();
    const {from} = location.state || {from: {pathname: ''}};
    const navigate = useNavigate();
    if (from.pathname !== '') {
        navigate(from.pathname);
        return null; // Render
    }

    return (
        <div>
            <h1 className={'demo-redirect__title'}>{title || 'Demo Redirect Page'}</h1>
            <p>
                If not logged in, this page will redirect to the login page. After
                logging in, it will redirect back from the login page to here.
            </p>
        </div>
    );
};

export default DemoRedirect;
