import React, {HTMLAttributes} from 'react';
import './Panel.scss';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
}

export const Panel: React.FC<PanelProps> = (props) => {
    const {children, className, ...rest} = props;

    return (<div className={`bn-panel ${className}`} {...rest}>
        {children}
    </div>)
}