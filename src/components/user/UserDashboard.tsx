import React, { useEffect, useState } from "react";
import { Table, Card, Tag } from "antd";
import moment from "moment";
import { useGetMyBookingQuery } from "../../redux/features/booking/bookingApi";
import {  useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const { Meta } = Card;

// Define the Booking interface
export interface Booking {
  _id: string;
  user: { _id: string; email: string };
  service: { _id: string; name: string; image: string, price: string };
  slot: { _id: string; date: string; startTime: string; endTime: string };
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
}

const UserBookingManagement: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: bookingData, isFetching } = useGetMyBookingQuery(user?.email, {
    skip: !user?.email,
  });

  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
 

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {upcomingBookings.map((booking) => (
  <Card
    key={booking._id}
    style={{ width: 280 }}
    hoverable
    cover={
      <img
        alt={booking.service.name}
        src={booking.service.image}
        style={{ height: 200, width: "100%", objectFit: "none" }}
      />
    }
  >
    <Meta
      title={
        <h3 className="text-xl font-semibold text-gray-800">
          {booking.service.name}
        </h3>
      }
      description={
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">
            Price: <span className="text-green-600">{`$${booking.service.price}`}</span>
          </p>
          <p className="text-gray-800 font-medium">
            Booking:{" "}
            <span className="text-green-600">
              {moment(booking.slot.date).format("YYYY-MM-DD")}({booking.slot.startTime} - {booking.slot.endTime})
            </span>
            {/* <Tag>
            {moment(booking.slot.date).format("YY-MM-DD")} - 
            ( {booking.slot.startTime} - {booking.slot.endTime} )
        </Tag> */}

          </p>
            <p className="text-gray-800 font-medium flex items-center">
              Time Remaining:{" "}
              <Tag
                color="red" 
                className="ml-2"
              >
                {countdowns[booking._id] || "Expired"}
              </Tag>
            </p>
            <p className="text-gray-800 font-medium flex items-center">
              Payment Status:{" "}
              <Tag
                color={
                  booking.paymentStatus === "Paid"
                    ? "green"
                    : booking.paymentStatus === "Failed"
                    ? "red"
                    : "blue"
                }
                className="ml-2"
              >
                {booking.paymentStatus}
              </Tag>
            </p>
        </div>
      }
    />
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
