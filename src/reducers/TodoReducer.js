const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const id = state.lastId + 1;
      return { ...state, todoItems: [...state.todoItems, { ...action.todo, id }], lastId: state.lastId + 1 };
    case 'REMOVE_TODO':
      return { ...state, todoItems: state.todoItems.filter(todo => todo.id !== action.id) };
    case 'UPDATE_MESSAGE':
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default todoReducer;
