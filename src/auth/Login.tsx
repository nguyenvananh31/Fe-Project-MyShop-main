import { message, Form, Input, Button, FormProps } from "antd";
import { Iusers } from "../InterFace/users";
import { authLogin } from "../services/auth";

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const { mutate,  isPending } = authLogin()

    const onFinish: FormProps<Iusers>["onFinish"] = (values) => {
        mutate(values);
    };

    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                disabled={isPending}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Bạn chưa nhập email' },
                        {
                            type: "email",
                            message: 'Email không h��p lệ'
                        }
                    ]}
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
                    <Button type="primary" htmlType="submit" loading={isPending}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
