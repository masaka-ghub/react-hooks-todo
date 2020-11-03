import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // useSelectorでtodoリストを参照する
  const todoItems = useSelector(state => state.todoItems);

  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();
  // Appで作成したcontextを使う
  // const { todoState, dispatch } = useContext(TodoContext);

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
        {todoItems.map((item, i) => (
          <TodoItem key={i} index={i} value={item} dispatch={dispatch} />
        ))}
      </div>
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={addItem}>Todo追加</button>
    </>
  );
};

export default TodoContainer;
