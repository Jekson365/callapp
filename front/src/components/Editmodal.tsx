import React, { useEffect } from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import axios from 'axios'
import { Data } from '../App'

const { Option } = Select


export const Editmodal: React.FC<any> = (props) => {
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log('Success:', values);
        props.setModal(false)
        console.log(values)

        const dataToSend: Data = {
            id: props.modalEditData.id,
            name: values.name,
            email: values.email,
            gender: values.gender,
            address: {
                street: values.street,
                city: values.city,
            },
            phone: values.phone
        }
        
        axios.put(`http://localhost:8080/updateuser/${props.modalEditData.id}`, dataToSend)
            .then(() => {
                console.log("success!")
                location.reload()
            })
            .catch((err) => {
                throw err
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        console.log(props.modalEditData)
        if (props.modalEditData) {

            form.setFieldValue("name", props.modalEditData.name)
            form.setFieldValue("email", props.modalEditData.email)
            form.setFieldValue("gender", props.modalEditData.gender)
            form.setFieldValue("phone", props.modalEditData.phone)
            form.setFieldValue("city", props.modalEditData.address.city)
            form.setFieldValue("street", props.modalEditData.address.street)
        }
    }, [props.modalEditData])

    return (
        <>
            <Modal
                open={props.modal}
                onCancel={props.handleCancel}
                onOk={props.handleOk}
                footer={null}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 19 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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
                            edit
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}
