import React from "react";
import { Table, Tag } from "antd";
import { useGetAllBookingQuery } from "../../redux/features/booking/bookingApi";
import type { TableProps } from "antd";

// Define the interface for booking data
interface BookingData {
  _id: string;
  user: { _id: string; email: string }; // User data
  service: { _id: string; name: string; image: string }; // Service data
  slot: { _id: string; date: Date; startTime: string; endTime: string }; // Slot data
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled'; // Booking status
  paymentStatus: 'Pending' | 'Paid' | 'Failed'; // Payment status
}

const UserBookingManagement: React.FC = () => {
  const { data: bookingData, isFetching } = useGetAllBookingQuery('');

  // Table columns configuration with types
  const columns: any = [
    {
      title: "User Email",
      dataIndex: "user",
      key: "email",
      width: "20%",
      render: (user: { _id: string; email: string }) => user.email,
      filters: Array.from(new Set(bookingData?.data?.map((booking:BookingData) => booking.user.email))).map(email => ({
        text: email,
        value: email,
      })),
      onFilter: (value:any, record:BookingData) => record.user.email.startsWith(value as string),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      width: "15%",
      render: (service: { _id: string; name: string }) => service.name,
      filters: Array.from(new Set(bookingData?.data?.map(booking => booking.service.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value:any, record:BookingData) => record.service.name.startsWith(value as string),
    },
    {
      title: "Service Image",
      dataIndex: "service",
      key: "image",
      width: "10%",
      render: (service: { image: string }) => (
        <img src={service.image} alt="Service" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "slot",
      key: "date",
      width: "15%",
      render: (slot: { date: Date }) => new Date(slot.date).toLocaleDateString(),
      sorter: (a:BookingData, b:BookingData) => new Date(a.slot.date).getTime() - new Date(b.slot.date).getTime(),
    },
    {
      title: "Booking Time",
      dataIndex: "slot",
      key: "startTime",
      width: "15%",
      render: (slot: { startTime: string; endTime: string }) => (
        <Tag>
          {slot.startTime} - {slot.endTime}
        </Tag>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "10%",
      render: (totalPrice: number) => `$${totalPrice.toFixed(2)}`,
      sorter: (a:BookingData, b:BookingData) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: "15%",
      render: (paymentStatus: 'Pending' | 'Paid' | 'Failed') => (
        <Tag color={paymentStatus === 'Paid' ? 'green' : paymentStatus === 'Failed' ? 'red' : 'blue'}>
          {paymentStatus}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'Pending' },
        { text: 'Paid', value: 'Paid' },
        { text: 'Failed', value: 'Failed' },
      ],
      onFilter: (value:any, record:BookingData) => record.paymentStatus === value,
    },
  ];

  const dataSource = bookingData?.data?.map((booking: BookingData) => ({
    key: booking._id,
    user: booking.user,
    service: booking.service,
    slot: booking.slot,
    totalPrice: booking.totalPrice,
    paymentStatus: booking.paymentStatus,
  })) || []; // Provide a default empty array if bookingData is undefined

  const onChange: TableProps<BookingData>['onChange'] = (pagination, filters, sorter, extra) => {
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isFetching}
      onChange={onChange}
      rowKey={(record) => record._id}
    />
  );
};

export default UserBookingManagement;
