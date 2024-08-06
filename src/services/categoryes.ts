import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import Axios from "../configs/axios";
import { Imovies } from "../InterFace/movies";


export const useGetcate = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                return await Axios.get(`categories`);
            } catch (error) {
                throw new Error("Không thể kết nối với máy chủ");
            }
        },
    });
};
