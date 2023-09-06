import React from 'react';
import {Navbar} from "./components/Navbar";
import './App.css';
import {CardList} from "./components/CardList";
import {NumberRangeFilter} from "./components/Filter/NumberRangeFilter";
import {InputWithButton} from "./components/Filter/InputWithButton";

const App = () => {
    const filterByCRewMembers = (from: number, to: number) => {
        console.log(`From: ${from}, To: ${to}`)
    }

    return (
        <div className="App">
            <Navbar />
            <div className="flex flex-col w-screen pt-20 border-gray-200 bg-gray-900">
                <div className="flex items-start justify-center gap-3">
                    <NumberRangeFilter heading="crew members" handler={filterByCRewMembers} />
                    <NumberRangeFilter heading="cost" handler={() => {}} />
                    <NumberRangeFilter heading="atmosphere speed" handler={() => {}} />
                </div>
                <div className="flex justify-center mt-3">
                    <CardList />
                </div>
                <InputWithButton label="Discount code:" placeholder="code" inputType="text" buttonText="Apply" />
            </div>
        </div>
    );
}

export default App;
