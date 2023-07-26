import * as React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import store from './stores/root';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<React.StrictMode>
        <Provider store={store}>
            <Router>
                <App title={'I am App title'}/>
            </Router>
        </Provider>
    </React.StrictMode>);
}



