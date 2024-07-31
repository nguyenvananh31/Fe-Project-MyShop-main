import { message, Form, Input, Button, FormProps } from "antd";
import { Iusers } from "../InterFace/users"; 
import { useMutation } from "@tanstack/react-query";
import Axios from "../configs/axios"; 
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigator = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: async (credentials: {email:string  , password : string}) => {
            try {
                const res = await Axios.post(`login`, credentials); 
                if (res.data && res.status === 200) {
                    return res;
                }
            } catch (error) {
                throw new Error("Lỗi hệ thống");
            }
        },

        onSuccess: (data) => {
            
            localStorage.setItem('users', JSON.stringify(data?.data));
            messageApi.open({
                type: "success",
                content: "thành công",
            });
            form.resetFields();
            navigator("/")
        },
        onError: () => {
            messageApi.open({
                type: "success",
                content: "that bai",
            });
        },
    });

    const onFinish: FormProps<Iusers>["onFinish"] = (values: any) => {
        mutate(values);
    };

    return (
        <div>
            {contextHolder}
            <Form
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
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;