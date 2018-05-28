import React from 'react'
import TodoListItem from './TodoListItem'


const TodoList = ({ todos, onDeleteTodo, onMarkAs }) => {

	const TodoItems = todos.map((todo) => {
  		return (
  			<TodoListItem 
  				todo={todo} 
  				key={todo.id} 
  				deleteTodo={onDeleteTodo}
  				markAs={onMarkAs}
			/>
		)
  	});

    return (
    	<div>{TodoItems}</div>
    );
};

export default TodoList;