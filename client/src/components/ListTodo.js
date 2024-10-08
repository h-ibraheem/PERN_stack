import React, { Fragment, useState, useEffect } from "react";
import EditTodo from './EditTodo'
const ListToDo = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id)=>{
    const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos (
        todos.filter(
            todo => todo.todo_id !== id
        )
    )
  }

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table class="table text-center mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td className="text-left">{todo.description}</td>
              <td>
                <EditTodo todo={todo}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListToDo;
