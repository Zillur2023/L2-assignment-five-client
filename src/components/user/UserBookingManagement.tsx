import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllBookingQuery } from "../../redux/features/booking/bookingApi"; // Adjust the import based on your project structure

// Define the BookingData interface
interface BookingData {
  _id: string;
  user: { _id: string; email: string };
  service: { _id: string; name: string; image: string };
  slot: { _id: string; date: Date; startTime: string; endTime: string };
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Failed";
}

const BookingManagement: React.FC = () => {
  const { data: bookingData, isFetching } = useGetAllBookingQuery("");
  const [filteredBookings, setFilteredBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    if (bookingData?.data) {
      setFilteredBookings(bookingData.data); // Initialize filtered bookings with fetched data
    }
  }, [bookingData]);

  const columns: TableColumnsType<BookingData> = [
    {
      title: "User Email",
      dataIndex: ["user", "email"],
      key: "user.email",
      filters: Array.from(
        new Set(filteredBookings.map((booking) => booking.user.email))
      ).map((email) => ({ text: email, value: email })),
      onFilter: (value, record) => record.user.email.startsWith(value as string),
      width: "20%",
    },
    {
      title: "Service Name",
      dataIndex: ["service", "name"],
      key: "service.name",
      filters: Array.from(
        new Set(filteredBookings.map((booking) => booking.service.name))
      ).map((name) => ({ text: name, value: name })),
      onFilter: (value, record) =>
        record.service.name.startsWith(value as string),
      sorter: (a, b) => a.service.name.localeCompare(b.service.name),
      width: "20%",
    },
    {
      title: "Service Image",
      dataIndex: ["service", "image"],
      key: "service.image",
      render: (_, record) => (
        <img
          src={record.service.image}
          alt="Service"
          style={{ width: 50, height: 50 }}
        />
      ),
      width: "10%",
    },
    {
      title: "Booking Date",
      dataIndex: "slot",
      key: "date",
      render: (_, record) => new Date(record?.slot?.date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.slot.date).getTime() - new Date(b.slot.date).getTime(), // Sorting based on date
      width: "15%",
    },
    {
      title: "Booking Time",
      dataIndex: ["slot", "startTime"],
      key: "slot.startTime",
      render: (_, record) => (
        <Tag>
          {record?.slot?.startTime} - {record?.slot?.endTime}
        </Tag>
      ),
      width: "15%",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      width: "10%",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => (
        <Tag
          color={
            record.paymentStatus === "Paid"
              ? "green"
              : record.paymentStatus === "Failed"
              ? "red"
              : "orange"
          }
        >
          {record.paymentStatus}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Paid", value: "Paid" },
        { text: "Failed", value: "Failed" },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
      width: "10%",
    }
    
  ];

  const onChange: TableProps<BookingData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log({ pagination, filters, sorter, extra });
  };

  return (
    <Table
      columns={columns}
      dataSource={filteredBookings}
      loading={isFetching}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 10 }}
      onChange={onChange}
    />
  );
};

export default BookingManagement;
