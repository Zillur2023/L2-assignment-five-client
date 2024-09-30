import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Space, message } from "antd";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "../../redux/features/service/serviceApi";
import type { ColumnsType } from "antd/es/table";
import AddService from "./AddService";

// Define the DataType interface for the services
interface DataType {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

// Main ServiceManagement component
const Servicemanagement: React.FC = () => {
  // Fetch service data and set up mutation hooks
  const { data: serviceData, isFetching } = useGetAllServicesQuery("");
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  // State for modal visibility and the currently edited service
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentService, setCurrentService] = useState<DataType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Ant Design form hook
  const [form] = Form.useForm();

  // Handle edit action by opening the modal and setting form fields
  const handleEdit = (service: DataType) => {
    setCurrentService(service);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  // Handle delete action with a confirmation prompt
  const handleDelete = async (service: DataType) => {
    try {
      await deleteService(service._id).unwrap();
      message.success("Service deleted successfully!");
    } catch (error) {
      message.error("Failed to delete service");
      console.error("Failed to delete service:", error);
    }
  };

  // Show confirmation modal for deletion
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

  // Cancel the modal and reset form
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentService(null);
  };

  // Handle form submission and update the service
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

  // Table column definitions with types
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
      onFilter: (value: any, record: DataType) =>
        record.name.startsWith(value as string),
      width: "30%",
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
      width: "15%",
    },
    {
      title: "Duration (minutes)",
      dataIndex: "duration",
      sorter: (a: DataType, b: DataType) => a.duration - b.duration,
      width: "15%",
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
    },
  ];

  // Data mapping for table
  const data = serviceData?.data?.map((service: DataType) => ({
    key: service._id,
    ...service,
  }));

  return (
    <>
    <Button type="primary" className=" text-center mb-3" onClick={showModal}>
        Add service
      </Button>
      <AddService modalVisible={modalVisible} handleClose={closeModal} />
      <Table columns={columns} dataSource={data} loading={isFetching} />

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
