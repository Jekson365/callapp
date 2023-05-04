import axios from 'axios'
import { useEffect, useState } from 'react'

import { Data, userStore } from '../App'

import { Button, Table } from 'antd'
import { Editmodal } from './Editmodal'
import { Addmodal } from './Addmodal'

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
            .then(() => {
                location.reload()
                console.log("user deleted")

            })
            .catch((err) => {
                console.log(err)
            })
    }
    const columns: any = [
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
            render: (address: Data['address']) => `${address?.city} - ${address?.street}`
        },
        {
            title: 'action',
            dataIndex: 'id',
            key: 'action',
            render: (id: Data['id']) => <Button onClick={() => handleDelete(id)}>delete</Button>
        },


    ];

    const [modal, setModal] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [modalEditData, setModalEditData] = useState<Data>()

    const handleCancel = () => {
        setModal(false)
        console.log(modal)
    }
    const handleOk = (values: any) => {
        setModal(false)
        console.log(values)
    }

    const handleClick = (CurrentData: Data) => {
        setModal(true)
        setModalEditData(CurrentData)
    }

    return (
        <>
            <Button type='primary' href='/chart'>chart</Button>
            <Button type='primary' onClick={() => setAddModal(true)}>add new user</Button>
            <Addmodal
                addModal={addModal}
                setAddModal={setAddModal}
            />
            <Editmodal
                modal={modal}
                setModal={setModal}
                modalEditData={modalEditData}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />
            <Table
                dataSource={users[0]}
                columns={columns}
                rowClassName={'myrow'}
                onRow={(data) => {
                    return {
                        onDoubleClick: () => handleClick(data)
                    }
                }}
            />
        </>
    )
}
