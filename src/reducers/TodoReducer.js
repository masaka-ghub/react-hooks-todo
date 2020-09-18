const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todoItems: [...state.todoItems, action.value] };
    case 'UPDATE_MESSAGE':
      return { ...state, message: action.message };
  }
};

export default todoReducer;
