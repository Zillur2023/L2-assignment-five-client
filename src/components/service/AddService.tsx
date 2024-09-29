import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form, Input, Button, Upload, message, Card, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { RcFile } from "antd/es/upload";
import config from "../../config";
import type { UploadFile, UploadProps } from "antd";
import { useCreateServiceMutation } from "../../redux/features/service/serviceApi";

const { Title } = Typography;

type FormValues = {
  name: string;
  price: number;
  duration: number;
  description: string;
  image?: UploadFile[];
};

const AddService: React.FC = () => {
  const [createService] = useCreateServiceMutation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: undefined,
      duration: undefined,
      description: "",
      image: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (dataInfo) => {
    if (fileList.length === 0) {
      setError("image", { type: "manual", message: "Image is required" });
      return;
    }

    try {
      const imageFile = fileList[0].originFileObj as Blob;

      const imageHostingKey = config.image_hosting_key;
      const imageHostingApi = `${config.image_hosting_api}?key=${imageHostingKey}`;

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(imageHostingApi, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const imageUrl = result.data.url;

        const serviceData = {
          name: dataInfo.name,
          price: dataInfo.price,
          duration: dataInfo.duration,
          description: dataInfo.description,
          image: imageUrl,
        };

        const toastId = toast.loading("Service creating...")
       try {
        const res = await createService(serviceData).unwrap()

          if(res) {
            toast.success(res?.message, {id: toastId})
            reset();
            setFileList([]);
            clearErrors("image");
          }
        
       } catch (error:any) {
        toast.error(error?.data?.message, {id: toastId})
       }

       
       
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      message.error("Failed to add service. Please try again.");
    }
  };

  const uploadProps: UploadProps = {
    listType: "picture",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            canvas.toBlob((result) => resolve(result as Blob));
          };
        };
      });
    },
    onChange(info) {
      if (info.fileList) {
        setFileList(info.fileList);
      }
    },
    customRequest: ({ file, onSuccess }) => {
      setFileList([{ ...(file as RcFile), status: 'done' }]);
      onSuccess?.(file);
    },
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 p-6 shadow-lg">
      <Title level={3} className="text-center mb-6">
        Add New Service
      </Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Service Name */}
        <Form.Item
          label="Service Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Service name is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter service name" />
            )}
          />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
          required
        >
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: { value: 0.01, message: "Price must be at least 0.01" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter service price"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0.01) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
        </Form.Item>

        {/* Duration */}
        <Form.Item
          label="Duration (minutes)"
          validateStatus={errors.duration ? "error" : ""}
          help={errors.duration?.message}
          required
        >
          <Controller
            name="duration"
            control={control}
            rules={{
              required: "Duration is required",
              min: { value: 1, message: "Duration must be at least 1 minute" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min="1"
                placeholder="Enter duration"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 1) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
          required
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Enter service description"
              />
            )}
          />
        </Form.Item>

        {/* Upload Image */}
        <Form.Item
          label="Upload Image"
          validateStatus={errors.image ? "error" : ""}
          help={errors.image?.message}
          required
        >
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <Upload
                {...uploadProps}
                fileList={fileList}
                onChange={(info) => {
                  setFileList(info.fileList);
                  field.onChange(info.fileList);
                }}
                onRemove={(file) => {
                  const updatedFileList = fileList.filter(
                    (f) => f.uid !== file.uid
                  );
                  setFileList(updatedFileList);
                  field.onChange(updatedFileList);
                }}
              >
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Service
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddService;
