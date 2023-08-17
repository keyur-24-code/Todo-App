// import React, { useState } from "react";
// import { useTodosContext } from "../hooks/useTodosContext";

// const TodoForm = () => {
//   const { dispatch } = useTodosContext();

//   const [work, setWork] = useState("");
//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const todo = { work };

//     const response = await fetch("/api/todos", {
//       method: "POST",
//       body: JSON.stringify(todo),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//       setEmptyFields(json.emptyFields);
//     }
//     if (response.ok) {
//       setWork("");
//       setError(null);
//       setEmptyFields([]);
//       dispatch({ type: "CREATE_TODO", payload: json });
//     }
//   };

//   return (
//     <div>
//       <form className="create" onSubmit={handleSubmit}>
//         <label>Add Todo</label>
//         <input
//           type="text"
//           onChange={(e) => setWork(e.target.value)}
//           value={work}
//           className={emptyFields.includes("work") ? "error" : ""}
//         />
//         <button>Add Todo</button>
//         {error && <div className="error">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default TodoForm;

import { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TodoForm = () => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [work, setWork] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const todo = {work}
    
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setWork('')
      dispatch({type: 'CREATE_TODO', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 

      <label>Todo</label>
      <input 
        type="text" 
        onChange={(e) => setWork(e.target.value)} 
        value={work}
        className={emptyFields.includes('work') ? 'error' : ''}
      />
      <button>Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TodoForm