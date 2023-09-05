import React from 'react';
import {Navbar} from "./components/Navbar";
// import {Card} from "./components/Card";
import './App.css';
import {CardList} from "./components/CardList";

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <div className="flex justify-center w-screen pt-20 bg-white border-gray-200 dark:bg-gray-900">
                <CardList />
            </div>
        </div>
    );
}

export default App;
