import React, { useState } from 'react';

const TodoContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // Todoリストを管理
  const [todoItems, setTodoItems] = useState([]);

  const handleInput = e => {
    setInput(e.target.value);
  };

  const addItem = () => {
    setTodoItems(prev => [...prev, input]);
  };

  return (
    <>
      <div className="list-container">
        {todoItems.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addItem}>Todo追加</button>
    </>
  );
};

export default TodoContainer;
