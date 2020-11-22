import React from 'react';
import "./appStyles.css";
import {hot} from 'react-hot-loader/root';
import ApiComponent from './components/apiComponent';

const App = () => {
    return (
            <main className="app">
                <ApiComponent/>
            </main>
    );
};

export default hot(App);
