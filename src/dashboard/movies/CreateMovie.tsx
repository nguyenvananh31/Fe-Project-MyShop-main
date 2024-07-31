
import {
  Button,
  DatePicker,
  Divider,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  InputNumber,
  InputRef,
  message,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Imovies } from "../../InterFace/movies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../../configs/axios";
import { useRef, useState } from "react";
import {
  Loading3QuartersOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useCreateMovie } from "../../services/movies";

const CreateMovie = () => {
  const [messageApi, conTextHoder] = message.useMessage();

  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [items, setItems] = useState<string[]>([]);

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => Axios.get(`/categories`),
  });

  let eps = 0

  const {mutate , isPending} = useCreateMovie()

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish: FormProps<Imovies>["onFinish"] = (values: any) => {
    const imageUrls = fileList
      .filter((file) => file.status === "done")
      .map((file) => file.response?.secure_url);
    const formattedDate = values.year
      ? dayjs(values.year).format("YYYY-MM-DD")
      : null;

    mutate({ ...values, thumb_url: imageUrls, year: formattedDate });
    // console.log({ ...values, thumb_url: imageUrls, year: formattedDate });
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item`]);
    setName("");
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <h1 className="mt-[20px] text-center font-bold font-sans">
        Thêm Phim Mới
      </h1>
      <div className="w-[750px] mt-[40px] mx-auto translate-[-50%]">
        {conTextHoder}
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên phim" },
              { min: 5, message: "Tên phim phải có ít nhất 5 ký tự" },
              {
                message:
                  "Tên phim chỉ được chứa chữ cái và số, không chứa ký tự đặc biệt",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nội dung phim"
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung" },
              { min: 5, message: "Nội dung phim phải có ít nhất 5 ký tự" },
              {
                message:
                  "Nội dung chỉ được chứa chữ cái và số, không chứa ký tự đặc biệt",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div>
            <Form.Item label="Ảnh sản phẩm" name="thumb_url">
              <Upload
                action="https://api.cloudinary.com/v1_1/dhpdvms2x/image/upload"
                data={{ upload_preset: "ml_default" }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple
              >
                {(fileList || []).length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>

          <Form.Item
            label="Phim Chiếu Rạp"
            name="chieurap"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Số tập phim"
            name="episode_total"
            rules={[
              { required: true, message: "Vui lòng nhập số tập phim" },
              {
                pattern: /^[0-9\s]+$/,
                message:
                  "Số tập chỉ được chứa  số, không chứa ký tự đặc biệt hoặc số âm",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Danh mục" name="category_id">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={categories?.data.map(
                (category: { id: number | string; name: string }) => ({
                  value: category.id,
                  label: category.name,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            label="DatePicker"
            name="year"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Lượt Xem"
            name="view"
            initialValue={0}
            rules={[
              { required: true, message: "Vui lòng nhập số lượt xem" },
              {
                pattern: /^[0-9\s]+$/,
                message:
                  "Lượt xem chỉ được chứa số, không chứa ký tự đặc biệt hoặc số âm",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Diễn Viên" name="actor">
            <Select
              mode="multiple"
              placeholder="custom dropdown render"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider />
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>
          <Form.Item
            label="Link phim"
          >
            <Form.List name="links_movie"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        name={[name, "episode"]}
                        rules={[
                          { required: true, message: "Tập phim không được để trống" },
                        ]}
                        initialValue={eps}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        name={[name, "links"]}
                        rules={[
                          { required: true, message: "Link phim không được để trống" },
                        ]}
                      >
                        <Input placeholder="Link phim" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        eps++
                        add()
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="animate-spin" /> Submit
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form.Item>

        </Form>
      </div>
    </>
  );
};

export default CreateMovie;
