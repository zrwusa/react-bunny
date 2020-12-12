import "./DemoFCReduxHook.scss";
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoState1Action1} from "../../../stores/demo-state1/actions";
import {IRootState} from "../../../stores/models";


const DemoFCReduxHook: React.FunctionComponent<IRootState> = () => {
    const dispatch = useDispatch();
    const demoState1 = useSelector((store:IRootState) => store.demoState1);
    return (<div>
        <h1 className={"demo-fc-redux-hook__title"}>Demo FC Redux Hook Page</h1>
        <button onClick={() => dispatch(demoState1Action1({order:demoState1.order+1}))}>Dispatch something</button>
        <span>order:{demoState1.order}</span>
        <p>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</p>
    </div>);
}
export default DemoFCReduxHook
