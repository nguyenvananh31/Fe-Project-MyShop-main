import { useMutation } from "@tanstack/react-query";
import { message, Form } from "antd";
import Axios from "../configs/axios";
import { useNavigate } from "react-router-dom";
import { Iusers } from "../InterFace/users";

export const authLogin = () => {
    const [messageApi] = message.useMessage();
    const [form] = Form.useForm();
    const navigator = useNavigate();


    return useMutation({
        mutationFn: async (credentials: { email: string, password: string }) => {
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
    })

}

export const authRegister = () => {
    const [messageApi] = message.useMessage();
    const [form] = Form.useForm();

    return useMutation({
        mutationFn: async (users: Iusers) => {
            try {
                const res = await Axios.post(`users`, users)
                if (res.data) {
                    return res
                }
            } catch (error) {
                throw new Error("Lỗi hệ thống")
            }
        }, onSuccess: (data) => {
            localStorage.setItem('users', JSON.stringify(data?.data));

            messageApi.open({
                type: "success",
                content: "thành công",
            });


            form.resetFields();
        },
        onError: (error) => {
            messageApi.error(error.message || 'Đăng ký thất bại!');
        },
    });
}