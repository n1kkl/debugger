import React from 'react';
import {useApiUrl} from "./hooks/use-api-url";
import {Route, Routes} from "react-router-dom";
import {CreateChannelPage} from "./pages/create-channel";
import {ShowChannelPage} from "./pages/show-channel";

function App() {
    return (
        <div className="app h-full bg-gray-100 overflow-y-auto">
            <main className="w-full max-w-6xl h-full mx-auto flex flex-col py-5 px-5">
                <Routes>
                    <Route path="/" element={<CreateChannelPage/>}/>
                    <Route path="/channel/:id" element={<ShowChannelPage/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;
