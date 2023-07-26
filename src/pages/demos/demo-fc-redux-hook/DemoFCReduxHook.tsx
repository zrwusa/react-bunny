import './DemoFCReduxHook.scss';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {demoHelloAction1} from '../../../actions/demo-hello';
import type {RootState} from '../../../types';

const DemoFCReduxHook: React.FC<RootState> = () => {

    const dispatch = useDispatch();
    const demoHelloState = useSelector((store: RootState) => store.demoHelloState);
    return (<div>
        <h1 className={'demo-fc-redux-hook__title'}>Demo FC Redux Hook Page</h1>
        <button onClick={() => dispatch(demoHelloAction1({order: demoHelloState.order + 1}))}>Dispatch something
        </button>
        <span>order:{demoHelloState.order}</span>
        <p>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</p>
    </div>);
};
export default DemoFCReduxHook;
