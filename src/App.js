import React, { createContext, useReducer } from 'react';
import './App.css';
import TodoListContainer from './containers/TodoListContainer';
import todoReducer from './reducers/TodoReducer';

export const TodoContext = createContext();

const TodoListProvider = ({ children }) => {
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '', lastId: 1 });
  return <TodoContext.Provider value={{ todoState, dispatch }}>{children}</TodoContext.Provider>;
};

function App() {
  return (
    <div className="App">
      <TodoListProvider>
        <TodoListContainer />
      </TodoListProvider>
    </div>
  );
}

export default App;
