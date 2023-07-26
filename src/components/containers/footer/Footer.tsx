import React, {HTMLAttributes} from 'react';
import './Footer.scss';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
}

export const Footer: React.FC<FooterProps> = (props) => {
    const {children, className, ...rest} = props;

    return (<footer className={`bn-footer ${className}`} {...rest}>
        {children}
    </footer>)
}