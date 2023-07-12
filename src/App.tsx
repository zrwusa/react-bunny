import './App.scss';
import React from 'react';
import GridLayout from './layouts/demos/GridLayout';
import FlexboxLayout from './layouts/demos/FlexboxLayout';
import {Route, Routes} from 'react-router';
// BrowserRouter or HashRouter.If BrowserRouter,
// When developing configure the webpack config devServer "historyApiFallback: true".
// When deploying the catch-all must be configured,/* to index.html,
// In this case we use the http-server,just config "?" as catch-all config at the end of the starting script E.g. http-server -P http://localhost:8080? ./build/
// More details visit link https://stackoverflow.com/a/36623117/14710617
import Home from './pages/Home';
import DemoHome from './pages/demos/DemoHome';
import DemoRoute from './pages/demos/DemoRoute';
import Login from './pages/Login/Login';
import DemoThunkCC from './pages/demos/DemoThunkCC';
import {AlgorithmScreen} from './pages/Algorithm';


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
        <Route path="/algorithm" element={<AlgorithmScreen/>}/>
        {/*<Route path="/demo-redirect" element={<Protected><DemoRedirect/></Protected>} />*/}
    </Routes>;

    return (
        flexboxLayout ?
            <FlexboxLayout title={'Demo Flexbox Layout'}>{Content}</FlexboxLayout>
            : <GridLayout title={'Demo Grid Layout'}>{Content}</GridLayout>
    );
};

export default App;
