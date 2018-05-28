import React from 'react'

const TodoListItem = ({ todo, deleteTodo, markAs }) => {
	let isDone = <a href="#" title="Mark as done" onClick={() => markAs(todo)}><i className="checkmark icon"></i></a>,
		doneClass = '';
	if(todo.done) {
		doneClass = 'todo-done';
		isDone = <a href="#" title="Mark as undone" onClick={() => markAs(todo, 'undone')}><i className="history icon"></i></a>;
	}
	return (
		<div className={`ui divided list ${doneClass}`}>
		  	<div className="item">
		    	<div className="right floated content">
		    		{isDone}
		      		<a href="#" title="Remove" onClick={() => deleteTodo(todo)}><i className="remove icon"></i></a>
		    	</div>
		    	<div className="content">
		      		{todo.body}
		    	</div>
		  	</div>
	  	</div>
	)
}

export default TodoListItem;