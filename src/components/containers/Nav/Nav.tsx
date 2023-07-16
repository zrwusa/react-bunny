import React, {HTMLAttributes} from 'react';
import './Nav.scss';

export interface NavProps extends HTMLAttributes<HTMLDivElement> {
}

export const Nav: React.FC<NavProps> = (props) => {
    const {children, className, ...rest} = props;

    return (<nav className={`bn-nav ${className}`} {...rest}>
        {children}
    </nav>)
}