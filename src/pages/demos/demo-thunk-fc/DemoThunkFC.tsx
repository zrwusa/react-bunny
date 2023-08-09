import './DemoThunkFC.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {demoThunkAction} from '../../../actions/demo-thunk';
import type {BunnyThunkDispatch, RootState} from '../../../types';

const DemoThunkFC = () => {
    const dispatch = useDispatch<BunnyThunkDispatch>();
    const {text, id} = useSelector((state: RootState) => state.demoThunkState);

    const handleThunk = async () => {
        const nothing = await dispatch(demoThunkAction({
            'content': 'content1',
        }));
        console.log(nothing);
    };

    return (
        <div>
            <h1 className={'demo-thunk-fc__title'}>Demo Thunk FC Page</h1>
            <button onClick={handleThunk}>Thunk dispatch</button>
            <p>text:{text}</p>
            <p>id:{id}</p>
            <p>This demo shows you how to use a thunk dispatcher to dispatch data to Redux reducer, As in http request
                situation thunk works awesome. And shows you how to map states and dispatchers in Function
                Component(FC)</p>
        </div>
    );
};

export default DemoThunkFC;
