import './FlexboxLayout.scss';
import React from 'react';
import NavLinks from '../NavContent';
import Header from './Header';

interface IProps {
    title: string;
    children: React.ReactNode;
}

const FlexboxLayout: React.FC<IProps> = ({title, children}) => {
    return (
        <div className="flexbox-layout__container">
            <Header title={title}/>
            <nav className="flexbox-layout__sidebar flexbox-layout__nav flexbox-layout-panel">
                <h1 className={'flexbox-layout__title--des'}>Nav bar section</h1>
                <NavLinks/>
            </nav>
            <article className="flexbox-layout__content flexbox-layout-panel">
                <h1 className={'flexbox-layout__title--des'}>Content section</h1>
                {children}
            </article>

            {/*<aside className="flexbox-layout__sidebar flexbox-layout__ad flexbox-layout-panel">*/}
            {/*    <h1 className={"flexbox-layout__title--des"} >Advertising section</h1>*/}
            {/*</aside>*/}
            <footer className="flexbox-layout__footer flexbox-layout-panel">
                <h1 className={'flexbox-layout__title--des'}>Footer section</h1>
            </footer>
        </div>
    );
};

export default FlexboxLayout;
