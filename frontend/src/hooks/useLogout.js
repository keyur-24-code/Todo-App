import { useAuthContext } from "./useAuthContext"
import { useTodosContext } from './useTodosContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: todosDispatch } = useTodosContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        todosDispatch({type: 'SET_TODOS', payload: null})
    }

    return{logout}

}