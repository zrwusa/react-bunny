import './App.scss';
import React from 'react';
import GridLayout from './layouts/grid-layout';
import FlexLayout from './layouts/flex-layout';
import {Route, Routes} from 'react-router';
// BrowserRouter or HashRouter.If BrowserRouter,
// When developing configure the webpack config devServer "historyApiFallback: true".
// When deploying the catch-all must be configured,/* to index.html,
// In this case we use the http-server,just config "?" as catch-all config at the end of the starting script E.g. http-server -P http://localhost:8080? ./build/
// More details visit link https://stackoverflow.com/a/36623117/14710617
import Home from './pages/home';
import DemoHome from './pages/demos/demo-home';
import DemoRoute from './pages/demos/demo-route';
import Login from './pages/login/Login';
import DemoThunkCC from './pages/demos/demo-thunk-cc';
import {AlgorithmScreen} from './pages/algorithm';
import {ChatPage} from './pages/chat/Chat';
import DemoThunkFC from './pages/demos/demo-thunk-fc';


interface IProps {
    title?: string,
}

const App: React.FunctionComponent<IProps> = () => {
    const flexboxLayout = true;
    const Content = <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/demo-home" element={<DemoHome/>}/>
        <Route path="/demo-route-cate/:id" element={<DemoRoute/>}/>
        {/*<Route path="/demo-fc-redux-hook" element={<DemoFCReduxHook />}/>*/}
        <Route path="/login" element={<Login/>}/>
        <Route path="/demo-thunk-cc" element={<DemoThunkCC/>}/>
        <Route path="/demo-thunk-fc" element={<DemoThunkFC/>}/>
        <Route path="/algorithm" element={<AlgorithmScreen/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        {/*<Route path="/demo-redirect" element={<Protected><DemoRedirect/></Protected>} />*/}
    </Routes>;

    return (
        flexboxLayout ?
            <FlexLayout title={'Demo Flexbox Layout'}>{Content}</FlexLayout>
            : <GridLayout title={'Demo Grid Layout'}>{Content}</GridLayout>
    );
};

export default App;
