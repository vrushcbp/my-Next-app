'use client'
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { currentUser } from '@/services/UserService'
import { toast } from 'react-toastify'

const UserProvider = ({children}) => {
    const[user,setUser]= useState()

    useEffect(() => {
      async function loadUser(){
        try {
            const getUser= await currentUser()
            setUser({...getUser})
        } catch (error) {
            console.log(error)
            toast.error('Error loading current user')
            setUser(undefined)
        }
      }
      loadUser()
    }, [])
    
  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider