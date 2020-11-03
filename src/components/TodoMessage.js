import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TodoMessage = () => {
  // Appで作成したcontextを使う
  // const { todoState, dispatch } = useContext(TodoContext);
  // useSelectorでtodoリストを参照する
  const todoItems = useSelector(state => state.todoItems);
  const message = useSelector(state => state.message);
  // useDispatchでdispatch関数を取得する
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'UPDATE_MESSAGE', message: `TODO LIST: ${todoItems.length}件` });
  }, [todoItems.length]);

  return <p>{message}</p>;
};

export default TodoMessage;
