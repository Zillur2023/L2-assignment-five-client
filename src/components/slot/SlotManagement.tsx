import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useGetAllSlotsQuery, useUpdateSlotMutation } from "../../redux/features/slot/slotApi";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";

interface SlotData {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
}

const SlotManagement: React.FC = () => {
  // Example service data
  const { data: slotData, isFetching } = useGetAllSlotsQuery("");
  const { data: serviceData } = useGetAllServicesQuery("");
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [updateSlot] = useUpdateSlotMutation()

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
      
      // Update local state first for optimistic UI
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot._id === slotId ? { ...slot, isBooked: updatedStatus } : slot
        )
      );

      // Call the mutation to update the status in the backend
      try {
        await updateSlot({ _id: slotId, isBooked: updatedStatus });
      } catch (error) {
        console.error("Failed to update slot:", error);
        // Optionally: revert local state in case of an error
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot._id === slotId ? { ...slot, isBooked: updatedSlot.isBooked } : slot
          )
        );
      }
    }
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      width: "30%",
      render: (service: string) => getServiceName(service),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (date: string) => new Date(date).toLocaleDateString(), // Format date
    },
    
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      width: "20%",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "isBooked",
      width: "10%",
      render: (_: any, record: SlotData) => (
        <Tag
          color={record.isBooked === "available" ? "green" : "red"}
          onClick={record.isBooked !== "booked" ? () => toggleSlotStatus(record._id) : undefined}
          style={{ cursor: record.isBooked !== "booked" ? "pointer" : "not-allowed" }}
        >
          {record.isBooked === "available" ? "Available" : record.isBooked === "canceled" ? "Canceled" : "Booked"}
        </Tag>
      ),
    },
  ];

  const data = slotData?.data?.map((slot: SlotData) => ({
    key: slot?._id,
    ...slot,
  }));

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default SlotManagement;
