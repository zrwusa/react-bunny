import React from 'react';
import {useSelector} from 'react-redux';
import {IRootState} from '../../../../stores/models';

interface IProps {
    title?: string,
}

const Header: React.FC<IProps> = ({title}) => {
    const {user} = useSelector((store: IRootState) => store.userState);

    return (
        <header className="flexbox-layout__header flexbox-layout-panel">
            <h1 className={'flexbox-layout__title--des'}>Header section</h1>
            <h1 className={'flexbox-layout__title--des'}>{title}</h1>
            <span>{user.nickname}</span>
        </header>
    );
};

export default Header;
