import React from 'react';
import TodoItemContainer from '../containers/TodoItemContainer';

const TodoList = ({ headerMessage, todoItems, dispatchDelete, inputValue, onTodoInputChange, appendTodo }) => {
  return (
    <>
      <p>{headerMessage}</p>
      <div className="list-container">
        {todoItems.map((item, i) => (
          <TodoItemContainer key={i} id={item.id} value={item.value} dispatchDelete={dispatchDelete} />
        ))}
      </div>
      <input type="text" value={inputValue} onChange={onTodoInputChange} />
      <button onClick={appendTodo}>Todo追加</button>
    </>
  );
};

export default TodoList;
