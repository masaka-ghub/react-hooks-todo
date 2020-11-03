import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import TodoContainer from './components/TodoContainer';
import TodoMessage from './components/TodoMessage';
import todoReducer from './reducers/TodoReducer';

const store = createStore(todoReducer);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoMessage />
        <TodoContainer />
      </Provider>
    </div>
  );
}

export default App;
