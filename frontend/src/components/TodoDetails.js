// import React from "react";
// import { useTodosContext } from "../hooks/useTodosContext";

// // date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// const TodoDetails = ({ todo }) => {
//   const { dispatch } = useTodosContext();
  
//   const handleClick = async () => {
//     const response = await fetch("/api/todos/" + todo._id, {
//       method: "DELETE"
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: "DELETE_TODO", payload: json });
//     }
//   };

//   return (
//     <div>
//       <div className="workout-details">
//         <h4>{todo.work}</h4>
//         <p>{formatDistanceToNow(new Date(todo.createdAt), {addSuffix: true})}</p>
//         <span className="material-symbols-outlined" onClick={handleClick}>
//           DELETE
//         </span>
//       </div>
//     </div>
//   );
// };

// export default TodoDetails;

import { useTodosContext } from '../hooks/useTodosContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/todos/' + todo._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TODO', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{todo.work}</h4>
      <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TodoDetails