import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../App';

const TodoMessage = () => {
  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);

  useEffect(() => {
    dispatch({ type: 'UPDATE_MESSAGE', message: `TODO LIST: ${todoState.todoItems.length}件` });
  }, [todoState.todoItems.length]);

  return <p>{todoState.message}</p>;
};

export default TodoMessage;
