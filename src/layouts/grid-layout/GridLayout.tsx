import './GridLayout.scss';
import React from 'react';
import cs from 'classnames';
import NavLinks from '../../components/nav-content';
import Header from './Header';

interface IProps {
    title: string;
    children: React.ReactNode;
}

const GridLayout: React.FC<IProps> = ({title, children}) => {
    return (
        <div className={cs({'grid-layout__container': true, 'grid-layout-with-side': false})}>
            <Header title={title}/>
            <nav className="grid-layout__nav grid-layout__panel">
                <h1 className={'grid-layout__title--des'}>Nav bar</h1>
                <NavLinks/>
            </nav>

            <article className="grid-layout__content grid-layout__panel">
                <h1 className={'grid-layout__title--des'}>Content</h1>
                {children}
            </article>


            {/*<aside className="grid-layout__sidebar grid-layout__panel">Side bar section</aside>*/}
            {/*<div className="grid-layout__ad grid-layout__panel">Advertising section</div>*/}

            <footer className="grid-layout__footer grid-layout__panel">
                <h1 className={'grid-layout__title--des'}>Footer</h1>
            </footer>
        </div>
    );
};

export default GridLayout;
