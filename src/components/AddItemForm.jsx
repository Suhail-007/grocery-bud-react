export default function AddItemForm({ toastMessage, onAddItem, editItem, onEditItem }) {

  function onSubmitHandler(e) {
    e.preventDefault();
    
    const inputValue = e.target.input;

    if (editItem.isEditing) {
      onEditItem(editItem.id, inputValue.value);
      e.target.reset();
      return
    }

    if (inputValue.value.trim() === '') {
      toastMessage('Empty value', 'error');
      return
    }

    toastMessage('Added item to the list', 'success');

    onAddItem(inputValue.value);
    e.target.reset();
  }


  return (
    <form onSubmit={onSubmitHandler} className="grocery-form" >
      <div>
        <h4>Grocery Bud</h4>
        <div className='input-cont'>
          <input className="grocery-input" data-input-grocery type="text" placeholder="e.g. Eggs" name='input' defaultValue={editItem.isEditing ? editItem.value : ''} />
          <button className="add-item-btn" type="submit">{editItem.isEditing ? 'Edit' : 'Add item'}</button>
        </div>
      </div>
    </form>
  )
}