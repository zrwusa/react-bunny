import React from 'react';
import {RouteProps, useParams} from 'react-router';

type IStates = { name: string, }
type IProps = RouteProps & {
    id: string;
}
const DemoRoute: React.FC = () => {
    const params = useParams();
    return (<div>
        <h1 className={'demo-home__title--des'}>Demo Route Page id = {params.id}</h1>
    </div>);
}

export default DemoRoute;
