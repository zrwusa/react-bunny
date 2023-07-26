import React, {HTMLAttributes} from 'react';
import './Article.scss';

export interface ArticleProps extends HTMLAttributes<HTMLDivElement> {
}

export const Article: React.FC<ArticleProps> = (props) => {
    const {children, className, ...rest} = props;

    return (<article className={`bn-article ${className}`} {...rest}>
        {children}
    </article>)
}