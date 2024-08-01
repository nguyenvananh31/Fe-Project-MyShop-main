import { message, Form, Input, Button, FormProps } from "antd"
import { Iusers } from "../InterFace/users";

import { authRegister } from "../services/auth";

const SignIn = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = Form.useForm();
    const { mutate, isPending } = authRegister()
    const onFinish: FormProps<Iusers>["onFinish"] = (values: any) => {
        const useData = {
            ...values,
            role:"menter"
        }

        mutate(useData)

    }
    return (
        <div>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                disabled={isPending}
            >
                <Form.Item
                    label="Email của bạn"
                    name="username"
                    rules={[{ required: true, message: 'Bạn chưa nhập email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SignIn
