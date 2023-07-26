import React, {Component, MouseEvent} from 'react';
import api from '../../../helpers/api';
import {AxiosResponse} from 'axios';
import type {BunnyProtocol, DemoPost} from '../../../types';

interface RequestProps { title: string, }
interface RequestStates { name: string, posts: Array<DemoPost>, }

export class ApiRequest extends Component<RequestProps, RequestStates> {
    constructor(props: RequestProps) {
        super(props);
        this.getPosts = this.getPosts.bind(this);
        this.handleGetSomethingClick = this.handleGetSomethingClick.bind(this);

        this.state = {
            name: '',
            posts: []
        };
    }

    getPosts(): void {
        api.get<any, AxiosResponse<BunnyProtocol<any, []>>>(`/posts?from=0&offset=10`)
            .then(res => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        posts: res.data.bunnyData
                    }
                });
            });
    }

    handleGetSomethingClick(event: MouseEvent): void {
        event.preventDefault();
        this.getPosts();
    }

    render(): React.ReactNode {
        return (<div>
            <h1 className={'demo-home__title--des'}>{this.props.title}</h1>
            <span>{this.state.name}</span>
            <button onClick={this.handleGetSomethingClick}>Click me to get posts</button>
            <ul>
                {this.state.posts.map(({id, content}) =>
                    <li key={id}>
                        {content}
                    </li>
                )}
            </ul>
        </div>);
    }
}