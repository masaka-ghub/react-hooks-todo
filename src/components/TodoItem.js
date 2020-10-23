import React from 'react';

function TodoItem({ id, value, hasDeleteButton, buttonLabel, onDeleteClick }) {
  return (
    <div className="todo-item">
      {hasDeleteButton && (
        <button className="remove-todo-item" type="button" onClick={() => onDeleteClick(id)}>
          {buttonLabel}
        </button>
      )}
      {value}
    </div>
  );
}

export default TodoItem;
