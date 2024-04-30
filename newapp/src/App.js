import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import Login from './Login';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: formattedDate,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);

    handleDeleteTodo(index);

    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleUpdateToDo = () => {
    let updatedTodos = [...allTodos];
    updatedTodos[currentEdit] = currentEditedItem;
    setTodos(updatedTodos);
    setCurrentEdit('');
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodo));
    setCompletedTodos(reducedCompletedTodo);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="App">
       {loggedInUser ? (
        <>
       <button className="logout" onClick={handleLogout}>Logout</button>
      <h1>Todo Management Application</h1>
          <div className="todo-wrapper">
            <div className="todo-input">
              <div className="todo-input-item">
                <label>Title</label>
                <input
                  type="text" required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's the task title?"
                />
              </div>
              <div className="todo-input-item">
                <label>Description</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="What's the task description?"
                />
              </div>
              <div className="todo-input-item">
                <button
                  type="button"
                  onClick={handleAddTodo}
                  className="primaryBtn"
                >
                  Add
                </button>
              </div>
            </div><hr></hr>

            <div className="btn-area">
              <button
                className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
                onClick={() => setIsCompleteScreen(false)}
              >
                Todo
              </button>
              <button
                className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
                onClick={() => setIsCompleteScreen(true)}
              >
                Completed
              </button>
            </div>

            <div className="todo-list">
              {isCompleteScreen === false &&
                allTodos.map((item, index) => {
                  if (currentEdit === index) {
                    return (
                      <div className="edit__wrapper" key={index}>
                        <input
                          placeholder="Updated Title"
                          onChange={(e) => handleUpdateTitle(e.target.value)}
                          value={currentEditedItem.title}
                        />
                        <textarea
                          placeholder="Updated Description"
                          rows={4}
                          onChange={(e) => handleUpdateDescription(e.target.value)}
                          value={currentEditedItem.description}
                        />
                        <button
                          type="button"
                          onClick={handleUpdateToDo}
                          className="primaryBtn"
                        >
                          Update
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <div className="todo-list-item" key={index}>
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                        <div>
                          <AiOutlineDelete
                            className="icon"
                            onClick={() => handleDeleteTodo(index)}
                            title="Delete"
                          />
                          <BsCheckLg
                            className="check-icon"
                            onClick={() => handleComplete(index)}
                            title="Complete"
                          />
                          <AiOutlineEdit
                            className="check-icon"
                            onClick={() => handleEdit(index, item)}
                            title="Edit"
                          />
                        </div>
                      </div>
                    );
                  }
                })}

              {isCompleteScreen === true &&
                completedTodos.map((item, index) => (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>Completed on: {item.completedOn}</small>
                      </p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompletedTodo(index)}
                        title="Delete"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={setLoggedInUser} />
      )}
    </div>
  );
};

export default App;
