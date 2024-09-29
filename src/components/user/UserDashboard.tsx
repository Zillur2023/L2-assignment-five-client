import React, { useEffect, useState } from "react";
import { Table, Card, Tag } from "antd";
import moment from "moment";
import { useGetMyBookingQuery } from "../../redux/features/booking/bookingApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setCountdown } from "../../redux/features/auth/authSlice";

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
  const dispatch = useAppDispatch();
  const location = useLocation()
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: bookingData, isFetching } = useGetMyBookingQuery(user?.email, {
    skip: !user?.email,
  });

  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  console.log({countdowns})
  console.log({pastBookings})
  console.log({upcomingBookings})
 

  useEffect(() => {
    if (bookingData?.data) {
      const now = moment();

      const sortedUpcomingBookings = bookingData.data.filter((booking: Booking) => {
        const bookingDateTime = moment(`${booking.slot.date} ${booking.slot.startTime}`, "YYYY-MM-DD HH:mm:ss");
        return bookingDateTime.isAfter(now);
      });

      setUpcomingBookings(sortedUpcomingBookings);

      setPastBookings(
        bookingData.data.filter((booking: Booking) =>
          moment(`${booking.slot.date} ${booking.slot.startTime}`, "YYYY-MM-DD HH:mm:ss").isBefore(now)
        )
      );
    }
  }, [bookingData]);

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
      const intervalId = setInterval(updateCountdowns, 1000);
      return () => clearInterval(intervalId);
    }
  }, [upcomingBookings]);

  // useEffect(() => {
  //   if (upcomingBookings.length > 0 && countdowns[upcomingBookings[0]._id]) {
  //     navigate('.', { state: { countdown: countdowns[upcomingBookings[0]._id] } });
  //   }
  // }, [upcomingBookings, countdowns, navigate]);
  // useEffect(() => {
  //   // Check if there are upcoming bookings and the corresponding countdown exists
  //   if (upcomingBookings.length > 0) {
  //     const bookingId = upcomingBookings[0]._id; // Get the ID of the first booking
  //     const countdown = countdowns[bookingId]; // Get the countdown value from the countdowns object

  //     // If the countdown value exists, dispatch the action
  //     if (countdown !== undefined) {
  //       dispatch(setCountdown(countdown));
  //     }
  //   }
  // }, [upcomingBookings, countdowns, dispatch]);


  const columns: any = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      filters: bookingData?.data?.map((booking: Booking) => ({
        text: booking.service.name,
        value: booking.service.name,
      })),
      onFilter: (value: string, record: Booking) => record.service.name.includes(value),
      render: (service: { name: string }) => service.name,
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
      sorter: (a: Booking, b: Booking) => moment(a.slot.date).unix() - moment(b.slot.date).unix(),
    },
    {
      title: "Booking Time",
      dataIndex: "slot",
      key: "time",
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
      sorter: (a: Booking, b: Booking) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Pending", value: "Pending" },
        { text: "Failed", value: "Failed" },
      ],
      onFilter: (value: string, record: Booking) => record.paymentStatus === value,
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
