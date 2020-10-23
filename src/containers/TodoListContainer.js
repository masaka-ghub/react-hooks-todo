import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../App';
import TodoList from '../components/TodoList';

const TodoListContainer = () => {
  // 入力されたテキストを管理
  const [input, setInput] = useState('');
  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);
  // todoItemsとメッセージをreducerで管理する
  // const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '', lastId: 1 });

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
