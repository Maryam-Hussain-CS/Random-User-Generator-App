import React from "react";
import UserInfo from "./components/UserInfo";
import "./App.css";

function App() {
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <UserInfo />
      </div>
    </main>
  );
}

export default App;
