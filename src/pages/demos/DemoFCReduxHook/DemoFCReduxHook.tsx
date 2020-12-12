import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoState1Action1} from "../../../stores/demo-state1/actions";
import {IRootState} from "../../../stores/models";


const DemoFCReduxHook: React.FunctionComponent<IRootState> = () => {
    const dispatch = useDispatch();
    const demoState1 = useSelector((store:IRootState) => store.demoState1);
    return (<div>
        <h1 className={"demo-description"}>DemoFCReduxHook page</h1>
        <button onClick={() => dispatch(demoState1Action1({order:demoState1.order+1}))}>Demo dispatch</button>
        <span>order:{demoState1.order}</span>
    </div>);
}
export default DemoFCReduxHook
