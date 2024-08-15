import React, { Fragment } from "react";
import "./App.css";

import InputTodo from "./components/InputTodo";
import ListToDo from './components/ListTodo'

function App() {
  return (
     <div className="container">
       <InputTodo />
       <ListToDo />

     </div>
  );
}

export default App;
