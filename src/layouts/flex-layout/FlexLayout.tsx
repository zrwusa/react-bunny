import './FlexLayout.scss';
import React from 'react';
import NavLinks from '../../components/nav-content';
import {Article, Footer, Header, Nav} from '../../components/containers';

interface FlexLayoutProps {
    title: string;
    children: React.ReactNode;
}

const FlexLayout: React.FC<FlexLayoutProps> = ({children}) => {
    return (
        <div className="flex-layout__container">
            <Header className="flex-layout__header"/>
            <div className="flex-layout__content-wrap">
                <Nav className="flex-layout__nav">
                    <NavLinks/>
                </Nav>
                <Article className="flex-layout__content">
                    {children}
                </Article>
            </div>
            <Footer className="flex-layout__footer"/>
        </div>
    );
};

export default FlexLayout;
