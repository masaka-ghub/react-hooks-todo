import React, { useContext, useState } from 'react';
import { TodoContext } from '../App';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);
  // todoItemsとメッセージをreducerで管理する
  // const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '' });

  const handleInput = e => {
    setInput(e.target.value);
  };

  const addItem = () => {
    // setTodoItems(prev => [...prev, input]);
    dispatch({ type: 'ADD_TODO', value: input });
  };

  return (
    <>
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
