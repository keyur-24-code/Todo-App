// import { TodosContext } from "../context/TodoContext";
// import { useContext } from "react";

// export const useTodosContext = () => {
//     const context = useContext(TodosContext)

//     if (!context) {
//         throw Error('useTodosContext must be used inside an TodosContextProvider')
//     }

//     return context
// }


import { TodosContext } from "../context/TodosContext"
import { useContext } from "react"

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if(!context) {
    throw Error('useTodoContext must be used inside a TodoContextProvider')
  }

  return context
}