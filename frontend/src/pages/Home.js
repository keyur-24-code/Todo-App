// import { useEffect } from "react";
// import { useTodosContext } from "../hooks/useTodosContext";

// // pages & components
// import TodoDetails from "../components/TodoDetails";
// import TodoForm from "../components/TodoForm";

// const Home = () => {
//   const { todos, dispatch } = useTodosContext();

//   useEffect(() => {
//     const fetchTodos = async () => {
//       const response = await fetch("/api/todos");
//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: "SET_TODOS", payload: json });
//       }
//     };

//     fetchTodos();
//   }, [dispatch]);
//   return (
//     <div>
//       <div className="home">
//         <div className="workouts">
//           {todos &&
//             todos.map(todo => (<TodoDetails key={todo._id} todo={todo} />))}
//         </div>
//         <TodoForm />
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {todos &&
          todos.map((todo) => <TodoDetails todo={todo} key={todo._id} />)}
      </div>
      <TodoForm />
    </div>
  );
};

export default Home;
