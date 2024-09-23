import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useGetAllBookingQuery } from "../../redux/features/booking/bookingApi";

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
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    if (bookingData?.data) {
      setBookings(bookingData.data); // Set booking data when available
    }
  }, [bookingData]);

  // Table columns configuration
  const columns = [
    {
      title: "User Email",
      dataIndex: "user",
      key: "email",
      width: "20%",
      render: (user: { _id: string; email: string }) => user.email,
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      width: "15%",
      render: (service: { _id: string; name: string }) => service.name,
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
    },
  ];

  const dataSource = bookings.map((booking: BookingData) => ({
    key: booking._id,
    user: booking.user,
    service: booking.service,
    slot: booking.slot,
    totalPrice: booking.totalPrice,
    paymentStatus: booking.paymentStatus,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isFetching}
      rowKey={(record) => record.key}
    />
  );
};

export default UserBookingManagement;
