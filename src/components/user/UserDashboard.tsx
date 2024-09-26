import React, { useEffect, useState } from "react";
import { Table, Card, Tag } from "antd";
import moment from "moment";
import { useGetMyBookingQuery } from "../../redux/features/booking/bookingApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

// Define the Booking interface
export interface Booking {
  _id: string;
  user: { _id: string; email: string };
  service: { _id: string; name: string; image: string };
  slot: { _id: string; date: string; startTime: string; endTime: string };
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
}

const UserBookingManagement: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: bookingData, isFetching } = useGetMyBookingQuery(user?.email, {
    skip: !user?.email,
  });

  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  // State for upcoming and past bookings
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);

 

  // Update bookings when booking data changes
  useEffect(() => {
    if (bookingData?.data) {
  
      const now = moment(); // Current date and time
  
      const sortedUpcomingBookings = bookingData.data.filter((booking:Booking) => {
        const bookingDateTime = moment(`${booking.slot.date} ${booking.slot.startTime}`, "YYYY-MM-DD HH:mm:ss");
  
        // Check if the booking is for a future date or a time later than now on the same day
        return bookingDateTime.isAfter(now);
      });
  
      setUpcomingBookings(sortedUpcomingBookings);
  
      // Separate past bookings
      setPastBookings(
        bookingData.data.filter((booking:Booking) =>
          moment(`${booking.slot.date} ${booking.slot.startTime}`, "YYYY-MM-DD HH:mm:ss").isBefore(now)
        )
      );
    }
  }, [bookingData]);

  // Manage countdown updates for upcoming bookings
  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns = upcomingBookings.reduce((acc, booking) => {
        const bookingDateTime = moment(
          `${booking.slot.date} ${booking.slot.startTime}`,
          "YYYY-MM-DD HH:mm:ss"
        );

        if (bookingDateTime.isValid()) {
          const timeLeft = bookingDateTime.diff(moment());
          if (timeLeft > 0) {
            const duration = moment.duration(timeLeft);
            acc[booking._id] = `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
          } else {
            acc[booking._id] = "Expired";
            // Move expired booking to past bookings
            setPastBookings((prev) => [...prev, booking]);
            setUpcomingBookings((prev) =>
              prev.filter((b) => b._id !== booking._id)
            );
          }
        } else {
          acc[booking._id] = "Invalid date";
        }

        return acc;
      }, {} as { [key: string]: string });

      setCountdowns(newCountdowns);
    };
    

    if (upcomingBookings.length > 0) {
      const intervalId = setInterval(updateCountdowns, 1000); // Update every second
      return () => clearInterval(intervalId); // Clear the interval on unmount
    }
  }, [upcomingBookings]);
  useEffect(() => {
    // Check if there are upcoming bookings and the countdown exists for the first booking
    if (upcomingBookings.length > 0 && countdowns[upcomingBookings[0]._id]) {
      navigate('/user-dashboard', { state: { countdown: countdowns[upcomingBookings[0]._id] } });
    }
  }, [upcomingBookings, countdowns, navigate]);

  // Table columns for past bookings
  const columns:any = [
    {
      title: "User Email",
      dataIndex: "user",
      key: "email",
      render: (user: { _id: string; email: string }) => user.email
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (service: { name: string }) => service.name
      
    },
    {
      title: "Service Image",
      dataIndex: "service",
      key: "image",
      render: (service: { image: string }) => (
        <img src={service.image} alt="Service" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "slot",
      key: "date",
      render: (slot: { date: string }) => moment(slot.date).format("YYYY-MM-DD"),
    },
    {
      title: "Booking Time",
      dataIndex: "slot",
      key: "startTime",
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
      render: (totalPrice: number) => `$${totalPrice.toFixed(2)}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: "Pending" | "Paid" | "Failed") => (
        <Tag
          color={
            paymentStatus === "Paid" ? "green" :
            paymentStatus === "Failed" ? "red" :
            "blue"
          }
        >
          {paymentStatus}
        </Tag>
      ),
    },
  ];

  // Data source for the table
  const dataSource = pastBookings.map((booking) => ({
    key: booking._id,
    user: booking.user,
    service: booking.service,
    slot: booking.slot,
    totalPrice: booking.totalPrice,
    paymentStatus: booking.paymentStatus,
  }));

  return (
    <div>
      {/* Upcoming Bookings Section with Countdown */}
      <div className="flex justify-center items-center py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {upcomingBookings.map((booking) => (
            <Card
              key={booking._id}
              title={booking.service.name}
              className="w-full"
              hoverable
            >
              <p>
                Slot: {moment(booking.slot.date).format("YYYY-MM-DD")} (
                {booking.slot.startTime} - {booking.slot.endTime})
              </p>
              <p className="">
                Time Remaining: <Tag color="red">{countdowns[booking._id] || "Expired"}</Tag>
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Table for Past Bookings */}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
        rowKey={(record) => record.key}
      />
     
      
    </div>
  );
};

export default UserBookingManagement;
