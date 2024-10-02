import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Space, message } from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "../../redux/features/service/serviceApi";
import type { ColumnsType, TableProps } from "antd/es/table";
import AddService from "./AddService";

interface DataType {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  duration: number;
}

const Servicemanagement: React.FC = () => {
  const { data: serviceData, isFetching } = useGetAllServicesQuery("");
  console.log(serviceData?.data)
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<DataType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [form] = Form.useForm();

  const handleEdit = (service: DataType) => {
    setCurrentService(service);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  const handleDelete = async (service: DataType) => {
    try {
      await deleteService(service._id).unwrap();
      message.success("Service deleted successfully!");
    } catch (error) {
      message.error("Failed to delete service");
      console.error("Failed to delete service:", error);
    }
  };

  const handleDeleteClick = (service: DataType) => {
    Modal.confirm({
      title: (
        <span>
          Are you sure you want to delete{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>{service.name}</span>?
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(service),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentService(null);
  };

  const onFinish = async (values: Omit<DataType, "_id">) => {
    if (currentService) {
      try {
        await updateService({ ...currentService, ...values }).unwrap();
        message.success("Service updated successfully!");
        handleCancel();
      } catch (error) {
        message.error("Failed to update service");
        console.error("Failed to update service:", error);
      }
    }
  };

  const columns: ColumnsType<DataType> = [
   
    {
      title: "Name",
      dataIndex: "name",
      filters: serviceData?.data?.map((service: DataType) => ({
        text: service.name,
        value: service.name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record: DataType) => record.name.startsWith(value as string),
      width: "20%",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string) => (
        <img src={image} alt="service" style={{ width: 50, height: 50 }} />
      ),
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: DataType, b: DataType) => a.price - b.price,
      width: "10%",
    },
    {
      title: "Duration (minutes)",
      dataIndex: "duration",
      sorter: (a: DataType, b: DataType) => a.duration - b.duration,
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteClick(record)}>
            Delete
          </Button>
        </Space>
      ),
      width: "15%",
    },
  ];

  const data = serviceData?.data?.map((service: DataType) => ({
    key: service._id,
    ...service,
  }));

  // Handle table changes like pagination, filters, and sorting
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log({ pagination, filters, sorter, extra });
  };

  return (
    <>
      <Button type="primary" className="text-center mb-3" onClick={showModal}>
        Add service
      </Button>
      <AddService modalVisible={modalVisible} handleClose={closeModal} />
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        onChange={onChange} // Handle pagination, filters, and sorting
        pagination={{pageSize: 10}}
      />

      <Modal
        title="Edit Service"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the service description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the service price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[{ required: true, message: "Please enter the service duration!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Servicemanagement;
