import { Main } from './components/Main'
import create from 'zustand'
import { Chart } from './pages/Chart'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/chart' element={<Chart/>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
