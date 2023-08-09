import './DemoThunkCC.scss';
import React from 'react';
import {connect} from 'react-redux';
import {demoThunkAction} from '../../../actions/demo-thunk';
import type {BunnyThunkDispatch, DemoThunkReqPayload, RootState} from '../../../types';

const mapStateToProps = (rootState: RootState) => ({...rootState.demoThunkState});

const mapDispatchToProps = (dispatch: BunnyThunkDispatch) => ({
    demoThunkAction: (data: DemoThunkReqPayload) => dispatch(demoThunkAction(data)),
});

type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class DemoThunkCC extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleThunk(): void {
        this.props.demoThunkAction({
            'content': 'content1',
        }).then(value => {
            console.log('hello world, got', value);
        }).catch(err => {
            debugger
            console.error(err);
        });
    }

    render(): React.ReactNode {
        const {text, id} = this.props;
        return <div>
            <h1 className={'demo-thunk-cc__title'}>Demo Thunk CC Page</h1>
            <button onClick={this.handleThunk}>Thunk dispatch</button>
            <p>text:{text}</p>
            <p>id:{id}</p>
            <p>This demo shows you how to use a thunk dispatcher to dispatch data to Redux reducer,As in http request
                situation thunk works awesome.And shows you how to map states and dispatchers in Class Component(CC)</p>
        </div>;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DemoThunkCC);
