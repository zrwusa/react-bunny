import React, {Component, MouseEvent} from 'react';
import api from '../../../helpers/api';
import {IDemoEmployee} from '../../../stores/models';

type IProps = { title: string, }
type IStates = { name: string, employees: Array<IDemoEmployee>, }

class Request extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.getEmployees = this.getEmployees.bind(this);
        this.handleGetSomethingClick = this.handleGetSomethingClick.bind(this);

        this.state = {
            name: '',
            employees: []
        };
    }

    getEmployees(): void {
        api.get(`/employees`)
            .then(res => {
                this.setState({
                    employees: res.data
                });
            });
    }

    handleGetSomethingClick(event: MouseEvent): void {
        event.preventDefault();
        this.getEmployees();
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={'demo-home__title--des'}>{this.props.title}</h1>
            <span>{this.state.name}</span>
            <button onClick={this.handleGetSomethingClick}>Click me to get employees</button>
            <ul>
                {this.state.employees.map((employee) =>
                    <li key={employee.email.toString()}>
                        {employee.first_name}
                    </li>
                )}
            </ul>
        </div>);
    }
}

export default Request;
