import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Main } from './components/Main'
import create from 'zustand'

export interface Data {
  id: number,
  name: string,
  email: string,
  gender: string,
  address: {
    street: string,
    city: string
  },
  phone: string,

}
const foo: Data['address'] = { street: "", city: "" }
const { street, city } = foo
console.log(street)
console.log(city)

type User = {
  users: any[],
  addUser: (user: Data) => void,
}

export const userStore = create<User>((set) => ({
  users: [],
  addUser: (user) => {
    set((state) => ({
      users: [
        ...state.users,
        user,

      ]
    }))
  },
}))


function App() {
  return (
    <>
      <Main />
    </>

  )
}

export default App
