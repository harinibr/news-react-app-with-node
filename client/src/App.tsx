import "./App.scss";
import React from "react";
import AppRoutes from "./routing/appRouter";

function App() {
    return (
        <>
            <div className="newsApp">
                <AppRoutes />
            </div>
        </>
    );
}

export default App;
