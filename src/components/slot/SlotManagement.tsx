import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllSlotsQuery, useUpdateSlotMutation } from "../../redux/features/slot/slotApi";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import CreateSlot from "./CreateSlot";

interface SlotData {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
}

const SlotManagement: React.FC = () => {
  const { data: slotData, isFetching } = useGetAllSlotsQuery("");
  const { data: serviceData } = useGetAllServicesQuery("");
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [updateSlot] = useUpdateSlotMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    if (slotData?.data) {
      setSlots(slotData.data);
    }
  }, [slotData]);

  const getServiceName = (serviceId: string) => {
    const service = serviceData?.data?.find((item: any) => item._id === serviceId);
    return service ? service.name : "undefined";
  };

  const toggleSlotStatus = async (slotId: string) => {
    const updatedSlot = slots.find((slot) => slot._id === slotId);
    
    if (updatedSlot && updatedSlot.isBooked !== "booked") {
      const updatedStatus = updatedSlot.isBooked === "available" ? "canceled" : "available";
      
      // Optimistic UI update
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot._id === slotId ? { ...slot, isBooked: updatedStatus } : slot
        )
      );

      // Backend update
      try {
        await updateSlot({ _id: slotId, isBooked: updatedStatus });
      } catch (error) {
        console.error("Failed to update slot:", error);
        // Revert state on error
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot._id === slotId ? { ...slot, isBooked: updatedSlot.isBooked } : slot
          )
        );
      }
    }
  };

  const columns: TableColumnsType<SlotData> = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      filters: serviceData?.data?.map((service: any) => ({
        text: service.name,
        value: service._id,
      })) || [],
      onFilter: (value, record) => record.service === value,
      render: (service: string) => getServiceName(service),
      width: "30%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
      width: "20%",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      width: "15%",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "isBooked",
      filters: [
        { text: "Available", value: "available" },
        { text: "Booked", value: "booked" },
        { text: "Canceled", value: "canceled" },
      ],
      onFilter: (value, record) => record.isBooked === value,
      render: (_: any, record: SlotData) => (
        <Tag
          color={record.isBooked === "available" ? "green" : record.isBooked === "canceled" ? "red" : "blue"}
          onClick={record.isBooked !== "booked" ? () => toggleSlotStatus(record._id) : undefined}
          style={{ cursor: record.isBooked !== "booked" ? "pointer" : "not-allowed" }}
        >
          {record.isBooked === "available" ? "Available" : record.isBooked === "canceled" ? "Canceled" : "Booked"}
        </Tag>
      ),
      width: "20%",
    },
  ];

  const onChange: TableProps<SlotData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log({pagination, filters, sorter, extra})
  };

  return (
    <>
    <Button type="primary" className=" text-center mb-3" onClick={showModal}>
        Create slot
      </Button>
      <CreateSlot modalVisible={modalVisible} handleClose={closeModal} />
      <Table
        columns={columns}
        dataSource={slots}
        loading={isFetching}
        onChange={onChange}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default SlotManagement;
