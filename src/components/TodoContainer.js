import React, { useEffect, useReducer, useState } from 'react';
import todoReducer from '../reducers/TodoReducer';
import Timer from './Timer';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // todoItemsとメッセージをreducerで管理する
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '' });
  // Todoリストを管理
  // const [todoItems, setTodoItems] = useState([]);
  // 件数表示のメッセージ
  // const [message, setMessage] = useState('');

  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    dispatch({ type: 'UPDATE_MESSAGE', message: `TODO LIST: ${todoState.todoItems.length}件` });
    // setMessage(`TODO LIST: ${todoItems.length}件`);
  }, [todoState.todoItems.length]);

  const handleInput = e => {
    setInput(e.target.value);
  };

  const addItem = () => {
    // setTodoItems(prev => [...prev, input]);
    dispatch({ type: 'ADD_TODO', value: input });
  };

  return (
    <>
      <button onClick={() => setShowTimer(!showTimer)}>timer表示</button>
      {showTimer && <Timer></Timer>}
      <p>{todoState.message}</p>
      <div className="list-container">
        {todoState.todoItems.map((item, i) => (
          <TodoItem key={i} index={i} value={item} dispatch={dispatch} />
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addItem}>Todo追加</button>
    </>
  );
};

export default TodoContainer;
