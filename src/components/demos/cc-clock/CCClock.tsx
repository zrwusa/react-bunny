import React, {Component, MouseEvent} from 'react';

type IProps = { title: string, }
type IStates = { time: Date, intervalID: ReturnType<typeof setInterval>, }

class CCCLock extends Component<IProps, IStates> {

    tick(): void {
        this.setState((prevState) => {
            return {...prevState, time: new Date()}
        });
    }

    go(): void {
        const intervalID: ReturnType<typeof setInterval> = setInterval(() => this.tick(), 1000);
        this.setState((prevState) => {
            return {
                ...prevState, intervalID: intervalID
            }
        });
    }

    handleGoClick(event: MouseEvent): void {
        event.preventDefault();
        this.go();
    }

    handleStopClick(event: MouseEvent): void {
        event.preventDefault();
        clearInterval(this.state.intervalID);
    }

    UNSAFE_componentWillMount(): void {
        this.tick();
    }

    componentDidMount(): void {
        this.go();
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalID);
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={'demo-home__title--des'}>{this.props.title}</h1>
            <p>The current time is {this.state.time.toLocaleTimeString()}</p>
            <button onClick={this.handleStopClick.bind(this)}>Stop</button>
            <button onClick={this.handleGoClick.bind(this)}>Go</button>
        </div>);
    }
}

export default CCCLock;
