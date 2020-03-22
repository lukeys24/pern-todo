import React, { Fragment } from "react";
import "./App.css";

// Components
import InputToDo from "./components/InputToDo";
import ListTodos from "./components/ListToDo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
