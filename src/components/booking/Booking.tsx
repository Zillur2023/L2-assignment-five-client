import { Controller, useForm } from "react-hook-form";
import { Input, Button } from "antd";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/user/userApi";
import dayjs from "dayjs";
import { useEffect } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const Booking = () => {
  const location = useLocation();
  const { state } = location;
  const { service, selectedSlot } = state || {};
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: userInfo } = useGetUserQuery(user?.email, {
    skip: !user?.email,
  });

  const [createBooking] = useCreateBookingMutation();
  const { control, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (userInfo?.data) {
      setValue("name", userInfo.data.name || "");
      setValue("email", userInfo.data.email || "");
      setValue("phone", userInfo.data.phone || "");
      setValue("address", userInfo.data.address || "");
    }
  }, [userInfo, setValue]);

  const onSubmit = async () => {
    const toastId = toast.loading("Creating booking...");
    const bookingData = {
      name: userInfo?.data.name,
      email: userInfo?.data.email,
      phone: userInfo?.data.phone,
      address: userInfo?.data.address,
      bookingInfo: { service: service._id, slot: selectedSlot._id, price: service.price },
    };

    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        const paymentUrl = res?.data?.paymentSession.payment_url;
        window.location.href = paymentUrl;
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      console.error("Booking creation failed:", error);
      alert("Booking creation failed. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Details */}
        <div className="space-y-4">
          <div className="flex items-center border p-4 rounded-lg">
            <img
              src={service.image}
              alt={service.name}
              className="h-24 w-24 object-cover rounded-md"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
              <p className="text-lg font-bold text-gray-900">${service.price.toFixed(2)}</p>
              <p>
                <span className="text-md font-bold text-gray-500">Service booked: </span>
                <span className="text-sm font-medium text-gray-500">
                  {dayjs(selectedSlot.date).format("MM/DD/YYYY")} - {selectedSlot.startTime} to {selectedSlot.endTime}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* User Information Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  {...field}
                  className="w-full p-3 border rounded-md"
                  readOnly // Make the field read-only
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  {...field}
                  className="w-full p-3 border rounded-md"
                  readOnly // Make the field read-only
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  id="phone"
                  {...field}
                  className="w-full p-3 border rounded-md"
                  readOnly // Make the field read-only
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  id="address"
                  rows={2}
                  {...field}
                  className="w-full p-3 border rounded-md"
                  readOnly // Make the field read-only
                />
              )}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
            onClick={onSubmit}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
