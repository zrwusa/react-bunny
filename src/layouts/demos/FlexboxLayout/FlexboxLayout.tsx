import './FlexboxLayout.scss';
import React from 'react';
import NavLinks from '../NavContent';
import {Article, Footer, Header, Nav} from '../../../components/containers';

interface FlexboxLayoutProps {
    title: string;
    children: React.ReactNode;
}

const FlexboxLayout: React.FC<FlexboxLayoutProps> = ({children}) => {
    return (
        <div className="flexbox-layout__container">
            <Header className="flexbox-layout__header"/>
            <div className="flexbox-layout__content-wrap">
                <Nav className="flexbox-layout__nav">
                    <NavLinks/>
                </Nav>
                <Article className="flexbox-layout__content">
                    {children}
                </Article>
            </div>
            <Footer className="flexbox-layout__footer"/>
        </div>
    );
};

export default FlexboxLayout;
