import  { useEffect, useState } from 'react'
import {  useAppSelector } from '../../redux/hooks';
import { useGetMyBookingQuery } from '../../redux/features/booking/bookingApi';
import { RootState } from '../../redux/store';
import moment from 'moment';
import {  Tooltip } from 'antd';
import { Link } from 'react-router-dom';

export interface Booking {
    _id: string;
    user: { _id: string; email: string };
    service: { _id: string; name: string; image: string };
    slot: { _id: string; date: string; startTime: string; endTime: string };
    totalPrice: number;
    status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
  }

const Countdown = () => {

    const { user } = useAppSelector((state: RootState) => state.auth);
    const { data: bookingData,  } = useGetMyBookingQuery(user?.email, {
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

 

  return (
    <nav className="bg-gray-800 text-white px-3 py-2 rounded-md">
    <div className="flex items-center">
    {user && upcomingBookings && upcomingBookings.length > 0 ? (
  upcomingBookings?.slice(0,1).map((booking) => (
   <Link to="/user-dashboard" >
    <div key={booking?.user?._id}>
      <Tooltip title={`Upcoming Booking: ${upcomingBookings[0]?.service.name}`} placement="bottom">
<div className="flex items-center bg-red-600 px-3 py-1 rounded-md shadow-md cursor-pointer">
  <span className="text-lg font-semibold">{countdowns[booking._id] || "Upcoming booking"}</span>
</div>
</Tooltip>
    </div>
   </Link>
  ))
) : (
  "" 
)}

    </div>
  </nav>
  )
}

export default Countdown
