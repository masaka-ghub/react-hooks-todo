import React, { createContext, useReducer } from 'react';
import './App.css';
import TodoContainer from './components/TodoContainer';
import TodoMessage from './components/TodoMessage';
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
        <TodoMessage />
        <TodoContainer />
      </TodoListProvider>
    </div>
  );
}

export default App;
