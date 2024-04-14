'use client'
import React, { createContext, useEffect, useState, useRef, use } from 'react'
import { useRouter } from 'next/navigation'

/*
* This is a context provider for the user authentication state. 
*/
export const UserContext = createContext<UserContextType>(null!)

/**
 * Provides user authentication context and does a few other things
 * 1. Redirects the user to the login page if they are not authenticated
 * 2. Logs the user out after 15 minutes of inactivity
 */
export function UserProvider(props: { children: React.ReactNode }) {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false)

    const router = useRouter()
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // TODO: change to middleware.ts
        if (!isUserAuthenticated && window.location.host !== 'localhost:3000') {
            const loginPaths = ['/', '/login', '/register', '/recover']
            if (!loginPaths.includes(window.location.pathname)) {
                router.push('/login')
            }
        } 
        
        if (isUserAuthenticated) {
            if (timeoutIdRef?.current) {
                clearTimeout(timeoutIdRef.current);
            }
            timeoutIdRef.current = setTimeout(() => {
                setIsUserAuthenticated(false)
            }, 15 * 60 * 1000) // logout every 15 minutes
        }
    }, [isUserAuthenticated, router])

    return (
        <UserContext.Provider value={{
            isUserAuthenticated,
            setIsUserAuthenticated
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export type UserContextType = {
    isUserAuthenticated: boolean,
    setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
