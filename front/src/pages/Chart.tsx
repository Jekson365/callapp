import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { userStore } from '../App'
import { Plot, Pie } from '@ant-design/plots'
import { Data } from '../App'

type userArray = {
  users: Data[]
}

export const Chart = () => {
  const [users, setusers] = useState<any>([])

  async function getData() {
    const d = await axios.get("http://localhost:8080/data")
      .then((res) => {
        console.log("success!")
      })
    setusers(d)
  }

  useEffect(() => {
    getData()
  }, [users])

  return (
    <>
      {users && users.map((each: Data) => {
        return (
          <>
            <h1>{each.name}</h1>
          </>
        )
      })}
    </>
  )
}
