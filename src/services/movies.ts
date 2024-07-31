import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import Axios from "../configs/axios";
import { Imovies } from "../InterFace/movies";

export const useMoviesList = () => {
    return useQuery({
        queryKey: ["movies"],
        queryFn: async () => {
            try {
                return await Axios.get(`movies`);
            } catch (error) {
                throw new Error("Không thể kết nối với máy chủ");
            }
        },
    });
};

export const useMovieDetail = (id: number | null) => {
    return useQuery({
        queryKey: ["movies", id],
        queryFn: async () => {
            if (!id) return null;
            try {
                return await Axios.get(`/movies/${id}`);
            } catch (error) {
                throw new Error("Không thể lấy dữ liệu");
            }
        },
        enabled: !!id,
    });
};

export const useDeleteMovie = () => {
    const queryClient = useQueryClient();
    const [messageApi] = message.useMessage();

    return useMutation({
        mutationFn: async (id: number) => {
            try {
                return await Axios.delete(`movies/${id}`);
            } catch (error) {
                throw new Error("Không thể xóa được! Vui lòng thử lại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["movies"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Xóa sản phẩm thất bại",
            });
        },
    });
};


export const useCreateMovie = () => {
    const queryClient = useQueryClient();
    const [messageApi] = message.useMessage();

    return useMutation({
        mutationFn: async (movie: Imovies) => {
            try {
                return Axios.post(`movies`, movie);
            } catch (error) {
                throw new Error("Không thể Thêm được! Vui lòng thử lại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Thêm phim thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["movies"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Thêm phim thất bại",
            });
        },
    });
};


export const useUpdateMovie = ( ) => {
    const queryClient = useQueryClient();
    const [messageApi] = message.useMessage();
    return useMutation({
        mutationFn: async (movie: Imovies ) => {
            try {
                return Axios.put(`movies/${movie.id}`, movie);
            } catch (error) {
                throw new Error("Không thể Thêm được! Vui lòng thử lại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Sủa phim thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["movies"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Sủa phim thất bại",
            });
        },
    });
};

