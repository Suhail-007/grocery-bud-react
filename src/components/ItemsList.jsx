import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

export default function(props) {
  const todosList = props.todos;

  return (
    <div className="grocery-list">
      {todosList.map(todo => {
        return (
        <div key={todo.id} className="item-container">
          <p className='todo-text' data-id={todo.id}>{todo.todo}</p>
					<div className="buttons">
				    <button type="button" className="edit-btn"><AiOutlineEdit /></button>
            <button onClick={() => props.onDelete(todo.id)} type="button" className="delete-btn"><BsTrash /></button>
    			</div>
		    </div>
        )
      })
      }
    </div>
  )
}