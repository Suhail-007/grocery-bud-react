import { useState, useReducer, useEffect, useRef } from 'react';
import AddItemForm from './components/AddItemForm';
import ItemsList from './components/ItemsList';

import { toast } from 'react-toastify';
import Toast from './UI/Toast';
import './App.css';

const initialItems = [];

const itemReducer = function(state, action) {
  let updatedTodos = [];

  switch (action.type) {
    case 'ADD_ITEM':
      updatedTodos = [...state, createItem(action.value)];
      LOCALSTORAGE('todos', updatedTodos, 'set');
      return updatedTodos;
      break;

    case 'EDIT_ITEM':
      updatedTodos = state.map(item => {
        if (item.id === action.id) {
          item.todo = action.value;
        }
        return item
      })
      LOCALSTORAGE('todos', updatedTodos, 'set');
      return updatedTodos;
      break;

    case 'DELETE_ITEM':
      updatedTodos = state.filter(item => item.id !== action.id);
      LOCALSTORAGE('todos', updatedTodos, 'set');
      return updatedTodos;
      break;

    case 'CLEAR_ALL':
      LOCALSTORAGE('todos', '_', 'clearAll');
      return initialItems
      break

    case 'LOCAL_STORAGE':
      updatedTodos = LOCALSTORAGE('todos', '_', 'get')
      return updatedTodos
      break
    default:
      return initialItems
  }
}

const createItem = function(value) {
  return {
    id: new Date().getTime().toString(),
    todo: value
  }
}

const LOCALSTORAGE = function(key, value, action = 'set') {
  if (action === 'set') return localStorage.setItem(key, JSON.stringify(value));
  if (action === 'get') return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
  if (action === 'clearAll') return localStorage.removeItem(key);
}

function App() {
  const [todos, dispatchTodos] = useReducer(itemReducer, initialItems);
  const [editItemObj, setEditItemObj] = useState({
    id: '',
    value: '',
    isEditing: false
  })
  //to remove previous toast message
  const toastRef = useRef(null);

  useEffect(() => {
    dispatchTodos({ type: 'LOCAL_STORAGE' });
  }, [])

  const addItemHandler = function(item) {
    dispatchTodos({ type: 'ADD_ITEM', value: item });
  }

  const getEditItem = function(id, value) {
    setEditItemObj({
      id,
      value,
      isEditing: true
    })
  }

  const editItemHandler = function(id, value) {
    dispatchTodos({ type: 'EDIT_ITEM', id, value });
    setEditItemObj({
      id: '',
      value: '',
      isEditing: false
    })
  }

  const deleteItemHandler = function(id) {
    dispatchTodos({ type: 'DELETE_ITEM', id })
  }

  const clearAllHandler = function() {
    toastMessage('Cleared items list!', 'success');
    dispatchTodos({ type: 'CLEAR_ALL' });
  }

  function toastMessage(message, alertType) {
    toast.dismiss(toastRef.current);

    const config = {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 3000,
    }

    if (alertType === 'success') {
      toastRef.current = toast.success(message, {
        ...config,
        className: 'success-toast'
      })
    }

    if (alertType === 'error') {
      toastRef.current = toast.error(message, {
        ...config,
        className: 'error-toast'
      })
    }
  }


  return (
    <main>
      <Toast />
      
      <section>
        <AddItemForm toastMessage={toastMessage} onAddItem={addItemHandler} editItem={editItemObj} onEditItem={editItemHandler} />
        
        <hr />
        
        {todos.length === 0 && <p>No item found.</p>}
      
        {todos.length !== 0 && <div className="list-container" data-list-container>
        
        <ItemsList getEditItem={getEditItem} onDelete={deleteItemHandler} todos={todos} />
          <button  onClick={clearAllHandler} type="button" className='clear-btn'>Clear All</button>
        </div>}
      </section>
    </main>
  )
}

export default App