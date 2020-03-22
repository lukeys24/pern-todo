import React, { Fragment, useEffect, useState } from "react";
import EditTodo from './EditToDo'

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async id => {
    try {
      fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" }).then(
        response => {
          console.log(response);
          setTodos(todos.filter(todo => todo.todo_id != id))
        }
        
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      return fetch("http://localhost:5000/todos")
        .then(response => response.json())
        .then(data => {
          setTodos(data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo}/></td>
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

export default ListTodos;
