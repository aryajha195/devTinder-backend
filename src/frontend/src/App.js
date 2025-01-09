import React from "react";
import { Outlet } from "react-router-dom";


import './App.css';

function App() {
  return (
    <div className="App h-full">
      <Outlet />
    </div>
  );
}



export default App;
