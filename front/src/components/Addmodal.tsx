import React from 'react'
import { Form, Modal, Input, Button, Select } from 'antd'
import { Data } from '../App'
import axios from 'axios'
const { Option } = Select

export const Addmodal: React.FC<any> = (props) => {

    const handleFinish = (values: any) => {

        const dataToSend: Data = {
            id: Math.floor(Math.random() * 10000),
            name: values.name,
            email: values.email,
            gender: values.gender,
            address: {
                street: values.street,
                city: values.city,
            },
            phone: values.phone
        }

        axios.post("http://localhost:8080/addnew", dataToSend)
            .then(() => {
                console.log("success!")
                props.setAddModal(false)
                location.reload()
            })
            .catch((err) => {
                throw err
            })
    }
    const handleCancel = () => {
        props.setAddModal(false)
    }
    return (
        <>
            <Modal
                onCancel={handleCancel}
                open={props.addModal}
                footer={null}
            >
                <Form
                    name='newuser'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            { required: true, message: 'Please input your name!' },
                            { min: 2, message: "name must be more than 5 characters" }
                        ]}
                    >
                        <Input
                        />
                    </Form.Item>

                    <Form.Item
                        label="email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "filed must be an email" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please input your gender!' }]}
                    >
                        <Select>
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="phone"
                        name="phone"
                        rules={[
                            { required: true, message: 'Please input your phone!' },
                            { min: 9, message: "filed must be an phone number" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="city"
                        name="city"
                        rules={[
                            { required: true, message: 'Please input your city!' },
                            { min: 3, message: "minimum 3 symbols" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="street"
                        name="street"
                        rules={[{ required: true, message: 'Please input your street!' }, { min: 3, message: "minimum 3 symbols" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            add new user
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
