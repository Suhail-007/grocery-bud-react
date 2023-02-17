import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

export default function(props) {
  const todosList = props.todos;

  const editItem = function(id, value) {
    props.getEditItem(id, value)
  }

  return (
    <div className="grocery-list">
      {todosList.map(todo => {
        return (
        <div key={todo.id} className="item-container">
          <p>{todo.todo}</p>
					<div className="buttons">
				    <button onClick={() => editItem(todo.id, todo.todo)} type="button" className="edit-btn"><AiOutlineEdit /></button>
            <button onClick={() => props.onDelete(todo.id)} type="button" className="delete-btn"><BsTrash /></button>
    			</div>
		    </div>
        )
      })
      }
    </div>
  )
}