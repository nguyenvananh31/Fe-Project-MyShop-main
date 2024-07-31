import { useNavigate } from "react-router-dom";
import { Button, Drawer, Popconfirm, Skeleton, Table, UploadFile, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMoviesList, useMovieDetail, useDeleteMovie } from "../../services/movies";
import { Imovies } from "../../InterFace/movies";

const MoviesDashboard = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const navigator = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, context] = message.useMessage();

  const onClose = () => {
    setOpen(false);
  };

  const { data: listMovies, isLoading, isError, error } = useMoviesList();
  
  useEffect(() => {
    if (listMovies?.data?.thumb_url) {
      const firstUrl = listMovies?.data.thumb_url[0];
      setFileList([
        {
          uid: "0",
          name: "thumb_url",
          status: "done",
          url: firstUrl,
        }
      ]);
    }
  }, [listMovies]);

  const getIdMovie = (id: number) => {
    if (id == null) return;
    setOpen(true);
    setId(id);
  };

  const { data: movieDetail } = useMovieDetail(id);
  
  const { mutate } = useDeleteMovie();

  if (isError) {
    navigator("*");
    console.log(error.message);
  }

  const dataTable = listMovies?.data.map((movies: Imovies) => ({
    key: movies.id,
    ...movies,
  }));

  const colums = [
    { key: "name", dataIndex: "name", title: "Tên phim" },
    {
      key: "thumb_url",
      dataIndex: "thumb_url",
      title: "Ảnh phim",
      render: (thumb_url: string[] | undefined) => {
        if (!thumb_url || !Array.isArray(thumb_url)) {
          return <div>Không có ảnh</div>;
        }
        const firstThumbUrl = thumb_url[0];
    
        return (
          <img src={firstThumbUrl} alt="Thumb" className="w-9 h-auto" />
        );
      }
    },
    { key: "episode_total", dataIndex: "episode_total", title: "Tổng tập phim" },
    { key: "year", dataIndex: "year", title: "Ngày công chiếu" },
    { key: "view", dataIndex: "view", title: "Lượt xem" },
    {
      key: "actions",
      title: "Thao tác",
      render: (_: any, movie: Imovies) => (
        <>
          <Popconfirm
            title="Bạn muốn xóa thật không"
            description="Nếu xóa sẽ mất hết dữ liệu"
            onConfirm={() => mutate(movie.id!)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button className="m-1" onClick={() => getIdMovie(movie.id!)}>
            <EyeOutlined />
          </Button>
          <Button
            onClick={() => {
              navigator(`/admin/update-movies/${movie.id}`);
            }}
          >
            <EditOutlined />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {context}
      <div className="m-3">
        <Button
          type="primary"
          onClick={() => {
            navigator("/admin/create-movie");
          }}
        >
          <FolderAddOutlined />
          Thêm Mới Sản Phẩm
        </Button>
      </div>
      <div>
        {movieDetail?.data && open && (
          <Drawer title={movieDetail.data.name} onClose={onClose} open={open}>
            <p>{movieDetail.data.description}</p>
            <p>{movieDetail.data.year}</p>
          </Drawer>
        )}
      </div>
      <div className="m-3">
        <Skeleton loading={isLoading} active>
          <Table dataSource={dataTable} columns={colums}></Table>
        </Skeleton>
      </div>
    </>
  );
};

export default MoviesDashboard;
