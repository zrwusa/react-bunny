import React, {Component} from 'react';

type IProps = { title?: string, }
type IStates = { name: string, }

class Home extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: 'Page Home'
        };
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={'demo-home__title--des'}>{this.props.title}</h1>
            <span>{this.state.name}</span>
        </div>);
    }
}

export default Home;
