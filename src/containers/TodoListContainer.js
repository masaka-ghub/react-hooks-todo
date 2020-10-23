import React, { useEffect, useReducer, useState } from 'react';
import TodoList from '../components/TodoList';
import todoReducer from '../reducers/TodoReducer';

const TodoListContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // todoItemsとメッセージをreducerで管理する
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '', lastId: 1 });
  // Todoリストを管理
  // const [todoItems, setTodoItems] = useState([]);
  // 件数表示のメッセージ
  // const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch({ type: 'UPDATE_MESSAGE', message: `TODO LIST: ${todoState.todoItems.length}件` });
    // setMessage(`TODO LIST: ${todoItems.length}件`);
  }, [todoState.todoItems.length]);

  const onTodoInputChange = e => {
    setInput(e.target.value);
  };

  const appendTodo = () => {
    // setTodoItems(prev => [...prev, input]);
    dispatch({ type: 'ADD_TODO', todo: { value: input } });
  };

  const dispatchDelete = id => {
    console.log(id);
    dispatch({ type: 'REMOVE_TODO', id });
  };

  const props = {
    headerMessage: todoState.message,
    todoItems: todoState.todoItems,
    dispatchDelete,
    inputValue: input,
    onTodoInputChange: onTodoInputChange,
    appendTodo
  };

  return <TodoList {...props} />;
};

export default TodoListContainer;
