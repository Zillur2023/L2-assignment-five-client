import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useGetMyBookingQuery } from '../../redux/features/booking/bookingApi';
import { RootState } from '../../redux/store';
import moment from 'moment';
import { Tag } from 'antd';

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
    console.log({countdowns})
    console.log({pastBookings})
    console.log({upcomingBookings})
    // console.log("coundowns----->",countdowns[upcomingBookings[0]] )
   
  
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
  
        // setCountdowns(newCountdowns);
      };
  
      if (upcomingBookings.length > 0) {
        const intervalId = setInterval(updateCountdowns, 1000);
        return () => clearInterval(intervalId);
      }
    }, [upcomingBookings]);

    // useEffect(() => {
    //   // Check if there are upcoming bookings and the corresponding countdown exists
    //   if (upcomingBookings.length > 0) {
    //     const bookingId = upcomingBookings[0]._id; // Get the ID of the first booking
    //     const countdown = countdowns[bookingId]; // Get the countdown value from the countdowns object
  
    //     // If the countdown value exists, dispatch the action
    //     // if (countdown !== undefined) {
    //     //   dispatch(setCountdown(countdown));
    //     // }
    //     setCountdowns({time:countdown})
    //   }
    // }, [upcomingBookings, countdowns]);
  
   
 

  return (
    <nav className="bg-gray-800 text-white px-3 py-2 rounded-md">
      {/* <Tag color="red">{countdowns[upcomingBookings[0]._id] || "Expired"}</Tag> */}
    {/* <div className="flex items-center">
      {user && (countdowns ? (
       <Tooltip title="Upcoming Booking Countdown" placement="bottom">
       <div className="flex items-center bg-red-600 px-3 py-1 rounded-md shadow-md cursor-pointer">
         <span className="text-lg font-semibold">{countdowns}</span>
       </div>
     </Tooltip>
      ) : '')}
    </div> */}
  </nav>
  )
}

export default Countdown