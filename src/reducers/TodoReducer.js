const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todoItems: [...state.todoItems, action.value] };
    case 'REMOVE_TODO':
      return { ...state, todoItems: state.todoItems.filter((_, i) => i !== action.index) };
    case 'UPDATE_MESSAGE':
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default todoReducer;
