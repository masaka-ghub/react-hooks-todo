import React from 'react';
import TodoItem from '../components/TodoItem';

const TodoItemContainer = ({ id, value, dispatchDelete }) => {
  const onDeleteClick = () => dispatchDelete(id);

  const props = { id, value, hasDeleteButton: true, buttonLabel: '削除', onDeleteClick };

  return <TodoItem {...props} />;
};

export default TodoItemContainer;
