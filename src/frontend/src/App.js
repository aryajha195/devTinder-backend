import React from "react";
import { Outlet } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App h-lvh">
      <Outlet />
    </div>
  );
}



export default App;
