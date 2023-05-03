import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { create } from 'zustand'
import { Data, userStore } from '../App'

import { Table } from 'antd'

export const Main = () => {
    const users = userStore((state) => state.users)
    const addUser = userStore((state) => state.addUser)


    useEffect(() => {
        axios.get("http://localhost:8080/data")
            .then((res) => {
                addUser(res.data)
            })
    })


    const handleDelete = (id: number) => {
        axios.post(`http://localhost:8080/deleteuser/${id}`)
            .then((res) => {
                location.reload()
                console.log("user deleted")

            })
            .catch((err) => {
                console.log(err)
            })
    }
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
            render: (address: Data['address']) => `${address.city} - ${address.street}`
        },
        {
            title: 'action',
            dataIndex: 'id',
            key: 'action',
            render: (id: Data['id']) => <button onClick={() => handleDelete(id)}>delete</button>
        },


    ];

    return (
        <>
            <Table dataSource={users[0]} columns={columns} />
        </>
    )
}
