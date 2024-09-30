import React, { useState } from "react";
import { Calendar, Card } from "antd";
import { useAvailableSlotQuery } from "../../redux/features/slot/slotApi";
import Meta from "antd/es/card/Meta";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs"; // For date formatting
import { CloseOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

type Slot = {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};

type ServiceDetailsProps = {
  service: {
    _id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
    image: string;
  } | null;
  page: string; // page is passed as a string
};

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, page }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log({user})
  const location = useLocation();
  const { data: slotData } = useAvailableSlotQuery(service?._id, {
    skip: !service?._id,
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Initially null
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar view

  // Function to handle slot selection
  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot); // Set the selected slot
  };

  // Filter slots by selected date
  // const filteredSlots = slotData?.data?.filter((slot: Slot) =>
  //   selectedDate ? dayjs(slot.date).isSame(selectedDate, "day") : true
  // );
  const filteredSlots = slotData?.data?.filter(
    (slot: Slot) =>
      selectedDate
        ? dayjs(slot.date).isSame(selectedDate, "day")
        : dayjs(slot.date).isSame(dayjs(), "day") // Compare with today's date
  );

  return (
    <>
      {/* Conditionally render cards based on the page prop */}
      {page === "homePage" && (
        <div className=" flex items-center justify-center">
          <div className=" text-center">
            <img
              alt={service?.name}
              src={service?.image}
              style={{ height: 200, width: "100%", objectFit: "contain" }}
            />
            <br />
            <h4 className=" text-xl sm:text-xl md:text-2xl font-semibold text-center">
              {" "}
              {service?.name}{" "}
            </h4>{" "}
            <br />
            <p className=" text-center"> {service?.description} </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-4 px-2 rounded-lg bg-gray-400 py-2 text-base font-semibold text-white hover:bg-gray-500"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {page === "servicePage" && (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt={service?.name}
              src={service?.image}
              style={{ height: 200, width: "100%", objectFit: "contain" }}
            />
          }
        >
          <Meta
            title={service?.name}
            description={
              <>
                <p className="text-gray-800 font-medium">
                  Price :{" "}
                  <span className="text-green-600">
                    {`$${service?.price.toFixed(2)}`}{" "}
                  </span>
                </p>
                <p className="text-gray-800 font-medium">
                  Duration :{"  "}
                  <span className="text-green-600">
                    {service?.duration} min{" "}
                  </span>
                </p>
                <p>{`${service?.description.slice(0, 75)}...`}</p>
              </>
            }
          />
          <button
            onClick={() => setOpen(true)}
            className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-base font-semibold text-white hover:bg-indigo-700"
          >
            View Details
          </button>
        </Card>
      )}

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <div
          className="p-6 space-y-6 bg-white w-full max-w-lg rounded-lg shadow-xl overflow-auto transform transition-all relative"
          style={{ maxHeight: "90vh", width: "480px" }} // Fix width, allow vertical overflow
        >
          {service && (
            <>
              <CloseOutlined
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              />

              {/* Service Information */}
              <img
                alt={service?.name}
                src={service?.image}
                style={{ height: 200, width: "100%", objectFit: "contain" }}
              />
              <div className="text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  {service.name}
                </h1>
                <p className="text-sm font-medium text-green-500 mt-2">
                  Price: {`$${service?.price.toFixed(2)}`}
                </p>
                <p className="text-sm font-medium text-green-500 ">
                  Duration: {service?.duration} min
                </p>
                <p className="text-gray-600 mt-1">{service.description}</p>
              </div>

              {/* Selected Date */}
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Select Date</h2>
                <div className="border border-gray-300 rounded-md p-3">
                  {selectedDate ? (
                    <div className="flex items-center justify-between">
                      <span>{dayjs(selectedDate).format("MM/DD/YYYY")}</span>
                      <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="text-indigo-600 hover:underline"
                      >
                        Change Date
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{dayjs().format("MM/DD/YYYY")}</span>{" "}
                      {/* Display current date */}
                      <button
                        onClick={() => {
                          setSelectedDate(dayjs().toDate()); // Set current date as selected
                          setShowCalendar(true);
                        }}
                        className="text-indigo-600 hover:underline"
                      >
                        Change Date
                      </button>
                    </div>
                  )}

                  {showCalendar && (
                    <Calendar
                      fullscreen={false}
                      onSelect={(date) => {
                        setSelectedDate(date.toDate());
                        setShowCalendar(false); // Close calendar after selection
                      }}
                      className="mt-3 shadow-md border rounded-md"
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>

              {/* Available Slots */}
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Available Slots</h2>
                {filteredSlots?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredSlots.map((slot: Slot) => (
                      <button
                        disabled={slot.isBooked === "booked"}
                        key={slot._id}
                        onClick={() => handleSlotSelect(slot)}
                        className={`px-4 py-2 rounded-md border 
                          ${
                            slot.isBooked === "booked"
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Disabled button style
                              : selectedSlot?._id === slot._id
                              ? "bg-indigo-600 text-white" // Selected button style
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200" // Default button style
                          }`}
                      >
                        {`${slot.startTime} - ${slot.endTime}`}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">
                    No available slots for the selected date.
                  </p>
                )}
              </div>

              <div className=" my-5">
                {/* Book Button */}
                {selectedSlot ? (
                  user?.role === "USER" ? (
                    <Link to="/booking" state={{ service, selectedSlot }}>
                      <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Book This Service
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login" state={{ from: location }}>
                      <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Login as User to Book This Service
                      </button>
                    </Link>
                  )
                ) : null}
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ServiceDetails;
