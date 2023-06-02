import { createContext, useState } from "react"
import authService from './features/auth/authService'
import { toast } from 'react-toastify'

// Get user from localStoarge
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
export const AuthContext = createContext({
    userState: initialState,
    register: () => {},
    login: () => {},
    logout: () => {},
    reset: () => {}
})

function AuthProvider({ children}) {
    const [ userState, setUserState ] = useState(initialState)

    const reset = () => {
        setUserState((prevState) => ({
            ...prevState,
            isLoading : false,
            isError : false,
            isSuccess : false,
            message : ''
        }))
    }

    const register = async (userData) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString()
            toast.error(message)    
        }
    }

    const login = async (userData) => {
        try {
            setUserState((state) => (
                {
                    ...state,
                    isError: false,
                    isLoading: false,
                    isSuccess: true,
                    message: ''
                }
            ))
            return await authService.login(userData)
        } catch (error) {
            console.log('inside login error')
            const message = (error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString()
           setUserState((state) => (
            {
                ...state,
                isError: false,
                isLoading: false,
                isSuccess: false,
                message
            }
        ))
        }
    }

    const logout = async () => {
        try {
            return await authService.logout()
        } catch (error) {
            const message = (error.response && error.response.data && 
                error.response.data.message) || error.message || error.toString()
            toast.error(message)
        }
    }

    const contextValue = {
        userState: userState,
        register,
        logout,
        login,
        reset
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider