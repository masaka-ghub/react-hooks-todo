import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // Todoリストを管理
  const [todoItems, setTodoItems] = useState([]);
  // 件数表示のメッセージ
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(`TODO LIST: ${todoItems.length}件`);
  }, [todoItems.length]);

  const handleInput = e => {
    setInput(e.target.value);
  };

  const addItem = () => {
    setTodoItems(prev => [...prev, input]);
  };

  return (
    <>
      <p>{message}</p>
      <div className="list-container">
        {todoItems.map((item, i) => (
          <TodoItem key={i} value={item} />
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addItem}>Todo追加</button>
    </>
  );
};

export default TodoContainer;
