import React, {HTMLAttributes} from 'react';
import './Header.scss';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
}

export const Header: React.FC<HeaderProps> = (props) => {
    const {children, className, ...rest} = props;

    return (<header className={`bn-header ${className}`} {...rest}>
        {children}
    </header>)
}