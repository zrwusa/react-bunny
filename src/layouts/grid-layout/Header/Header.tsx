import React from 'react';
import {useSelector} from 'react-redux';
import type {RootState} from '../../../types';

interface IProps {
    title?: string,
}

const Header: React.FC<IProps> = ({title}) => {
    const {user} = useSelector((store: RootState) => store.userState);

    return (
        <header className="grid-layout__header grid-layout__panel">
            <h1 className={'grid-layout__title--des'}>Header</h1>
            <h1 className={'grid-layout__title--des'}>{title}</h1>
            <span>{user.nickname}</span>
        </header>
    );
};

export default Header;
