import React from 'react';

function TodoItem({ index, value, dispatch }) {
  return (
    <div className="todo-item">
      <button className="remove-todo-item" type="button" onClick={() => dispatch({ type: 'REMOVE_TODO', index })}>
        削除
      </button>
      {value}
    </div>
  );
}

export default TodoItem;
