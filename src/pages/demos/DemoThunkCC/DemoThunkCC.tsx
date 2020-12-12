import React from 'react';
import {connect} from 'react-redux';
import {IReqDemoThunkPayload} from "../../../stores/payloads";
import {IRootState} from "../../../stores/models";
import {IThunkDispatch} from "../../../stores/thunk";
import {demoThunkSuccessOrFailAction} from "../../../stores/demo-thunk/actions";

const mapStateToProps = (rootState: IRootState) => ({...rootState.demoThunk});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
    demoThunkSuccessOrFailAction: (data: IReqDemoThunkPayload) => dispatch(demoThunkSuccessOrFailAction(data)),
});

type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> ;

export class DemoThunkCC extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleThunk(): void {
        this.props.demoThunkSuccessOrFailAction({
            "text": "text1",
            "id":0
        }).then(value => {
            console.log('hello world, got', value);
        });
    }

    render(): React.ReactNode {
        const {text,id} = this.props;
        return <div>
            <h1 className={"demo-description"}>DemoThunkCC</h1>
            <button onClick={this.handleThunk}>Thunk action</button>
            <p>text:{text}</p>
            <p>id:{id}</p>
        </div>;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DemoThunkCC);
