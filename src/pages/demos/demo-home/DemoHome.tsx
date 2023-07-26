import './DemoHome.scss';
import React from 'react';
import Button from '@mui/material/Button';
import FCCard from '../../../components/demos/fc-card';
import CCClock from '../../../components/demos/cc-clock';
import {ApiRequest} from '../../../components';
import {Panel} from '../../../components';

export interface DemoHomeProps{ title?: string; }

const DemoHome: React.FC<DemoHomeProps> = () => {

    return (<div className={'demo-home'}>
        <h1 className={'demo-home__title--des'}>Demo Home Page</h1>
        <Panel className="demo-home__component--panel">
            <FCCard title="FCCard is a FunctionComponent" paragraph="I am paragraph"><span>children</span></FCCard>
        </Panel>
        <Panel className="demo-home__component--panel">
            <CCClock title="CCClock is a ClassComponent"/>
        </Panel>
        <Panel className="demo-home__component--panel">
            <Button variant="contained">Third part component</Button>
        </Panel>
        <Panel className="demo-home__component--panel">
            <ApiRequest title={'Request is a http request component'}/>
        </Panel>
        <Panel className="demo-home__component--panel">
            <input type="text" placeholder={'I am placeholder'}/>
            {/*<div className="demo-autoprefixer"/>*/}
        </Panel>
        <Panel className="demo-home__component--panel">
            <h1 className={'demo-home__title--des'}>If the width of the view less than 500px i will be a svg
                image</h1>
            <div className="demo-home-image"/>
            <div className="demo-autoprefixer">Demo Autoprefixer</div>
        </Panel>

    </div>);
}

export default DemoHome;
